from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.http import require_POST

from .forms import TriviaForm, QuestionForm, PinForm
from .models import (
    Trivia, Question, Attempt, Answer,
    LiveSession, LiveParticipant, LiveAnswer,
)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _profesor_only(user):
    return user.is_profesor()


def _time_bonus(full_points, elapsed, time_limit):
    """Puntos proporcionales a la velocidad de respuesta (0..full_points)."""
    if elapsed >= time_limit:
        return 0
    ratio = 1 - (elapsed / time_limit)
    return round(full_points * ratio)


def _record_answer(attempt, question, selected_option, elapsed=0):
    """Registra una respuesta individual y actualiza el puntaje del intento."""
    correct = question.is_correct(selected_option)
    points = _time_bonus(question.points, elapsed, attempt.trivia.time_limit) if correct else 0
    answer, created = Answer.objects.get_or_create(
        attempt=attempt, question=question,
        defaults={'selected_option': selected_option, 'is_correct': correct, 'points_earned': points}
    )
    if not created:
        answer.selected_option = selected_option
        answer.is_correct = correct
        answer.points_earned = points
        answer.answered_at = timezone.now()
        answer.save()
    if correct:
        attempt.score += points
        attempt.save()
    return answer


def _attempt_for(trivia, student):
    """Devuelve el intento en curso o crea uno nuevo."""
    attempt = Attempt.objects.filter(trivia=trivia, student=student, completed=False).first()
    if attempt is None:
        attempt = Attempt.objects.create(
            trivia=trivia, student=student, total_points=trivia.total_points()
        )
    return attempt


def _next_question(attempt):
    answered_ids = attempt.answers.values_list('question_id', flat=True)
    return attempt.trivia.questions.exclude(id__in=answered_ids).first()


def _complete_attempt(attempt):
    attempt.completed = True
    attempt.completed_at = timezone.now()
    attempt.save()


def _participant_for(session, student):
    participant, _ = LiveParticipant.objects.get_or_create(session=session, student=student)
    return participant


# ---------------------------------------------------------------------------
# Profesor: CRUD de trivias
# ---------------------------------------------------------------------------

@login_required
def trivia_list(request):
    if not _profesor_only(request.user):
        messages.error(request, 'Acceso restringido para profesores/as.')
        return redirect('dashboard')
    trivias = Trivia.objects.filter(owner=request.user)
    return render(request, 'quizzes/trivia_list.html', {
        'trivias': trivias,
        'published_count': trivias.filter(is_published=True).count(),
        'draft_count': trivias.filter(is_published=False).count(),
    })


@login_required
def trivia_create(request):
    if not _profesor_only(request.user):
        messages.error(request, 'Acceso restringido para profesores/as.')
        return redirect('dashboard')

    if request.method == 'POST':
        form = TriviaForm(request.POST)
        if form.is_valid():
            trivia = form.save(commit=False)
            trivia.owner = request.user
            trivia.save()
            messages.success(request, 'Trivia creada. Ahora agrega tus preguntas.')
            return redirect('quizzes:trivia_detail', pk=trivia.pk)
    else:
        form = TriviaForm()
    return render(request, 'quizzes/trivia_form.html', {'form': form})


@login_required
def trivia_edit(request, pk):
    trivia = get_object_or_404(Trivia, pk=pk, owner=request.user)
    if request.method == 'POST':
        form = TriviaForm(request.POST, instance=trivia)
        if form.is_valid():
            form.save()
            messages.success(request, 'Trivia actualizada correctamente.')
            return redirect('quizzes:trivia_detail', pk=trivia.pk)
    else:
        form = TriviaForm(instance=trivia)
    return render(request, 'quizzes/trivia_form.html', {'form': form, 'trivia': trivia})


@login_required
def trivia_detail(request, pk):
    trivia = get_object_or_404(Trivia, pk=pk, owner=request.user)
    questions = trivia.questions.all()
    return render(request, 'quizzes/trivia_detail.html', {
        'trivia': trivia,
        'questions': questions,
    })


@require_POST
@login_required
def trivia_delete(request, pk):
    trivia = get_object_or_404(Trivia, pk=pk, owner=request.user)
    title = trivia.title
    trivia.delete()
    messages.success(request, f'La trivia "{title}" fue eliminada.')
    return redirect('quizzes:trivia_list')


@require_POST
@login_required
def trivia_toggle_publish(request, pk):
    trivia = get_object_or_404(Trivia, pk=pk, owner=request.user)
    if trivia.questions.count() == 0:
        messages.error(request, 'No puedes publicar una trivia sin preguntas.')
        return redirect('quizzes:trivia_detail', pk=trivia.pk)
    trivia.is_published = not trivia.is_published
    trivia.save()
    state = 'publicada' if trivia.is_published else 'despublicada'
    messages.success(request, f'La trivia ahora está {state}.')
    return redirect('quizzes:trivia_detail', pk=trivia.pk)


# ---------------------------------------------------------------------------
# Profesor: CRUD de preguntas
# ---------------------------------------------------------------------------

@login_required
def question_create(request, trivia_id):
    trivia = get_object_or_404(Trivia, pk=trivia_id, owner=request.user)
    if request.method == 'POST':
        form = QuestionForm(request.POST)
        if form.is_valid():
            question = form.save(commit=False)
            question.trivia = trivia
            question.save()
            messages.success(request, 'Pregunta agregada correctamente.')
            return redirect('quizzes:trivia_detail', pk=trivia.pk)
    else:
        initial = {'order': trivia.questions.count()}
        form = QuestionForm(initial=initial)
    return render(request, 'quizzes/question_form.html', {'form': form, 'trivia': trivia})


@login_required
def question_edit(request, pk):
    question = get_object_or_404(Question, pk=pk, trivia__owner=request.user)
    trivia = question.trivia
    if request.method == 'POST':
        form = QuestionForm(request.POST, instance=question)
        if form.is_valid():
            form.save()
            messages.success(request, 'Pregunta actualizada correctamente.')
            return redirect('quizzes:trivia_detail', pk=trivia.pk)
    else:
        form = QuestionForm(instance=question)
    return render(request, 'quizzes/question_form.html', {'form': form, 'trivia': trivia})


@require_POST
@login_required
def question_delete(request, pk):
    question = get_object_or_404(Question, pk=pk, trivia__owner=request.user)
    trivia = question.trivia
    question.delete()
    messages.success(request, 'Pregunta eliminada.')
    return redirect('quizzes:trivia_detail', pk=trivia.pk)


# ---------------------------------------------------------------------------
# Estudiante: jugar trivia individual
# ---------------------------------------------------------------------------

@login_required
def trivias_list(request):
    trivias = Trivia.objects.filter(is_published=True).order_by('-created_at')
    results = []
    for trivia in trivias:
        best = trivia.best_attempt()
        results.append({
            'trivia': trivia,
            'best': best,
        })
    return render(request, 'quizzes/trivias_list.html', {'results': results})


@login_required
def trivia_play(request, pk):
    trivia = get_object_or_404(Trivia, pk=pk, is_published=True)
    attempt = _attempt_for(trivia, request.user)

    if request.method == 'POST':
        question = get_object_or_404(Question, pk=request.POST.get('question_id'))
        selected = request.POST.get('option')
        elapsed = 0
        if attempt.current_question_id == question.pk and attempt.question_started_at:
            elapsed = (timezone.now() - attempt.question_started_at).total_seconds()
        if selected in dict(Question.OPTION_CHOICES):
            _record_answer(attempt, question, selected, elapsed)
        else:
            # Tiempo agotado sin respuesta: registrar 0 puntos
            _record_answer(attempt, question, '', elapsed)
        next_q = _next_question(attempt)
        if next_q is None:
            _complete_attempt(attempt)
        return redirect('quizzes:trivia_feedback', attempt_id=attempt.pk)

    question = _next_question(attempt)
    if question is None:
        if not attempt.completed:
            _complete_attempt(attempt)
        return redirect('quizzes:trivia_results', attempt_id=attempt.pk)

    if attempt.current_question_id != question.pk:
        attempt.current_question = question
        attempt.question_started_at = timezone.now()
        attempt.save()

    total = trivia.questions.count()
    answered = attempt.answers.count()
    return render(request, 'quizzes/trivia_play.html', {
        'trivia': trivia,
        'question': question,
        'attempt': attempt,
        'progress': answered + 1,
        'total': total,
        'question_started_ms': int(attempt.question_started_at.timestamp() * 1000),
    })


@login_required
def trivia_feedback(request, attempt_id):
    """Muestra la respuesta registrada con colores (verde=correcta, rojo=incorrecta)."""
    attempt = get_object_or_404(Attempt, pk=attempt_id, student=request.user)
    last = attempt.answers.select_related('question').order_by('-id').first()
    if last is None:
        return redirect('quizzes:trivia_play', pk=attempt.trivia.pk)
    next_q = _next_question(attempt)
    return render(request, 'quizzes/trivia_feedback.html', {
        'trivia': attempt.trivia,
        'attempt': attempt,
        'answer': last,
        'question': last.question,
        'next_q': next_q,
        'progress': attempt.answers.count(),
        'total': attempt.trivia.questions.count(),
    })


@login_required
def trivia_results(request, attempt_id):
    attempt = get_object_or_404(Attempt, pk=attempt_id, student=request.user)
    answers = attempt.answers.select_related('question').order_by('question__order', 'question__id')
    return render(request, 'quizzes/trivia_results.html', {
        'attempt': attempt,
        'answers': answers,
    })


# ---------------------------------------------------------------------------
# Modo en vivo: inicio y unión
# ---------------------------------------------------------------------------

@login_required
def live_join(request):
    if request.method == 'POST':
        form = PinForm(request.POST)
        if form.is_valid():
            session = LiveSession.objects.filter(pin=form.cleaned_data['pin']).first()
            if session is None:
                messages.error(request, 'No se encontró ninguna partida con ese PIN.')
            elif session.status == LiveSession.STATUS_FINISHED:
                messages.error(request, 'Esa partida ya terminó.')
            else:
                _participant_for(session, request.user)
                if session.status == LiveSession.STATUS_ACTIVE:
                    return redirect('quizzes:live_play', pk=session.pk)
                return redirect('quizzes:live_wait', pk=session.pk)
    else:
        form = PinForm()
    return render(request, 'quizzes/live_join.html', {'form': form})


@login_required
def live_start(request, pk):
    trivia = get_object_or_404(Trivia, pk=pk, owner=request.user)
    if trivia.questions.count() == 0:
        messages.error(request, 'Agrega al menos una pregunta antes de iniciar el modo en vivo.')
        return redirect('quizzes:trivia_detail', pk=trivia.pk)
    session = LiveSession.objects.create(
        trivia=trivia, host=request.user, pin=LiveSession.generate_pin()
    )
    messages.success(request, f'Partida creada. Comparte el PIN {session.pin} con tus estudiantes.')
    return redirect('quizzes:live_host', pk=session.pk)


# ---------------------------------------------------------------------------
# Modo en vivo: anfitrión
# ---------------------------------------------------------------------------

@login_required
def live_host(request, pk):
    session = get_object_or_404(LiveSession, pk=pk, host=request.user)
    questions = session.ordered_questions()
    participants = session.participants.all()

    current = None
    if session.status == LiveSession.STATUS_ACTIVE and 0 <= session.current_question < len(questions):
        current = questions[session.current_question]

    return render(request, 'quizzes/live_host.html', {
        'session': session,
        'questions': questions,
        'participants': participants,
        'current': current,
    })


@require_POST
@login_required
def live_action(request, pk):
    session = get_object_or_404(LiveSession, pk=pk, host=request.user)
    action = request.POST.get('action')

    if action == 'start' and session.status == LiveSession.STATUS_WAITING:
        session.status = LiveSession.STATUS_ACTIVE
        session.current_question = 0
        session.revealed = False
        session.question_started_at = timezone.now()
        session.started_at = timezone.now()
        session.save()
    elif action == 'reveal' and session.status == LiveSession.STATUS_ACTIVE:
        session.revealed = True
        session.save()
    elif action == 'next':
        if session.current_question + 1 < session.trivia.questions.count():
            session.current_question += 1
            session.revealed = False
            session.question_started_at = timezone.now()
            session.save()
        else:
            session.status = LiveSession.STATUS_FINISHED
            session.revealed = True
            session.finished_at = timezone.now()
            session.save()
    elif action == 'finish':
        session.status = LiveSession.STATUS_FINISHED
        session.revealed = True
        session.finished_at = timezone.now()
        session.save()

    return redirect('quizzes:live_host', pk=session.pk)


@login_required
def live_results(request, pk):
    session = get_object_or_404(LiveSession, pk=pk)
    participants = session.participants.all()
    return render(request, 'quizzes/live_results.html', {
        'session': session,
        'participants': participants,
        'is_host': request.user == session.host,
    })


# ---------------------------------------------------------------------------
# Modo en vivo: jugadores
# ---------------------------------------------------------------------------

@login_required
def live_wait(request, pk):
    session = get_object_or_404(LiveSession, pk=pk)
    _participant_for(session, request.user)
    return render(request, 'quizzes/live_wait.html', {'session': session})


@login_required
def live_play(request, pk):
    session = get_object_or_404(LiveSession, pk=pk)
    if session.status == LiveSession.STATUS_FINISHED:
        return redirect('quizzes:live_results', pk=session.pk)

    participant = _participant_for(session, request.user)
    questions = session.ordered_questions()

    if request.method == 'POST':
        if session.status == LiveSession.STATUS_ACTIVE and 0 <= session.current_question < len(questions):
            question = questions[session.current_question]
            selected = request.POST.get('option')
            if selected in dict(Question.OPTION_CHOICES):
                elapsed = 0
                if session.question_started_at:
                    elapsed = (timezone.now() - session.question_started_at).total_seconds()
                correct = question.is_correct(selected)
                points = _time_bonus(question.points, elapsed, session.trivia.time_limit) if correct else 0
                live_answer, created = LiveAnswer.objects.get_or_create(
                    participant=participant, question=question,
                    defaults={'selected_option': selected, 'is_correct': correct, 'points_earned': points}
                )
                if not created:
                    if live_answer.is_correct:
                        participant.score = max(0, participant.score - live_answer.points_earned)
                    live_answer.selected_option = selected
                    live_answer.is_correct = correct
                    live_answer.points_earned = points
                    live_answer.answered_at = timezone.now()
                    live_answer.save()
                if correct:
                    participant.score += points
                    participant.save()
        return redirect('quizzes:live_play', pk=session.pk)

    current = None
    my_answer = None
    if session.status == LiveSession.STATUS_ACTIVE and 0 <= session.current_question < len(questions):
        current = questions[session.current_question]
        my_answer = LiveAnswer.objects.filter(participant=participant, question=current).first()

    return render(request, 'quizzes/live_play.html', {
        'session': session,
        'current': current,
        'my_answer': my_answer,
        'participant': participant,
        'total': len(questions),
    })


@login_required
def live_state_json(request, pk):
    session = get_object_or_404(LiveSession, pk=pk)
    questions = session.ordered_questions()

    data = {
        'status': session.status,
        'current_index': session.current_question,
        'revealed': session.revealed,
        'participants_count': session.participants_count(),
        'answered_count': session.answered_count(),
        'total': len(questions),
        'time_limit': session.trivia.time_limit,
        'question_started_ms': int(session.question_started_at.timestamp() * 1000) if session.question_started_at else None,
        'question': None,
        'my_answer': None,
        'my_answered': False,
        'correct': None,
    }

    if session.status == LiveSession.STATUS_ACTIVE and 0 <= session.current_question < len(questions):
        question = questions[session.current_question]
        data['question'] = {
            'text': question.text,
            'options': [
                {'key': key, 'text': text} for key, text in question.get_options()
            ],
        }
        if session.revealed:
            data['correct'] = question.correct_option

    participant = session.participants.filter(student=request.user).first()
    if participant and session.status == LiveSession.STATUS_ACTIVE:
        current = questions[session.current_question] if 0 <= session.current_question < len(questions) else None
        if current:
            my_answer = LiveAnswer.objects.filter(participant=participant, question=current).first()
            if my_answer:
                data['my_answer'] = my_answer.selected_option
                data['my_answered'] = True

    return JsonResponse(data)

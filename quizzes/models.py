import random

from django.conf import settings
from django.db import models
from django.utils import timezone


class Trivia(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='trivias',
        verbose_name='Creador'
    )
    title = models.CharField(max_length=200, verbose_name='Título')
    description = models.TextField(blank=True, verbose_name='Descripción')
    time_limit = models.PositiveIntegerField(
        default=30,
        verbose_name='Tiempo por pregunta (segundos)',
        help_text='Segundos disponibles para responder cada pregunta. Cuanto más rápido respondas, más puntos ganas.'
    )
    is_published = models.BooleanField(default=False, verbose_name='Publicada')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creada el')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Actualizada el')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Trivia'
        verbose_name_plural = 'Trivias'

    def total_questions(self):
        return self.questions.count()

    def total_points(self):
        return self.questions.aggregate(total=models.Sum('points'))['total'] or 0

    def best_attempt(self):
        return self.attempts.filter(completed=True).order_by('-score', 'completed_at').first()

    def attempts_count(self):
        return self.attempts.filter(completed=True).count()

    def __str__(self):
        return self.title


class Question(models.Model):
    OPTION_A = 'A'
    OPTION_B = 'B'
    OPTION_C = 'C'
    OPTION_D = 'D'
    OPTION_CHOICES = [
        (OPTION_A, 'A'),
        (OPTION_B, 'B'),
        (OPTION_C, 'C'),
        (OPTION_D, 'D'),
    ]

    trivia = models.ForeignKey(
        Trivia,
        on_delete=models.CASCADE,
        related_name='questions',
        verbose_name='Trivia'
    )
    text = models.CharField(max_length=500, verbose_name='Pregunta')
    option_a = models.CharField(max_length=255, verbose_name='Opción A')
    option_b = models.CharField(max_length=255, verbose_name='Opción B')
    option_c = models.CharField(max_length=255, verbose_name='Opción C')
    option_d = models.CharField(max_length=255, verbose_name='Opción D')
    correct_option = models.CharField(
        max_length=1,
        choices=OPTION_CHOICES,
        default=OPTION_A,
        verbose_name='Respuesta correcta'
    )
    points = models.PositiveIntegerField(default=100, verbose_name='Puntos')
    order = models.PositiveIntegerField(default=0, verbose_name='Orden')

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Pregunta'
        verbose_name_plural = 'Preguntas'

    def get_options(self):
        return [
            (self.OPTION_A, self.option_a),
            (self.OPTION_B, self.option_b),
            (self.OPTION_C, self.option_c),
            (self.OPTION_D, self.option_d),
        ]

    def is_correct(self, option):
        return option == self.correct_option

    def __str__(self):
        return self.text[:60]


class Attempt(models.Model):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='trivia_attempts',
        verbose_name='Estudiante'
    )
    trivia = models.ForeignKey(
        Trivia,
        on_delete=models.CASCADE,
        related_name='attempts',
        verbose_name='Trivia'
    )
    score = models.PositiveIntegerField(default=0, verbose_name='Puntos obtenidos')
    total_points = models.PositiveIntegerField(default=0, verbose_name='Puntos totales')
    completed = models.BooleanField(default=False, verbose_name='Completada')
    current_question = models.ForeignKey(
        Question,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        verbose_name='Pregunta actual'
    )
    question_started_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Pregunta mostrada el'
    )
    started_at = models.DateTimeField(auto_now_add=True, verbose_name='Iniciada el')
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name='Completada el')

    class Meta:
        ordering = ['-completed_at']
        verbose_name = 'Intento'
        verbose_name_plural = 'Intentos'

    def correct_answers(self):
        return self.answers.filter(is_correct=True).count()

    def __str__(self):
        return f"{self.student} - {self.trivia}"


class Answer(models.Model):
    attempt = models.ForeignKey(
        Attempt,
        on_delete=models.CASCADE,
        related_name='answers',
        verbose_name='Intento'
    )
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        verbose_name='Pregunta'
    )
    selected_option = models.CharField(
        max_length=1,
        choices=Question.OPTION_CHOICES,
        blank=True,
        default='',
        verbose_name='Opción elegida'
    )
    is_correct = models.BooleanField(default=False, verbose_name='¿Correcta?')
    points_earned = models.PositiveIntegerField(default=0, verbose_name='Puntos ganados')
    answered_at = models.DateTimeField(default=timezone.now, verbose_name='Respondida el')

    class Meta:
        unique_together = [('attempt', 'question')]
        verbose_name = 'Respuesta'
        verbose_name_plural = 'Respuestas'


class LiveSession(models.Model):
    STATUS_WAITING = 'WAITING'
    STATUS_ACTIVE = 'ACTIVE'
    STATUS_FINISHED = 'FINISHED'
    STATUS_CHOICES = [
        (STATUS_WAITING, 'En espera'),
        (STATUS_ACTIVE, 'En curso'),
        (STATUS_FINISHED, 'Finalizada'),
    ]

    trivia = models.ForeignKey(
        Trivia,
        on_delete=models.CASCADE,
        related_name='live_sessions',
        verbose_name='Trivia'
    )
    host = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='hosted_sessions',
        verbose_name='Anfitrión'
    )
    pin = models.CharField(max_length=6, unique=True, verbose_name='PIN')
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=STATUS_WAITING,
        verbose_name='Estado'
    )
    current_question = models.PositiveIntegerField(default=0, verbose_name='Pregunta actual')
    revealed = models.BooleanField(default=False, verbose_name='Respuesta revelada')
    question_started_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Pregunta mostrada el'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Creada el')
    started_at = models.DateTimeField(null=True, blank=True, verbose_name='Iniciada el')
    finished_at = models.DateTimeField(null=True, blank=True, verbose_name='Finalizada el')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Sesión en vivo'
        verbose_name_plural = 'Sesiones en vivo'

    @staticmethod
    def generate_pin():
        while True:
            pin = ''.join(random.choices('0123456789', k=6))
            if not LiveSession.objects.filter(pin=pin).exists():
                return pin

    def ordered_questions(self):
        return list(self.trivia.questions.all())

    def participants_count(self):
        return self.participants.count()

    def answered_count(self):
        questions = self.ordered_questions()
        if not questions or self.current_question >= len(questions):
            return 0
        return LiveAnswer.objects.filter(
            question=questions[self.current_question],
            participant__session=self,
        ).count()

    def __str__(self):
        return f"PIN {self.pin} - {self.trivia.title}"


class LiveParticipant(models.Model):
    session = models.ForeignKey(
        LiveSession,
        on_delete=models.CASCADE,
        related_name='participants',
        verbose_name='Sesión'
    )
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='live_participations',
        verbose_name='Estudiante'
    )
    score = models.PositiveIntegerField(default=0, verbose_name='Puntos')
    joined_at = models.DateTimeField(auto_now_add=True, verbose_name='Se unió el')

    class Meta:
        unique_together = [('session', 'student')]
        ordering = ['-score', 'joined_at']
        verbose_name = 'Participante'
        verbose_name_plural = 'Participantes'

    def __str__(self):
        return f"{self.student} @ {self.session.pin}"


class LiveAnswer(models.Model):
    participant = models.ForeignKey(
        LiveParticipant,
        on_delete=models.CASCADE,
        related_name='answers',
        verbose_name='Participante'
    )
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        verbose_name='Pregunta'
    )
    selected_option = models.CharField(
        max_length=1,
        choices=Question.OPTION_CHOICES,
        verbose_name='Opción elegida'
    )
    is_correct = models.BooleanField(default=False, verbose_name='¿Correcta?')
    points_earned = models.PositiveIntegerField(default=0, verbose_name='Puntos ganados')
    answered_at = models.DateTimeField(auto_now_add=True, verbose_name='Respondida el')

    class Meta:
        unique_together = [('participant', 'question')]
        verbose_name = 'Respuesta en vivo'
        verbose_name_plural = 'Respuestas en vivo'

    def __str__(self):
        return f"{self.participant.student} - Q{self.question_id}"

from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import CustomUserCreationForm, CustomLoginForm
from .models import User
from quizzes.models import Trivia, Attempt, LiveSession

def register_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            role_name = user.get_role_display()
            messages.success(request, f'¡Cuenta creada exitosamente! Bienvenido(a) como {role_name}.')
            return redirect('dashboard')
        else:
            messages.error(request, 'Por favor corrige los errores en el formulario para registrarte.')
    else:
        form = CustomUserCreationForm()

    return render(request, 'auth/register.html', {'form': form})


def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = CustomLoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f'¡Sesión iniciada con éxito! Hola, {user.first_name or user.username}.')
                return redirect('dashboard')
            else:
                messages.error(request, 'Usuario o contraseña incorrectos.')
        else:
            messages.error(request, 'Usuario o contraseña incorrectos.')
    else:
        form = CustomLoginForm()

    return render(request, 'auth/login.html', {'form': form})


def logout_view(request):
    logout(request)
    messages.info(request, 'Has cerrado sesión correctamente.')
    return redirect('login')


@login_required
def dashboard_view(request):
    user = request.user
    
    # Datos de demostración sobre Derechos y Dignidad de la Mujer
    stats = {
        'total_estudiantes': User.objects.filter(role=User.Role.ESTUDIANTE).count(),
        'total_profesores': User.objects.filter(role=User.Role.PROFESOR).count(),
        'total_usuarios': User.objects.count(),
        'total_admins': User.objects.filter(role=User.Role.ADMIN).count(),
    }

    if user.is_superuser or user.role == User.Role.ADMIN:
        users_list = User.objects.all().order_by('-date_joined')[:10]
        return render(request, 'dashboards/admin_dashboard.html', {
            'user': user,
            'stats': stats,
            'recent_users': users_list,
            'total_trivias': Trivia.objects.count(),
            'trivias_publicadas': Trivia.objects.filter(is_published=True).count(),
            'sesiones_vivo': LiveSession.objects.count(),
            'intentos_total': Attempt.objects.filter(completed=True).count(),
        })
    elif user.role == User.Role.PROFESOR:
        my_trivias = Trivia.objects.filter(owner=user)
        return render(request, 'dashboards/profesor_dashboard.html', {
            'user': user,
            'stats': stats,
            'my_trivias_count': my_trivias.count(),
            'my_trivias_published': my_trivias.filter(is_published=True).count(),
            'trivias_recent': my_trivias[:4],
        })
    else:
        # Por defecto rol Estudiante / Jugador
        my_attempts = Attempt.objects.filter(student=user, completed=True)
        total_points = sum(a.score for a in my_attempts)
        published_trivias = Trivia.objects.filter(is_published=True).count()
        return render(request, 'dashboards/estudiante_dashboard.html', {
            'user': user,
            'total_points': total_points,
            'trivias_completed': my_attempts.count(),
            'published_trivias': published_trivias,
        })

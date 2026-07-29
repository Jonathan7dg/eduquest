from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import CustomUserCreationForm, CustomLoginForm
from .models import User

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
    }

    if user.is_superuser or user.role == User.Role.ADMIN:
        users_list = User.objects.all().order_by('-date_joined')[:10]
        return render(request, 'dashboards/admin_dashboard.html', {
            'user': user,
            'stats': stats,
            'recent_users': users_list
        })
    elif user.role == User.Role.PROFESOR:
        return render(request, 'dashboards/profesor_dashboard.html', {
            'user': user,
            'stats': stats
        })
    else:
        # Por defecto rol Estudiante / Jugador
        return render(request, 'dashboards/estudiante_dashboard.html', {
            'user': user
        })

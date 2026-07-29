import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eduquest_project.settings')
django.setup()

from accounts.models import User

# 1. Crear Admin Superuser
if not User.objects.filter(username='admin').exists():
    admin_user = User.objects.create_superuser(
        username='admin',
        email='admin@eduquest.org',
        password='admin123',
        first_name='Administrador',
        last_name='Sistema',
        role=User.Role.ADMIN,
        institution='Direccion EduQuest'
    )
    print("Usuario Admin creado: admin / admin123")
else:
    print("Usuario Admin ya existia.")

# 2. Crear Profesor
if not User.objects.filter(username='profemaria').exists():
    profe_user = User.objects.create_user(
        username='profemaria',
        email='maria.profe@escuela.edu',
        password='profe123',
        first_name='Maria Carmen',
        last_name='Lopez',
        role=User.Role.PROFESOR,
        institution='Secundaria General #4'
    )
    print("Usuario Profesor creado: profemaria / profe123")
else:
    print("Usuario Profesor ya existia.")

# 3. Crear Estudiante
if not User.objects.filter(username='estudiantesofia').exists():
    estudiante_user = User.objects.create_user(
        username='estudiantesofia',
        email='sofia.estudiante@escuela.edu',
        password='estudiante123',
        first_name='Sofia',
        last_name='Hernandez',
        role=User.Role.ESTUDIANTE,
        institution='Secundaria General #4'
    )
    print("Usuario Estudiante creado: estudiantesofia / estudiante123")
else:
    print("Usuario Estudiante ya existia.")

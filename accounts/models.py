from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Administrador'
        PROFESOR = 'PROFESOR', 'Profesor / Educador'
        ESTUDIANTE = 'ESTUDIANTE', 'Estudiante / Jugador'

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.ESTUDIANTE,
        verbose_name='Rol en el Sistema'
    )
    institution = models.CharField(
        max_length=150,
        blank=True,
        null=True,
        verbose_name='Escuela / Institución'
    )

    def is_profesor(self):
        return self.role == self.Role.PROFESOR or self.is_superuser

    def is_estudiante(self):
        return self.role == self.Role.ESTUDIANTE

    def is_admin_role(self):
        return self.role == self.Role.ADMIN or self.is_superuser or self.is_staff

    def save(self, *args, **kwargs):
        # Si el usuario es superusuario, asegurar que su rol sea ADMIN
        if self.is_superuser and self.role != self.Role.ADMIN:
            self.role = self.Role.ADMIN
        super().save(*args, **kwargs)

    def __str__(self):
        name = self.get_full_name() or self.username
        return f"{name} ({self.get_role_display()})"

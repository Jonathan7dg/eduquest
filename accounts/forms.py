from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    ROLE_CHOICES = [
        (User.Role.ESTUDIANTE, 'Estudiante / Jugador'),
        (User.Role.PROFESOR, 'Profesor / Educador'),
    ]

    first_name = forms.CharField(
        max_length=50,
        required=True,
        label='Nombre(s)',
        widget=forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ej. Maria Luisa'})
    )
    last_name = forms.CharField(
        max_length=50,
        required=True,
        label='Apellidos',
        widget=forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ej. Garcia Perez'})
    )
    email = forms.EmailField(
        required=True,
        label='Correo Electrónico',
        widget=forms.EmailInput(attrs={'class': 'form-input', 'placeholder': 'correo@ejemplo.com'})
    )
    role = forms.ChoiceField(
        choices=ROLE_CHOICES,
        required=True,
        label='Tipo de Cuenta / Rol',
        widget=forms.Select(attrs={'class': 'form-select'})
    )
    institution = forms.CharField(
        max_length=150,
        required=False,
        label='Escuela o Institución (Opcional)',
        widget=forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ej. Escuela Secundaria Tecnica #12'})
    )

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'role', 'institution')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'form-input', 'placeholder': 'Nombre de usuario unico'})
        self.fields['password1'].widget.attrs.update({'class': 'form-input', 'placeholder': 'Crea una contraseña segura'})
        self.fields['password2'].widget.attrs.update({'class': 'form-input', 'placeholder': 'Confirma tu contraseña'})


class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(
        label='Nombre de Usuario',
        widget=forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Ingresa tu usuario'})
    )
    password = forms.CharField(
        label='Contraseña',
        widget=forms.PasswordInput(attrs={'class': 'form-input', 'placeholder': 'Ingresa tu contraseña'})
    )

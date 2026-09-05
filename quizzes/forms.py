from django import forms

from .models import Trivia, Question


class TriviaForm(forms.ModelForm):
    class Meta:
        model = Trivia
        fields = ['title', 'description', 'time_limit']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Ej. Derechos y Dignidad de la Mujer'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-input',
                'rows': 3,
                'placeholder': 'Describe el objetivo de la trivia y el tema que se evaluará...'
            }),
            'time_limit': forms.NumberInput(attrs={
                'class': 'form-input',
                'min': 10,
                'max': 120,
                'step': 5,
                'placeholder': '30',
            }),
        }

    def clean_time_limit(self):
        value = self.cleaned_data['time_limit']
        if value < 10 or value > 120:
            raise forms.ValidationError('El tiempo debe estar entre 10 y 120 segundos.')
        return value


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = [
            'text', 'option_a', 'option_b', 'option_c', 'option_d',
            'correct_option', 'points', 'order'
        ]
        widgets = {
            'text': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Escribe la pregunta'
            }),
            'option_a': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Opción A'}),
            'option_b': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Opción B'}),
            'option_c': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Opción C'}),
            'option_d': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Opción D'}),
            'correct_option': forms.Select(attrs={'class': 'form-select'}),
            'points': forms.NumberInput(attrs={'class': 'form-input', 'min': 10, 'step': 10}),
            'order': forms.NumberInput(attrs={'class': 'form-input', 'min': 0}),
        }


class PinForm(forms.Form):
    pin = forms.CharField(
        max_length=6,
        min_length=4,
        label='PIN de la partida',
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': '000000',
            'maxlength': '6',
            'style': 'letter-spacing: 0.3rem; font-weight: 700; text-align: center;',
            'inputmode': 'numeric',
        })
    )

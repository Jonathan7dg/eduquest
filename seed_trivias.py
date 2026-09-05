import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eduquest_project.settings')
django.setup()

from accounts.models import User
from quizzes.models import Trivia, Question

Q = Question


def get_profe():
    profe = User.objects.filter(username='profemaria').first()
    if profe is None:
        raise SystemExit("Primero ejecuta: python setup_demo_users.py (falta el usuario profemaria).")
    return profe


def ensure_trivia(profe, title, description, questions):
    trivia = Trivia.objects.filter(owner=profe, title=title).first()
    created = False
    if trivia is None:
        trivia = Trivia.objects.create(
            owner=profe,
            title=title,
            description=description,
            is_published=True,
        )
        created = True

    # Solo sembrar preguntas si la trivia no tenia
    if trivia.questions.count() == 0:
        for order, q in enumerate(questions):
            trivia.questions.create(order=order, **q)
        trivia.is_published = True
        trivia.save()

    return trivia, created


def main():
    profe = get_profe()

    t1, c1 = ensure_trivia(
        profe,
        title='Derechos y Dignidad de la Mujer',
        description=(
            'Pon a prueba tus conocimientos sobre los derechos humanos de las mujeres, '
            'la igualdad de genero y la erradicacion de la violencia. Ideal para '
            'estudiantes de secundaria y bachillerato.'
        ),
        questions=[
            {
                'text': '¿Que declaracion internacional reconoce los derechos humanos de todas las personas, incluidas las mujeres?',
                'option_a': 'La Declaracion Universal de Derechos Humanos',
                'option_b': 'La Declaracion de la Independencia de Estados Unidos',
                'option_c': 'El Tratado de Versalles',
                'option_d': 'La Carta Magna de 1215',
                'correct_option': 'A',
                'points': 100,
            },
            {
                'text': '¿Como se llama el instrumento internacional que protege de forma especifica los derechos de las mujeres?',
                'option_a': 'CEDAW',
                'option_b': 'UNICEF',
                'option_c': 'OMC',
                'option_d': 'FMI',
                'correct_option': 'A',
                'points': 100,
            },
            {
                'text': '¿Cual es el principal derecho que la Convencion de Belem do Para protege para las mujeres?',
                'option_a': 'El derecho a una vida libre de violencia',
                'option_b': 'El derecho a conducir vehiculos',
                'option_c': 'El derecho a heredar solo entre hermanas',
                'option_d': 'El derecho a no trabajar',
                'correct_option': 'A',
                'points': 100,
            },
            {
                'text': '¿Que significa la igualdad sustantiva entre mujeres y hombres?',
                'option_a': 'Igualdad real de resultados y oportunidades',
                'option_b': 'Que solo se aplica en la escuela',
                'option_c': 'Que las mujeres reciban trato preferente siempre',
                'option_d': 'Que no existen diferencias biologicas',
                'correct_option': 'A',
                'points': 100,
            },
            {
                'text': '¿Cual de estas acciones promueve la dignidad y el respeto hacia las mujeres?',
                'option_a': 'Escuchar y creer en sus testimonios, evitando estereotipos',
                'option_b': 'Burlarse de sus apariencias',
                'option_c': 'Ignorar sus aportaciones en clase',
                'option_d': 'Decidir por ellas lo que es mejor',
                'correct_option': 'A',
                'points': 100,
            },
        ],
    )
    print(("Creada " if c1 else "Ya existia ") + f"Trivia: {t1.title} ({t1.questions.count()} preguntas)")

    t2, c2 = ensure_trivia(
        profe,
        title='Mujeres que Transformaron la Historia',
        description=(
            'Conoce a mujeres pioneras que lucharon por la igualdad, la ciencia '
            'y los derechos humanos. Una trivia para inspirar a las y los estudiantes.'
        ),
        questions=[
            {
                'text': '¿Quien fue una de las primeras cientificas en ganar dos premios Nobel?',
                'option_a': 'Marie Curie',
                'option_b': 'Rosalind Franklin',
                'option_c': 'Ada Lovelace',
                'option_d': 'Katherine Johnson',
                'correct_option': 'A',
                'points': 100,
            },
            {
                'text': '¿Que sufragista lidero la lucha por el voto femenino en Gran Bretana?',
                'option_a': 'Emmeline Pankhurst',
                'option_b': 'Juana de Arco',
                'option_c': 'Cleopatra',
                'option_d': 'Frida Kahlo',
                'correct_option': 'A',
                'points': 100,
            },
            {
                'text': '¿Quien escribio "Un cuarto propio", obra clave del feminismo literario?',
                'option_a': 'Virginia Woolf',
                'option_b': 'Emily Dickinson',
                'option_c': 'Jane Austen',
                'option_d': 'Maya Angelou',
                'correct_option': 'A',
                'points': 100,
            },
        ],
    )
    print(("Creada " if c2 else "Ya existia ") + f"Trivia: {t2.title} ({t2.questions.count()} preguntas)")


if __name__ == '__main__':
    main()

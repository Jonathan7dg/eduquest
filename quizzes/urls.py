from django.urls import path

from . import views

app_name = 'quizzes'

urlpatterns = [
    # Profesor: gestión de trivias
    path('', views.trivia_list, name='trivia_list'),
    path('nueva/', views.trivia_create, name='trivia_create'),
    path('<int:pk>/', views.trivia_detail, name='trivia_detail'),
    path('<int:pk>/editar/', views.trivia_edit, name='trivia_edit'),
    path('<int:pk>/eliminar/', views.trivia_delete, name='trivia_delete'),
    path('<int:pk>/publicar/', views.trivia_toggle_publish, name='trivia_toggle_publish'),
    path('<int:pk>/vivo/', views.live_start, name='live_start'),

    # Profesor: preguntas
    path('<int:trivia_id>/preguntas/nueva/', views.question_create, name='question_create'),
    path('preguntas/<int:pk>/editar/', views.question_edit, name='question_edit'),
    path('preguntas/<int:pk>/eliminar/', views.question_delete, name='question_delete'),

    # Estudiante: jugar individual
    path('jugar/', views.trivias_list, name='trivias_list'),
    path('jugar/<int:pk>/', views.trivia_play, name='trivia_play'),
    path('feedback/<int:attempt_id>/', views.trivia_feedback, name='trivia_feedback'),
    path('resultados/<int:attempt_id>/', views.trivia_results, name='trivia_results'),

    # Modo en vivo
    path('vivo/', views.live_join, name='live_join'),
    path('vivo/<int:pk>/host/', views.live_host, name='live_host'),
    path('vivo/<int:pk>/control/', views.live_action, name='live_action'),
    path('vivo/<int:pk>/espera/', views.live_wait, name='live_wait'),
    path('vivo/<int:pk>/jugar/', views.live_play, name='live_play'),
    path('vivo/<int:pk>/estado.json', views.live_state_json, name='live_state'),
    path('vivo/<int:pk>/resultados/', views.live_results, name='live_results'),
]

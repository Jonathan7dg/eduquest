from django.contrib import admin

from .models import (
    Trivia, Question, Attempt, Answer,
    LiveSession, LiveParticipant, LiveAnswer,
)


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 0
    fields = ('text', 'correct_option', 'points', 'order')


class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 0
    readonly_fields = ('question', 'selected_option', 'is_correct', 'points_earned')


@admin.register(Trivia)
class TriviaAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'is_published', 'total_questions', 'created_at')
    list_filter = ('is_published', 'created_at')
    search_fields = ('title', 'description', 'owner__username')
    inlines = [QuestionInline]


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'trivia', 'correct_option', 'points', 'order')
    list_filter = ('trivia',)
    search_fields = ('text',)


@admin.register(Attempt)
class AttemptAdmin(admin.ModelAdmin):
    list_display = ('student', 'trivia', 'score', 'total_points', 'completed', 'completed_at')
    list_filter = ('completed',)
    inlines = [AnswerInline]


@admin.register(LiveSession)
class LiveSessionAdmin(admin.ModelAdmin):
    list_display = ('pin', 'trivia', 'host', 'status', 'current_question', 'created_at')
    list_filter = ('status',)


@admin.register(LiveParticipant)
class LiveParticipantAdmin(admin.ModelAdmin):
    list_display = ('student', 'session', 'score', 'joined_at')


@admin.register(LiveAnswer)
class LiveAnswerAdmin(admin.ModelAdmin):
    list_display = ('participant', 'question', 'selected_option', 'is_correct', 'points_earned')

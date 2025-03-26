from django.urls import path
from .views import tripInfo


urlpatterns = [
    path('trip/', tripInfo.as_view()),
]
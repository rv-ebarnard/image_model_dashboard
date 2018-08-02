from django.urls import path

from . import views

app_name = 'viz'

urlpatterns = [
    #<type:columnName>/path/ | views.FuncName | name=fileName
    path('', views.index, name='index'),
    path('images/', views.images, name='images'),
    path('about/', views.about, name='about'),
    path('<image_id>/', views.image, name='image'),
]
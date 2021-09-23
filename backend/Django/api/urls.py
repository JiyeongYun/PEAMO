from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.category_list),
    path('perfumes/', views.perfume_list),
    path('perfume/<int:perfume_pk>/', views.perfume_detail),
    path('perfume/<int:perfume_pk>/notes/', views.perfume_notes),
    # path('addPerfume/', views.add_myperfume)
]

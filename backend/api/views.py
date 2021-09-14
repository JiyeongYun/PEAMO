from api.serializers import *
from api.models import *
from rest_framework.response import Response
from django.shortcuts import get_list_or_404, render
from rest_framework import serializers, status
from rest_framework.decorators import api_view
import json

# Create your views here.


# 카테고리 목록 반환
@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()

    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# 향수 목록 반환
@api_view(['GET'])
def perfume_list(request):
    perfumes = Perfume.objects.all()[:100]

    serializer = PerfumeListSerializer(perfumes, many=True)
    return Response(serializer.data)


# 향수 디테일 반환
@api_view(['GET'])
def perfume_detail(request, perfume_pk):
    perfume = Perfume.objects.get(id=perfume_pk)

    serializer = PerfumeSerializer(perfume)
    return Response(serializer.data)


# 향수 구성향 반환
@api_view(['GET'])
def perfume_notes(request, perfume_pk):
    notes = PerfumeNote.objects.filter(perfume=perfume_pk)

    serializer = PerfumeNoteListSerializer(notes, many=True)
    return Response(serializer.data)


# 나의 향수 추가
@api_view(['POST'])
def add_myperfume(request):
    serializer = AddMyPerfumeSerializer(data=request.data)

    serializer.is_valid(raise_exception=True)

    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

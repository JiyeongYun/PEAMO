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
# @api_view(['POST'])
# def add_myperfume(request):
#     data = request.data

#     # 요청한 유저의 향수함 불러오기
#     perfumes = UserPerfumeList.objects.filter(user=data['user'])
#     UserPerfumes = MyPerfumeSerializer(perfumes, many=True)

#     # 이미 기존 향수함에 있는 것을 또 추가하면 400 Return
#     for element in UserPerfumes.data:
#         if element['perfume'] == request.data['perfume']:
#             return Response(status=status.status.HTTP_400_BAD_REQUEST)

#     serializer = MyPerfumeSerializer(data=data)

#     serializer.is_valid(raise_exception=True)

#     serializer.save()
#     return Response(serializer.data, status=status.HTTP_201_CREATED)

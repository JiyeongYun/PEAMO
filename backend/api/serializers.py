from rest_framework import serializers
from .models import *


# 카테고리 디테일
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        Model = Category
        fields = '__all__'


# 향 디테일
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        Model = Note
        fields = '__all__'


# 유저 디테일
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        Model = User
        fields = '__all__'


# 브랜드
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        Model = Brand
        fields = '__all__'


# 향수 디테일
class PerfumeSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)

    class Meta:
        Model = Perfume
        fields = '__all__'


# 향수 구성 향 (list)
class PerfumeNoteListSerializer(serializers.ModelSerializer):
    note = NoteSerializer(read_only=True)

    class Meta:
        Model = PerfumeNote
        fields = ('note', 'note_type')


# 향수 (list)
class PerfumeListSerializer(serializers.ModelSerializer):

    class Meta:
        Model = Perfume
        fields = ('id', 'name', 'imgurl')

from django.db import models

# Create your models here.


class Category (models.Model):
    id = models.BigAutoField(primary_key=True)
    eng = models.CharField(max_length=200)


class Season (models.Model):
    id = models.BigAutoField(primary_key=True)
    eng = models.CharField(max_length=10)
    kor = models.CharField(max_length=10)


class CategorySeason (models.Model):
    id = models.BigAutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    season = models.ForeignKey(Season, on_delete=models.CASCADE)


class Note (models.Model):
    id = models.BigAutoField(primary_key=True)
    eng = models.CharField(max_length=200)
    kor = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class Brand (models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=200)


class Perfume (models.Model):
    id = models.BigAutoField(primary_key=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    gender = models.IntegerField()
    imgurl = models.CharField(max_length=255)
    good_cnt = models.IntegerField()


class PerfumeNote (models.Model):
    id = models.BigAutoField(primary_key=True)
    perfume = models.ForeignKey(Perfume, on_delete=models.CASCADE)
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    note_type = models.IntegerField()


class PerfumeCategory (models.Model):
    id = models.BigAutoField(primary_key=True)
    perfume = models.ForeignKey(Perfume, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class User (models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=200)


class UserPerfumeList (models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    perfume = models.ForeignKey(Perfume, on_delete=models.CASCADE)

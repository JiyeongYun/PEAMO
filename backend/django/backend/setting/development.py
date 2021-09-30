import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': 'peamo.cakegommt55d.ap-northeast-1.rds.amazonaws.com',
        'PORT': '3306',
        'NAME': 'peamo',
        'USER': 'peamo',
        'PASSWORD': 'peamo123'
    }
}

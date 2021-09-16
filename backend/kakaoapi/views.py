import requests
from django.shortcuts import redirect, render
from django.conf import settings

REST_API_KEY = getattr(settings, 'REST_API_KEY')


def home(request):
    return render(request, 'home.html')


def kakao_login(request):
    redirect_uri = "http://localhost:8000/kakao/login/callback/"
    return redirect(f"https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={redirect_uri}&response_type=code")


def kakao_redirect(request):
    code = request.GET['code']
    redirect_uri = "http://localhost:8000/kakao/login/callback/"
    url = f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={REST_API_KEY}&redirect_uri={redirect_uri}&code={code}"
    token_response = requests.post(url).json()
    access_token = token_response['access_token']
    user_response = requests.get('https://kapi.kakao.com/v2/user/me', headers={"Authorization": f'Bearer ${access_token}'}).json()
    
    id = user_response['id']
    email = user_response['kakao_account']['email']

    context = {
        'id': id,
        'email': email,
        'access_token': access_token,
    }

    return render(request, 'home.html', context)
from django.shortcuts import redirect, render
import requests

# Create your views here.


def home(request):
    return render(request, 'home.html')


def kakao_login(request):
    api_key = "112b52a3500fcf54baac18976074af45"
    redirect_uri = "http://localhost:8000/kakao/login/callback/"
    return redirect(f"https://kauth.kakao.com/oauth/authorize?client_id={api_key}&redirect_uri={redirect_uri}&response_type=code")


def kakao_redirect(request):
    code = request.GET['code']
    api_key = "112b52a3500fcf54baac18976074af45"
    redirect_uri = "http://localhost:8000/kakao/login/callback/"
    url = f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={api_key}&redirect_uri={redirect_uri}&code={code}"
    res = requests.post(url)
    result = res.json()
    context = {
        'token': result['access_token'],
    }
    return render(request, 'home.html', context)


def kakao_get_user_info(request, token):
    user_info_response = requests.get(
        'https://kapi.kakao.com/v2/user/me', headers={"Authorization": f'Bearer ${token}'})
    print(user_info_response)
    return redirect('https://localhost:8000/')

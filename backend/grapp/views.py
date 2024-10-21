from django.shortcuts import render, redirect
import json.scanner
# from .models import Tasks, ListTasks, List
from django.core import serializers 
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import logout, login, authenticate

@csrf_exempt
def get_users(request):
    try:
        data = json.loads(request.body)
        username = data['userName']
        password = data['password']
        user = authenticate(request, username=username, password=password)
        login(request, user)
        data = {"completed": True}
    except Exception as e:
        data = {"completed": False, "error": e}
        print(e)
    return JsonResponse(data)

@csrf_exempt
def add_user(request):
    try:
        data = json.loads(request.body)
        username = data['username']
        email = data['email']
        password = data['password']
        User.objects.create_user(username, email, password)
        data = {"completed": True}
    except Exception as e:
        data = {"completed": False, "error": e}
    
    return JsonResponse(data)

def home(request):
    return render(request, 'home.html')

def logout_view(request):
    logout(request)
    return redirect('/')

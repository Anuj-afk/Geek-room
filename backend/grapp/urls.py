from . import views
from django.urls import path

urlpatterns = [
    path(route='getUsers', view=views.get_users, name="getUsers"),
    path(route='addUser', view=views.add_user, name="addUser"),
    path(route= "", view=views.home, name="home"),
    path(route = "logout", view=views.logout_view, name="logout"),
]
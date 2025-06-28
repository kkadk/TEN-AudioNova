from django.urls import path
from .views import RegisterUserView, VerifyEmailView, ForgotPasswordView, ResetPasswordView, EmailTokenObtainPairView,  CookieTokenRefreshView,LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('verify-email/<str:token>/', VerifyEmailView.as_view(), name='verify-email'),
    path('login/', EmailTokenObtainPairView.as_view(), name='email_login'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/<str:token>/', ResetPasswordView.as_view(), name='reset-password'),
]

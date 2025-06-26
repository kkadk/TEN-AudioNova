from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
import jwt
from rest_framework.permissions import AllowAny
import datetime
from .serializers import UserRegistrationSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, EmailTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            token = jwt.encode(
                {"user_id": user.id, "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)},
                settings.SECRET_KEY,
                algorithm="HS256"
            )

            verification_link = f"http://127.0.0.1:8000/api/auth/verify-email/{token}/"

            try:
                send_mail(
                    "Email Verification",
                    f"Hello {user.username},\n\n"
                    f"Thank you for registering! Click the link below to verify your account:\n"
                    f"{verification_link}\n\n"
                    f"This link will expire in 24 hours.\n\n"
                    f"If you didn't create this account, please ignore this email.",
                    settings.EMAIL_HOST_USER,
                    [user.email],
                    fail_silently=False,
                )
                return Response(
                    {"message": "User created successfully. Check your email for verification link."}, 
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                # If email fails, still return success but mention email issue
                return Response(
                    {"message": "User created successfully, but verification email could not be sent. Please contact support."}, 
                    status=status.HTTP_201_CREATED
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = User.objects.get(id=payload["user_id"])

            if user.is_active:
                return Response({"message": "User already verified."}, status=status.HTTP_200_OK)

            user.is_active = True  
            user.save()
            return Response({"message": "Email verified successfully! You can now log in."}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError:
            return Response({"error": "Verification link expired."}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            
            # Generate password reset token
            token = jwt.encode(
                {
                    "user_id": user.id,
                    "purpose": "password_reset",
                    "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)  # 1 hour expiry
                },
                settings.SECRET_KEY,
                algorithm="HS256"
            )

            # Create password reset link
            reset_link = f"http://127.0.0.1:8000/api/auth/reset-password/{token}/"

            # Send password reset email
            try:
                send_mail(
                    "Password Reset Request",
                    f"Hello {user.username},\n\n"
                    f"You requested a password reset. Click the link below to reset your password:\n"
                    f"{reset_link}\n\n"
                    f"This link will expire in 1 hour.\n\n"
                    f"If you didn't request this, please ignore this email.",
                    settings.EMAIL_HOST_USER,
                    [user.email],
                    fail_silently=False,
                )
                return Response(
                    {"message": "Password reset email sent. Check your email for the reset link."}, 
                    status=status.HTTP_200_OK
                )
            except Exception as e:
                return Response(
                    {"error": "Failed to send password reset email. Please try again later."}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, token):
        try:
            # Decode the token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            
            # Verify token purpose
            if payload.get("purpose") != "password_reset":
                return Response({"error": "Invalid token purpose."}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.get(id=payload["user_id"])
            
            # Validate the new password
            serializer = ResetPasswordSerializer(data=request.data)
            if serializer.is_valid():
                new_password = serializer.validated_data['new_password']
                
                # Set the new password
                user.set_password(new_password)
                user.save()
                
                return Response(
                    {"message": "Password reset successfully. You can now log in with your new password."}, 
                    status=status.HTTP_200_OK
                )
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except jwt.ExpiredSignatureError:
            return Response({"error": "Password reset link has expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError:
            return Response({"error": "Invalid or corrupted token."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, token):
        """
        This endpoint can be used to validate if a reset token is still valid
        before showing the password reset form on the frontend
        """
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            
            if payload.get("purpose") != "password_reset":
                return Response({"error": "Invalid token purpose."}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.get(id=payload["user_id"])
            return Response(
                {"message": "Token is valid. You can proceed to reset your password.", "username": user.username}, 
                status=status.HTTP_200_OK
            )
            
        except jwt.ExpiredSignatureError:
            return Response({"error": "Password reset link has expired."}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
# from django.contrib.auth.models import User
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status
# from django.core.mail import send_mail
# from django.conf import settings
# import jwt
# from rest_framework.permissions import AllowAny, IsAuthenticated
# import datetime
# from .serializers import UserRegistrationSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, EmailTokenObtainPairSerializer, RefreshTokenSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

# class RegisterUserView(APIView):
#     permission_classes = [AllowAny]
    
#     def post(self, request):
#         serializer = UserRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
            
#             token = jwt.encode(
#                 {"user_id": user.id, "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)},
#                 settings.SECRET_KEY,
#                 algorithm="HS256"
#             )

#             verification_link = f"http://localhost:5173/verify-email/{token}/"

#             try:
#                 send_mail(
#                     "Email Verification",
#                     f"Hello {user.username},\n\n"
#                     f"Thank you for registering! Click the link below to verify your account:\n"
#                     f"{verification_link}\n\n"
#                     f"This link will expire in 24 hours.\n\n"
#                     f"If you didn't create this account, please ignore this email.",
#                     settings.EMAIL_HOST_USER,
#                     [user.email],
#                     fail_silently=False,
#                 )
#                 return Response(
#                     {"message": "User created successfully. Check your email for verification link."}, 
#                     status=status.HTTP_201_CREATED
#                 )
#             except Exception as e:
#                 # If email fails, still return success but mention email issue
#                 return Response(
#                     {"message": "User created successfully, but verification email could not be sent. Please contact support."}, 
#                     status=status.HTTP_201_CREATED
#                 )
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class VerifyEmailView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, token):
#         try:
#             payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
#             user = User.objects.get(id=payload["user_id"])

#             if user.is_active:
#                 return Response({"message": "User already verified."}, status=status.HTTP_200_OK)

#             user.is_active = True  
#             user.save()
#             return Response({"message": "Email verified successfully! You can now log in."}, status=status.HTTP_200_OK)

#         except jwt.ExpiredSignatureError:
#             return Response({"error": "Verification link expired."}, status=status.HTTP_400_BAD_REQUEST)
#         except jwt.DecodeError:
#             return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
#         except User.DoesNotExist:
#             return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)


# class EmailTokenObtainPairView(TokenObtainPairView):
#     serializer_class = EmailTokenObtainPairSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
        
#         try:
#             serializer.is_valid(raise_exception=True)
#         except Exception as e:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#         # Get tokens from serializer
#         tokens = serializer.validated_data
#         refresh_token = tokens.pop('refresh')  # Remove refresh token from response data
        
#         # Create response with only access token and user data
#         response = Response({
#             'access': tokens['access'],
#             'user': tokens['user'],
#             'message': 'Login successful'
#         }, status=status.HTTP_200_OK)
        
#         # Set refresh token as HTTP-only cookie
#         response.set_cookie(
#             'refresh_token',
#             refresh_token,
#             max_age=60 * 60 * 24 * 7,  # 7 days (same as refresh token lifetime)
#             httponly=True,
#             secure=settings.DEBUG is False,  # Only use secure cookies in production
#             samesite='Lax'  # Adjust based on your frontend domain setup
#         )
        
#         return response


# class CookieTokenRefreshView(APIView):
    
#     permission_classes = [AllowAny]

#     def post(self, request):
#         refresh_token = request.COOKIES.get('refresh_token')
        
#         if not refresh_token:
#             return Response(
#                 {'error': 'Refresh token not found in cookies'}, 
#                 status=status.HTTP_401_UNAUTHORIZED
#             )
        
#         try:
#             # Validate the current refresh token
#             refresh_obj = RefreshToken(refresh_token)
            
#             # Get user info
#             user_id = refresh_obj.payload.get('user_id')
#             user = User.objects.get(id=user_id)
            
#             # Generate new access token
#             new_access_token = str(refresh_obj.access_token)
            
#             # Check if we should rotate refresh tokens (based on SIMPLE_JWT settings)
#             if getattr(settings, 'SIMPLE_JWT', {}).get('ROTATE_REFRESH_TOKENS', False):
#                 # Generate new refresh token
#                 new_refresh_obj = RefreshToken.for_user(user)
#                 new_refresh_token = str(new_refresh_obj)
#                 new_access_token = str(new_refresh_obj.access_token)
                
#                 # Blacklist old refresh token if configured
#                 if getattr(settings, 'SIMPLE_JWT', {}).get('BLACKLIST_AFTER_ROTATION', False):
#                     try:
#                         refresh_obj.blacklist()
#                     except AttributeError:
#                         # Blacklist might not be available
#                         pass
                
#                 # Create response with new access token
#                 response = Response({
#                     'access': new_access_token,
#                     'user': {
#                         'id': user.id,
#                         'username': user.username,
#                         'email': user.email,
#                     }
#                 }, status=status.HTTP_200_OK)
                
#                 # Set new refresh token as HTTP-only cookie
#                 response.set_cookie(
#                     'refresh_token',
#                     new_refresh_token,
#                     max_age=60 * 60 * 24 * 7,  # 7 days
#                     httponly=True,
#                     secure=settings.DEBUG is False,
#                     samesite='Lax'
#                 )
                
#                 return response
#             else:
#                 # Don't rotate refresh tokens, just return new access token
#                 return Response({
#                     'access': new_access_token,
#                     'user': {
#                         'id': user.id,
#                         'username': user.username,
#                         'email': user.email,
#                     }
#                 }, status=status.HTTP_200_OK)
            
#         except TokenError as e:
#             # Clear the invalid cookie
#             response = Response(
#                 {'error': 'Invalid or expired refresh token'}, 
#                 status=status.HTTP_401_UNAUTHORIZED
#             )
#             response.delete_cookie('refresh_token')
#             return response
            
#         except User.DoesNotExist:
#             response = Response(
#                 {'error': 'User not found'}, 
#                 status=status.HTTP_404_NOT_FOUND
#             )
#             response.delete_cookie('refresh_token')
#             return response


# class LogoutView(APIView):
#     """
#     Logout view that clears the HTTP-only cookie
#     """
#     permission_classes = [AllowAny]

#     def post(self, request):
#         refresh_token = request.COOKIES.get('refresh_token')
        
#         # Try to blacklist the refresh token if it exists
#         if refresh_token:
#             try:
#                 token = RefreshToken(refresh_token)
#                 token.blacklist()
#             except TokenError:
#                 pass  # Token was already invalid
        
#         response = Response({
#             'message': 'Logged out successfully'
#         }, status=status.HTTP_200_OK)
        
#         # Clear the refresh token cookie
#         response.delete_cookie('refresh_token')
        
#         return response



# class ForgotPasswordView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = ForgotPasswordSerializer(data=request.data)
#         if serializer.is_valid():
#             email = serializer.validated_data['email']
#             user = User.objects.get(email=email)
            
#             # Generate password reset token
#             token = jwt.encode(
#                 {
#                     "user_id": user.id,
#                     "purpose": "password_reset",
#                     "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)  # 1 hour expiry
#                 },
#                 settings.SECRET_KEY,
#                 algorithm="HS256"
#             )

#             # Create password reset link
#             # reset_link = f"http://127.0.0.1:8000/api/auth/reset-password/{token}/"
#             reset_link = f"http://localhost:5173/reset-password/{token}/"


#             # Send password reset email
#             try:
#                 send_mail(
#                     "Password Reset Request",
#                     f"Hello {user.username},\n\n"
#                     f"You requested a password reset. Click the link below to reset your password:\n"
#                     f"{reset_link}\n\n"
#                     f"This link will expire in 1 hour.\n\n"
#                     f"If you didn't request this, please ignore this email.",
#                     settings.EMAIL_HOST_USER,
#                     [user.email],
#                     fail_silently=False,
#                 )
#                 return Response(
#                     {"message": "Password reset email sent. Check your email for the reset link."}, 
#                     status=status.HTTP_200_OK
#                 )
#             except Exception as e:
#                 return Response(
#                     {"error": "Failed to send password reset email. Please try again later."}, 
#                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
#                 )
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ResetPasswordView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request, token):
#         try:
#             # Decode the token
#             payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            
#             # Verify token purpose
#             if payload.get("purpose") != "password_reset":
#                 return Response({"error": "Invalid token purpose."}, status=status.HTTP_400_BAD_REQUEST)
            
#             user = User.objects.get(id=payload["user_id"])
            
#             # Validate the new password
#             serializer = ResetPasswordSerializer(data=request.data)
#             if serializer.is_valid():
#                 new_password = serializer.validated_data['new_password']
                
#                 # Set the new password
#                 user.set_password(new_password)
#                 user.save()
                
#                 return Response(
#                     {"message": "Password reset successfully. You can now log in with your new password."}, 
#                     status=status.HTTP_200_OK
#                 )
            
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
#         except jwt.ExpiredSignatureError:
#             return Response({"error": "Password reset link has expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)
#         except jwt.DecodeError:
#             return Response({"error": "Invalid or corrupted token."}, status=status.HTTP_400_BAD_REQUEST)
#         except User.DoesNotExist:
#             return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

#     def get(self, request, token):
#         """
#         This endpoint can be used to validate if a reset token is still valid
#         before showing the password reset form on the frontend
#         """
#         try:
#             payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            
#             if payload.get("purpose") != "password_reset":
#                 return Response({"error": "Invalid token purpose."}, status=status.HTTP_400_BAD_REQUEST)
            
#             user = User.objects.get(id=payload["user_id"])
#             return Response(
#                 {"message": "Token is valid. You can proceed to reset your password.", "username": user.username}, 
#                 status=status.HTTP_200_OK
#             )
            
#         except jwt.ExpiredSignatureError:
#             return Response({"error": "Password reset link has expired."}, status=status.HTTP_400_BAD_REQUEST)
#         except jwt.DecodeError:
#             return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
#         except User.DoesNotExist:
#             return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)




from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
import jwt
from rest_framework.permissions import AllowAny, IsAuthenticated
import datetime
from .serializers import UserRegistrationSerializer, ForgotPasswordSerializer, ResetPasswordSerializer, EmailTokenObtainPairSerializer, RefreshTokenSerializer, UserDetailSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

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

            verification_link = f"http://localhost:5173/verify-email/{token}/"

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

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Get tokens from serializer
        tokens = serializer.validated_data
        refresh_token = tokens.pop('refresh')  # Remove refresh token from response data
        
        # Create response with only access token and user data
        response = Response({
            'access': tokens['access'],
            'user': tokens['user'],
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
        
        # Set refresh token as HTTP-only cookie
        response.set_cookie(
            'refresh_token',
            refresh_token,
            max_age=60 * 60 * 24 * 7,  # 7 days (same as refresh token lifetime)
            httponly=True,
            secure=settings.DEBUG is False,  # Only use secure cookies in production
            samesite='Lax'  # Adjust based on your frontend domain setup
        )
        
        return response


class CookieTokenRefreshView(APIView):
    
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response(
                {'error': 'Refresh token not found in cookies'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        try:
            # Validate the current refresh token
            refresh_obj = RefreshToken(refresh_token)
            
            # Get user info
            user_id = refresh_obj.payload.get('user_id')
            user = User.objects.get(id=user_id)
            
            # Generate new access token
            new_access_token = str(refresh_obj.access_token)
            
            # Check if we should rotate refresh tokens (based on SIMPLE_JWT settings)
            if getattr(settings, 'SIMPLE_JWT', {}).get('ROTATE_REFRESH_TOKENS', False):
                # Generate new refresh token
                new_refresh_obj = RefreshToken.for_user(user)
                new_refresh_token = str(new_refresh_obj)
                new_access_token = str(new_refresh_obj.access_token)
                
                # Blacklist old refresh token if configured
                if getattr(settings, 'SIMPLE_JWT', {}).get('BLACKLIST_AFTER_ROTATION', False):
                    try:
                        refresh_obj.blacklist()
                    except AttributeError:
                        # Blacklist might not be available
                        pass
                
                # Create response with new access token
                response = Response({
                    'access': new_access_token,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                    }
                }, status=status.HTTP_200_OK)
                
                # Set new refresh token as HTTP-only cookie
                response.set_cookie(
                    'refresh_token',
                    new_refresh_token,
                    max_age=60 * 60 * 24 * 7,  # 7 days
                    httponly=True,
                    secure=settings.DEBUG is False,
                    samesite='Lax'
                )
                
                return response
            else:
                # Don't rotate refresh tokens, just return new access token
                return Response({
                    'access': new_access_token,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                    }
                }, status=status.HTTP_200_OK)
            
        except TokenError as e:
            # Clear the invalid cookie
            response = Response(
                {'error': 'Invalid or expired refresh token'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
            response.delete_cookie('refresh_token')
            return response
            
        except User.DoesNotExist:
            response = Response(
                {'error': 'User not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
            response.delete_cookie('refresh_token')
            return response


class LogoutView(APIView):
    """
    Logout view that clears the HTTP-only cookie
    """
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        
        # Try to blacklist the refresh token if it exists
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                pass  # Token was already invalid
        
        response = Response({
            'message': 'Logged out successfully'
        }, status=status.HTTP_200_OK)
        
        # Clear the refresh token cookie
        response.delete_cookie('refresh_token')
        
        return response


class UserDetailView(APIView):
    """
    API view to retrieve authenticated user's details
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Get current user's profile information
        """
        try:
            user = request.user
            serializer = UserDetailSerializer(user)
            return Response({
                'user': serializer.data,
                'message': 'User details retrieved successfully'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': 'Failed to retrieve user details'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request):
        """
        Update current user's profile information
        """
        try:
            user = request.user
            serializer = UserDetailSerializer(user, data=request.data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'user': serializer.data,
                    'message': 'User details updated successfully'
                }, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response(
                {'error': 'Failed to update user details'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


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
            # reset_link = f"http://127.0.0.1:8000/api/auth/reset-password/{token}/"
            reset_link = f"http://localhost:5173/reset-password/{token}/"


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
# from rest_framework import serializers
# from django.contrib.auth.models import User
# from django.contrib.auth.password_validation import validate_password
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.tokens import RefreshToken


# class UserRegistrationSerializer(serializers.ModelSerializer):
#     email = serializers.EmailField(required=True)
#     password = serializers.CharField(
#         write_only=True, 
#         required=True, 
#         min_length=8,
#         error_messages={
#             "min_length": "Password must be at least 8 characters long."
#         }
#     )  
    
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']

#     def validate_email(self, value):
#         if User.objects.filter(email=value).exists():
#             raise serializers.ValidationError("A user with this email already exists.")
#         return value

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=validated_data['password']
#         )
#         user.is_active = False
#         user.save()
#         return user


# # Forgot password
# class ForgotPasswordSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=True)

#     def validate_email(self, value):
#         if not User.objects.filter(email=value).exists():
#             raise serializers.ValidationError("No user found with this email address.")
#         return value
    

# # Reset Password
# class ResetPasswordSerializer(serializers.Serializer):
#     new_password = serializers.CharField(
#         write_only=True,
#         required=True,
#         min_length=8,
#         error_messages={
#             "min_length": "Password must be at least 8 characters long."
#         }
#     )
#     confirm_password = serializers.CharField(write_only=True, required=True)

#     def validate(self, data):
#         if data['new_password'] != data['confirm_password']:
#             raise serializers.ValidationError("Passwords do not match.")
        
#         # Use Django's built-in password validation
#         try:
#             validate_password(data['new_password'])
#         except serializers.ValidationError as e:
#             raise serializers.ValidationError({"new_password": e.messages})
        
#         return data


# class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
#     username_field = 'email'

#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.fields.pop('username', None)
#         self.fields['email'] = serializers.EmailField(required=True)

#     def validate(self, attrs):
#         email = attrs.get('email')
#         password = attrs.get('password')

#         if not email or not password:
#             raise serializers.ValidationError({'non_field_errors': ['Email and password are required.']})

#         try:
#             user = User.objects.get(email=email)
#         except User.DoesNotExist:
#             raise serializers.ValidationError({'non_field_errors': ['Invalid email or password.']})

#         if not user.check_password(password):
#             raise serializers.ValidationError({'non_field_errors': ['Invalid email or password.']})

#         if not user.is_active:
#             raise serializers.ValidationError({'non_field_errors': ['User account is inactive. Please verify your email.']})

#         refresh = RefreshToken.for_user(user)

#         return {
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#             'user': {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#             }
#         }

  
    
# class RefreshTokenSerializer(serializers.Serializer):
#     """
#     Serializer for refreshing access tokens using refresh token from cookies
#     """
#     def validate(self, attrs):
#         request = self.context['request']
#         refresh_token = request.COOKIES.get('refresh_token')
        
#         if not refresh_token:
#             raise serializers.ValidationError('Refresh token not found in cookies.')
        
#         try:
#             refresh = RefreshToken(refresh_token)
#             return {
#                 'access': str(refresh.access_token),
#                 'refresh': str(refresh),  # Return new refresh token for rotation
#             }
#         except Exception as e:
#             raise serializers.ValidationError('Invalid or expired refresh token.')

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        min_length=8,
        error_messages={
            "min_length": "Password must be at least 8 characters long."
        }
    )  
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.is_active = False
        user.save()
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for retrieving and updating user details
    """
    email = serializers.EmailField(required=False)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'last_login', 'is_active']
        read_only_fields = ['id', 'date_joined', 'last_login', 'is_active']

    def validate_email(self, value):
        """
        Validate email uniqueness when updating
        """
        if self.instance and self.instance.email != value:
            if User.objects.filter(email=value).exists():
                raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        """
        Validate username uniqueness when updating
        """
        if self.instance and self.instance.username != value:
            if User.objects.filter(username=value).exists():
                raise serializers.ValidationError("A user with this username already exists.")
        return value


# Forgot password
class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user found with this email address.")
        return value
    

# Reset Password
class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=8,
        error_messages={
            "min_length": "Password must be at least 8 characters long."
        }
    )
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        
        # Use Django's built-in password validation
        try:
            validate_password(data['new_password'])
        except serializers.ValidationError as e:
            raise serializers.ValidationError({"new_password": e.messages})
        
        return data


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('username', None)
        self.fields['email'] = serializers.EmailField(required=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError({'non_field_errors': ['Email and password are required.']})

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({'non_field_errors': ['Invalid email or password.']})

        if not user.check_password(password):
            raise serializers.ValidationError({'non_field_errors': ['Invalid email or password.']})

        if not user.is_active:
            raise serializers.ValidationError({'non_field_errors': ['User account is inactive. Please verify your email.']})

        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        }

  
    
class RefreshTokenSerializer(serializers.Serializer):
    """
    Serializer for refreshing access tokens using refresh token from cookies
    """
    def validate(self, attrs):
        request = self.context['request']
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            raise serializers.ValidationError('Refresh token not found in cookies.')
        
        try:
            refresh = RefreshToken(refresh_token)
            return {
                'access': str(refresh.access_token),
                'refresh': str(refresh),  # Return new refresh token for rotation
            }
        except Exception as e:
            raise serializers.ValidationError('Invalid or expired refresh token.')
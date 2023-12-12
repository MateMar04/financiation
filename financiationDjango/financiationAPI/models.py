from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class Agreement(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class CityDepartment(models.Model):
    name = models.CharField(max_length=70)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class Division(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class Address(models.Model):
    street = models.CharField(max_length=70)
    number = models.IntegerField()

    def __str__(self):
        return f"{self.street} {self.number}"


class UserStatus(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class VisitStatus(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class Faq(models.Model):
    name = models.TextField()
    division = models.ForeignKey(Division, models.DO_NOTHING)

    def __str__(self):
        return f"{self.name}"


class Why(models.Model):
    name = models.TextField()

    def __str__(self):
        return f"{self.name}"


class Location(models.Model):
    name = models.CharField(max_length=70)
    department = models.ForeignKey(CityDepartment, models.DO_NOTHING)
    travel_time = models.DurationField(null=True, blank=True)
    distance = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.name}"


class Mayor(models.Model):
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)
    location = models.ForeignKey(Location, models.DO_NOTHING)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class VehicleBrand(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.name}"


class VehicleModel(models.Model):
    name = models.CharField(max_length=50)
    brand = models.ForeignKey(VehicleBrand, models.DO_NOTHING)

    def __str__(self):
        return f"{self.name}"


class PoliticParty(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class VehiclePlate(models.Model):
    plate = models.CharField(max_length=7)

    def __str__(self):
        return f"{self.plate}"


class Role(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class ContactedReferrer(models.Model):
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)
    position = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, ssn, phone_number, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, ssn=ssn,
                          phone_number=phone_number)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, first_name, last_name, ssn, phone_number, profile_picture,
                         password=None, is_staff=True, is_superuser=True):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, ssn=ssn,
                          is_staff=is_staff, phone_number=phone_number, is_superuser=is_superuser,
                          profile_picture=profile_picture)

        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    ssn = models.BigIntegerField(unique=True)
    email = models.EmailField(max_length=2550, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    phone_number = models.BigIntegerField()
    profile_picture = models.BinaryField(editable=True, blank=True)
    role = models.ForeignKey(Role, models.DO_NOTHING, null=True)
    user_status = models.ForeignKey(UserStatus, models.DO_NOTHING, null=True)
    birth_date = models.DateField(null=True, blank=True)
    location = models.ForeignKey(Location, models.DO_NOTHING, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'ssn'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'phone_number', 'profile_picture', 'role', 'user_status']

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_last_name(self):
        return self.last_name

    def __str__(self):
        return f"{self.ssn}"


class Group(models.Model):
    name = models.CharField(max_length=70)

    def __str__(self):
        return f"{self.name}"


class Vehicle(models.Model):
    plate = models.ForeignKey(VehiclePlate, models.DO_NOTHING)
    brand = models.ForeignKey(VehicleBrand, models.DO_NOTHING)
    model = models.ForeignKey(VehicleModel, models.DO_NOTHING)

    def __str__(self):
        return f"{self.brand} {self.model} {self.plate}"


class Visit(models.Model):
    location = models.ForeignKey(Location, models.DO_NOTHING)
    visit_date = models.DateField()
    start_time = models.TimeField()
    finish_time = models.TimeField()
    flyer = models.BooleanField()
    finance_collaborator = models.ManyToManyField(UserAccount, related_name='finance_collaborator')
    rent_collaborator = models.ManyToManyField(UserAccount, related_name='rent_collaborator')
    rent_observations = models.TextField()
    distance = models.IntegerField()
    travel_time = models.IntegerField()
    civil_registration = models.BooleanField()
    place_name = models.CharField(max_length=70)
    address = models.ForeignKey(Address, models.DO_NOTHING)
    contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING)
    accommodation = models.BooleanField()
    politic_party = models.ForeignKey(PoliticParty, models.DO_NOTHING)
    mayor = models.ForeignKey(Mayor, models.SET_NULL, null=True)
    agreement = models.ManyToManyField(Agreement)
    modernization_fund = models.BooleanField()
    visit_status = models.ForeignKey(VisitStatus, models.DO_NOTHING)
    group = models.ForeignKey(Group, models.DO_NOTHING)

    def __str__(self):
        return f"Visit to {self.location}"


class RequestStatus(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class Coordinator(models.Model):
    user = models.ForeignKey(UserAccount, models.DO_NOTHING)
    group = models.ForeignKey(Group, models.CASCADE)

    def __str__(self):
        return f"{self.user} {self.group}"


class Advisor(models.Model):
    user = models.ForeignKey(UserAccount, models.DO_NOTHING)
    group = models.ForeignKey(Group, models.CASCADE)

    unique_together = (('user', 'group'),)

    def __str__(self):
        return f"{self.user} {self.group}"


class Request(models.Model):
    request_datetime = models.DateTimeField()
    observation = models.TextField(blank=True, default='None')
    visit = models.ForeignKey(Visit, models.CASCADE)
    faq = models.ForeignKey(Faq, models.DO_NOTHING)
    why = models.ForeignKey(Why, models.DO_NOTHING)
    advisor = models.ForeignKey(Advisor, models.SET_NULL, null=True)
    status = models.ForeignKey(RequestStatus, models.DO_NOTHING)

    def __str__(self):
        return f"Request {self.id}"


class ContactedReferrerEmail(models.Model):
    mail = models.EmailField()
    contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING)

    def __str__(self):
        return f"Request {self.mail}"


class MayorPhone(models.Model):
    phone_number = models.BigIntegerField()
    mayor = models.ForeignKey(Mayor, models.CASCADE)

    def __str__(self):
        return f"Request {self.phone_number}"


class MayorEmail(models.Model):
    mail = models.EmailField()
    mayor = models.ForeignKey(Mayor, models.CASCADE)

    def __str__(self):
        return f"Request {self.mail}"


class ContactedReferrerPhone(models.Model):
    phone_number = models.BigIntegerField()
    contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING)

    def __str__(self):
        return f"Request {self.phone_number}"

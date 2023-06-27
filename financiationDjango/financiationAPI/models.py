from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class Advised(models.Model):
    ssn = models.BigIntegerField()
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


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


class MinistryDepartment(models.Model):
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
    id_ministry_department = models.ManyToManyField(MinistryDepartment)

    def __str__(self):
        return f"{self.name}"


class Mayor(models.Model):
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Locality(models.Model):
    name = models.CharField(max_length=70)
    id_department = models.ForeignKey(CityDepartment, models.DO_NOTHING)

    def __str__(self):
        return f"{self.name}"


class Logo(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class VehicleBrand(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.name}"


class VehicleModel(models.Model):
    name = models.CharField(max_length=50)
    id_brand = models.ForeignKey(VehicleBrand, models.DO_NOTHING)

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

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, ssn, phone_number, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name, ssn=ssn,
                          phone_number=phone_number)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, first_name, last_name, ssn, phone_number, profile_picture,
                         password=None, is_staff=True, is_superuser=True):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name, ssn=ssn,
                          is_staff=is_staff, phone_number=phone_number, is_superuser=is_superuser,
                          profile_picture=profile_picture)

        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(max_length=2550, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    ssn = models.BigIntegerField()
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    phone_number = models.BigIntegerField()
    profile_picture = models.ImageField(default=None)
    id_role = models.ForeignKey(Role, models.DO_NOTHING, null=True)
    id_user_status = models.ForeignKey(UserStatus, models.DO_NOTHING, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'ssn', 'phone_number', 'profile_picture']

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_last_name(self):
        return self.last_name

    def __str__(self):
        return f"{self.username}"


class Group(models.Model):
    name = models.CharField(max_length=70)

    def __str__(self):
        return f"{self.name}"


class Vehicles(models.Model):
    id_plate = models.ForeignKey(VehiclePlate, models.DO_NOTHING)
    id_brand = models.ForeignKey(VehicleBrand, models.DO_NOTHING)
    id_model = models.ForeignKey(VehicleModel, models.DO_NOTHING)

    def __str__(self):
        return f"{self.id_brand} {self.id_model} {self.id_plate}"


class Visit(models.Model):
    flyer = models.IntegerField()
    distance = models.IntegerField()
    travel_time = models.IntegerField()
    visit_date = models.DateField()
    civil_registration = models.IntegerField()
    accommodation = models.IntegerField()
    modernization_fund = models.IntegerField()
    start_time = models.DateTimeField()
    finish_time = models.DateTimeField()
    place_name = models.CharField(max_length=70)
    id_locality = models.ForeignKey(Locality, models.DO_NOTHING)
    id_group = models.ForeignKey(Group, models.DO_NOTHING)
    id_visit_status = models.ForeignKey(VisitStatus, models.DO_NOTHING)
    id_agreement = models.ManyToManyField(Agreement)
    id_contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING)
    id_address = models.ForeignKey(Address, models.DO_NOTHING)
    id_logo = models.ManyToManyField(Logo)

    def __str__(self):
        return f"Visit to {self.id_locality}"


class RequestStatus(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return f"{self.name}"


class Coordinator(models.Model):
    id_user = models.OneToOneField(UserAccount, models.DO_NOTHING)
    id_group = models.ForeignKey(Group, models.DO_NOTHING)

    def __str__(self):
        return f"{self.id_user} {self.id_group}"


class Advisor(models.Model):
    id_user = models.ForeignKey(UserAccount, models.DO_NOTHING)
    id_group = models.ForeignKey(Group, models.DO_NOTHING)

    unique_together = (('id_user', 'id_group'),)

    def __str__(self):
        return f"{self.id_user} {self.id_group}"


class Request(models.Model):
    id_visit = models.ForeignKey(Visit, models.DO_NOTHING)
    id_advised = models.ForeignKey(Advised, models.DO_NOTHING)
    id_advisor = models.ForeignKey(Advisor, models.DO_NOTHING)
    id_ministry_department = models.ForeignKey(MinistryDepartment, models.DO_NOTHING)
    id_faq = models.ForeignKey(Faq, models.DO_NOTHING)
    id_status = models.ForeignKey(RequestStatus, models.DO_NOTHING)

    def __str__(self):
        return f"Request {self.id}"


class ContactedReferrerEmail(models.Model):
    mail = models.CharField(max_length=100)
    id_contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING)

    def __str__(self):
        return f"Request {self.mail}"


class MayorPhone(models.Model):
    phone = models.BigIntegerField()
    id_mayor = models.ForeignKey(Mayor, models.DO_NOTHING)

    def __str__(self):
        return f"Request {self.phone}"


class MayorEmail(models.Model):
    mail = models.CharField(max_length=100)
    id_mayor = models.ForeignKey(Mayor, models.DO_NOTHING)

    def __str__(self):
        return f"Request {self.mail}"


class ContactedReferrerPhone(models.Model):
    phone = models.BigIntegerField()
    id_contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING)

    def __str__(self):
        return f"Request {self.phone}"

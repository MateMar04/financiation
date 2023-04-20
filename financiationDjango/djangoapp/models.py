from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models


class Advised(models.Model):
    ssn = models.BigIntegerField()
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)


class Agreement(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class CityDepartment(models.Model):
    name = models.CharField(max_length=70)
    description = models.TextField()


class MinistryDepartment(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class Address(models.Model):
    street = models.CharField(max_length=70)
    number = models.IntegerField()


class UserStatus(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class UserVerifiedStatus(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class VisitStatus(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class Faq(models.Model):
    faq = models.TextField()


class Mayor(models.Model):
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)


class Locality(models.Model):
    name = models.CharField(max_length=70)
    id_department = models.ForeignKey(CityDepartment, models.DO_NOTHING)


class Logo(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class VehicleBrand(models.Model):
    name = models.CharField(max_length=30)


class VehicleModel(models.Model):
    name = models.CharField(max_length=50)
    id_brand = models.ForeignKey(VehicleBrand, models.DO_NOTHING)


class PoliticParty(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class VehiclePlate(models.Model):
    plate = models.CharField(max_length=7)


class Role(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class ContactedReferrer(models.Model):
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)


class UserAccountManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, ssn, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name, ssn=ssn)

        user.set_password(password)
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(max_length=2550)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    ssn = models.BigIntegerField()
    profile_picture = models.TextField()
    id_role = models.ForeignKey(Role, models.DO_NOTHING)
    id_verified_status = models.ForeignKey(UserVerifiedStatus, models.DO_NOTHING)
    id_user_status = models.ForeignKey(UserStatus, models.DO_NOTHING)

    objects = UserAccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'ssn']

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_last_name(self):
        return self.last_name

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.ssn} -> {self.username}"


class User(models.Model):
    username = models.CharField(max_length=30)
    ssn = models.BigIntegerField()
    password = models.TextField()
    profile_picture = models.TextField()
    id_role = models.ForeignKey(Role, models.DO_NOTHING)
    id_verified_status = models.ForeignKey(UserVerifiedStatus, models.DO_NOTHING)
    id_user_status = models.ForeignKey(UserStatus, models.DO_NOTHING)


class Group(models.Model):
    name = models.CharField(max_length=70)


class Vehicles(models.Model):
    id_plate = models.ForeignKey(VehiclePlate, models.DO_NOTHING)
    id_brand = models.ForeignKey(VehicleBrand, models.DO_NOTHING)
    id_model = models.ForeignKey(VehicleModel, models.DO_NOTHING)


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


class RequestStatus(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()


class Coordinator(models.Model):
    id_user = models.OneToOneField(User, models.DO_NOTHING)
    id_group = models.ForeignKey(Group, models.DO_NOTHING)


class Advisor(models.Model):
    id_user = models.ForeignKey(User, models.DO_NOTHING)
    id_group = models.ForeignKey(Group, models.DO_NOTHING)

    unique_together = (('id_user', 'id_group'),)


class Request(models.Model):
    id_visit = models.ForeignKey(Visit, models.DO_NOTHING)
    id_advised = models.ForeignKey(Advised, models.DO_NOTHING)
    id_advisor = models.ForeignKey(Advisor, models.DO_NOTHING)
    id_ministry_department = models.ForeignKey(MinistryDepartment, models.DO_NOTHING)
    id_faq = models.ForeignKey(Faq, models.DO_NOTHING)
    id_status = models.ForeignKey(RequestStatus, models.DO_NOTHING)


class MayorEmail(models.Model):
    mail = models.CharField(max_length=100)
    id_mayor = models.ForeignKey(Mayor, models.DO_NOTHING)


class ContactedReferrerEmail(models.Model):
    mail = models.CharField(max_length=100)
    id_contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING)


class UserEmail(models.Model):
    mail = models.CharField(max_length=100)
    id_user = models.ForeignKey(User, models.DO_NOTHING)


class MayorPhone(models.Model):
    phone = models.BigIntegerField()
    id_mayor = models.ForeignKey(Mayor, models.DO_NOTHING)


class ContactedReferrerPhone(models.Model):
    phone = models.BigIntegerField()
    id_contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING)

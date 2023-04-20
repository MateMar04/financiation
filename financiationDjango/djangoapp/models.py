from django.db import models


class Advised(models.Model):
    ssn = models.BigIntegerField(blank=False, null=False)
    first_name = models.CharField(max_length=70, blank=False, null=False)
    last_name = models.CharField(max_length=70, blank=False, null=False)


class Agreement(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class CityDepartment(models.Model):
    name = models.CharField(max_length=70, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class MinistryDepartment(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class Address(models.Model):
    street = models.CharField(max_length=70, blank=False, null=False)
    number = models.IntegerField(blank=False, null=False)


class UserStatus(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class UserVerifiedStatus(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class VisitStatus(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class Faq(models.Model):
    faq = models.TextField(blank=True, null=False)


class Mayor(models.Model):
    first_name = models.CharField(max_length=70, blank=False, null=False)
    last_name = models.CharField(max_length=70, blank=False, null=False)


class Locality(models.Model):
    name = models.CharField(max_length=70, blank=False, null=False)
    id_department = models.ForeignKey(CityDepartment, models.DO_NOTHING, blank=False, null=False)


class Logo(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class VehicleBrand(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)


class VehicleModel(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)
    id_brand = models.ForeignKey(VehicleBrand, models.DO_NOTHING, blank=False, null=False)


class PoliticParty(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class VehiclePlate(models.Model):
    plate = models.CharField(max_length=7, blank=False, null=False)


class Roles(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class ContactedReferrer(models.Model):
    first_name = models.CharField(max_length=70, blank=False, null=False)
    last_name = models.CharField(max_length=70, blank=False, null=False)


class User(models.Model):
    username = models.CharField(max_length=30, blank=False, null=False)
    ssn = models.BigIntegerField(blank=False, null=False)
    password = models.TextField(blank=False, null=False)
    profile_picture = models.TextField(blank=True, null=True)
    id_role = models.ForeignKey(Roles, models.DO_NOTHING, blank=False, null=False)
    id_verified_status = models.ForeignKey(UserVerifiedStatus, models.DO_NOTHING, blank=False, null=False)
    id_user_status = models.ForeignKey(UserStatus, models.DO_NOTHING, blank=False, null=False)


class Group(models.Model):
    name = models.CharField(max_length=70, blank=False, null=False)


class Vehicles(models.Model):
    id_plate = models.ForeignKey(VehiclePlate, models.DO_NOTHING, blank=False, null=False)
    id_brand = models.ForeignKey(VehicleBrand, models.DO_NOTHING, blank=False, null=False)
    id_model = models.ForeignKey(VehicleModel, models.DO_NOTHING, blank=False, null=False)


class Visit(models.Model):
    flyer = models.IntegerField(blank=False, null=False)
    distance = models.IntegerField(blank=False, null=False)
    travel_time = models.IntegerField(blank=False, null=False)
    visit_date = models.DateField(blank=False, null=False)
    civil_registration = models.IntegerField(blank=False, null=False)
    accommodation = models.IntegerField(blank=False, null=False)
    modernization_fund = models.IntegerField(blank=False, null=False)
    start_time = models.DateTimeField(blank=False, null=False)
    finish_time = models.DateTimeField(blank=False, null=False)
    place_name = models.CharField(max_length=70, blank=False, null=False)
    id_locality = models.ForeignKey(Locality, models.DO_NOTHING, blank=False, null=False)
    id_group = models.ForeignKey(Group, models.DO_NOTHING, blank=False, null=False)
    id_visit_status = models.ForeignKey(VisitStatus, models.DO_NOTHING, blank=False, null=False)
    id_agreement = models.ManyToManyField(Agreement)
    id_contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING, blank=False, null=False)
    id_address = models.ForeignKey(Address, models.DO_NOTHING, blank=False, null=False)
    id_logo = models.ManyToManyField(Logo)


class RequestStatus(models.Model):
    name = models.CharField(max_length=30, blank=False, null=False)
    description = models.TextField(blank=True, null=True)


class Coordinator(models.Model):
    id_user = models.OneToOneField(User, models.DO_NOTHING, blank=False, null=False)
    id_group = models.ForeignKey(Group, models.DO_NOTHING, blank=False, null=False)


class Advisor(models.Model):
    id_user = models.ForeignKey(User, models.DO_NOTHING, blank=False, null=False)
    id_group = models.ForeignKey(Group, models.DO_NOTHING, blank=False, null=False)

    unique_together = (('id_user', 'id_group'),)


class Request(models.Model):
    id_visit = models.ForeignKey(Visit, models.DO_NOTHING, blank=False, null=False)
    id_advised = models.ForeignKey(Advised, models.DO_NOTHING, blank=False, null=False)
    id_advisor = models.ForeignKey(Advisor, models.DO_NOTHING, blank=False, null=False)
    id_ministry_department = models.ForeignKey(MinistryDepartment, models.DO_NOTHING, blank=False, null=False)
    id_faq = models.ForeignKey(Faq, models.DO_NOTHING, blank=False, null=False)
    id_status = models.ForeignKey(RequestStatus, models.DO_NOTHING, blank=False, null=False)


class MayorEmail(models.Model):
    mail = models.CharField(max_length=100, blank=False, null=False)
    id_mayor = models.ForeignKey(Mayor, models.DO_NOTHING, blank=False, null=False)


class ContactedReferrerEmail(models.Model):
    mail = models.CharField(max_length=100, blank=False, null=False)
    id_contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING, blank=False, null=False)


class UserEmail(models.Model):
    mail = models.CharField(max_length=100, blank=False, null=False)
    id_user = models.ForeignKey(User, models.DO_NOTHING, blank=False, null=False)


class MayorPhone(models.Model):
    phone = models.BigIntegerField(blank=False, null=False)
    id_mayor = models.ForeignKey(Mayor, models.DO_NOTHING, blank=False, null=False)


class ContactedReferrerPhone(models.Model):
    phone = models.BigIntegerField(blank=False, null=False)
    id_contacted_referrer = models.ForeignKey(ContactedReferrer, models.DO_NOTHING, blank=False, null=False)

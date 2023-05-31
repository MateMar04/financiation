from django.contrib import admin

# Register your models here.

from .models import *


class AdvisedAdmin(admin.ModelAdmin):
    list_display = ('id', 'ssn', 'first_name', 'last_name',)
    search_fields = ('id', 'ssn', 'first_name', 'last_name',)
    list_filter = ('id', 'ssn', 'first_name', 'last_name',)
    list_per_page = 10


class AgreementAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description',)
    search_fields = ('id', 'name', 'description',)
    list_filter = ('id', 'name', 'description',)
    list_per_page = 10


class CityDepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('id', 'name', 'description')
    list_filter = ('id', 'name', 'description')
    list_per_page = 10


class MinistryDepartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('id', 'name', 'description')
    list_filter = ('id', 'street', 'number')
    list_per_page = 10


class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'street', 'number')
    search_fields = ('id', 'street', 'number')
    list_filter = ('id', 'street', 'number')
    list_per_page = 10


class UserStatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('id', 'name', 'description')
    list_filter = ('id', 'name', 'description')
    list_per_page = 10


class VisitStatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('id', 'name', 'description')
    list_filter = ('id', 'name', 'description')
    list_per_page = 10


class FaqAdmin(admin.ModelAdmin):
    list_display = ('id', 'faq')
    search_fields = ('id', 'faq')
    list_filter = ('id', 'faq')
    list_per_page = 10


class MayorAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name')
    search_fields = ('id', 'first_name', 'last_name')
    list_filter = ('id', 'first_name', 'last_name')
    list_per_page = 10


class LocalityAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'id_department')
    search_fields = ('id', 'name', 'id_department')
    list_filter = ('id', 'name', 'id_department')
    list_per_page = 10

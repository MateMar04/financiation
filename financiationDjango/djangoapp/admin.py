from django.contrib import admin

# Register your models here.

from .models import *


class AdvisedAdmin(admin.ModelAdmin):
    list_display = ('id', 'ssn', 'first_name', 'last_name',)
    search_fields = ('id', 'ssn', 'first_name', 'last_name',)
    list_filter = ('id', 'ssn', 'first_name', 'last_name',)
    list_per_page = 10

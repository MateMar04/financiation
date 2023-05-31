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


class LogoAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('id', 'name', 'description')
    list_filter = ('id', 'name', 'description')
    list_per_page = 10


class VehicleBrandAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name')
    list_filter = ('id', 'name')
    list_per_page = 10


class VehicleModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'id_brand')
    search_fields = 'id', 'name', 'id_brand'
    list_filter = 'id', 'name', 'id_brand'
    list_per_page = 10


class PoliticPartyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('id', 'name', 'description')
    list_filter = ('id', 'name', 'description')
    list_per_page = 10


class VehiclePlateAdmin(admin.ModelAdmin):
    list_display = ('id', 'plate')
    search_fields = ('id', 'plate')
    list_filter = ('id', 'plate')
    list_per_page = 10


class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('id', 'name', 'description')
    list_filter = ('id', 'name', 'description')
    list_per_page = 10


class ContactedReferrerAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name')
    search_fields = ('id', 'first_name', 'last_name')
    list_filter = ('id', 'first_name', 'last_name')
    list_per_page = 10


class UserAccountAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'username', 'email', 'first_name', 'last_name', 'ssn', 'phone_number', 'id_role', 'id_user_status',
        'is_active', 'is_staff', 'is_superuser')
    search_fields = (
        'id', 'username', 'email', 'first_name', 'last_name', 'ssn', 'phone_number', 'id_role', 'id_user_status',
        'is_active', 'is_staff', 'is_superuser')
    list_filter = (
        'id', 'username', 'email', 'first_name', 'last_name', 'ssn', 'phone_number', 'id_role', 'id_user_status',
        'is_active', 'is_staff', 'is_superuser')
    list_per_page = 10


class GroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name')
    list_filter = ('id', 'name')
    list_per_page = 10


class VehiclesAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_plate', 'id_brand', 'id_model')
    search_fields = ('id', 'id_plate', 'id_brand', 'id_model')
    list_filter = ('id', 'id_plate', 'id_brand', 'id_model')
    list_per_page = 10


class VisitAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'flyer', 'distance', 'travel_time', 'visit_date', 'civil_registration', 'accommodation',
        'modernization_fund',
        'start_time', 'finish_time', 'place_name', 'id_locality', 'id_group', 'id_visit_status', 'id_agreement',
        'id_contacted_referrer', 'id_address', 'id_logo')
    search_fields = (
        'id', 'flyer', 'distance', 'travel_time', 'visit_date', 'civil_registration', 'accommodation',
        'modernization_fund',
        'start_time', 'finish_time', 'place_name', 'id_locality', 'id_group', 'id_visit_status', 'id_agreement',
        'id_contacted_referrer', 'id_address', 'id_logo')
    list_filter = (
        'id', 'flyer', 'distance', 'travel_time', 'visit_date', 'civil_registration', 'accommodation',
        'modernization_fund',
        'start_time', 'finish_time', 'place_name', 'id_locality', 'id_group', 'id_visit_status', 'id_agreement',
        'id_contacted_referrer', 'id_address', 'id_logo')
    list_per_page = 10


class RequestStatusAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    search_fields = ('id', 'name', 'description')
    list_filter = ('id', 'name', 'description')
    list_per_page = 10


class CoordinatorAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_user', 'id_group')
    search_fields = ('id', 'id_user', 'id_group')
    list_filter = ('id', 'id_user', 'id_group')
    list_per_page = 10


class AdvisorAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_user', 'id_group')
    search_fields = ('id', 'id_user', 'id_group')
    list_filter = ('id', 'id_user', 'id_group')
    list_per_page = 10


class RequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'id_visit', 'id_advised', 'id_advisor', 'id_ministry_department', 'id_faq', 'id_status')
    search_fields = ('id', 'id_visit', 'id_advised', 'id_advisor', 'id_ministry_department', 'id_faq', 'id_status')
    list_filter = ('id', 'id_visit', 'id_advised', 'id_advisor', 'id_ministry_department', 'id_faq', 'id_status')
    list_per_page = 10


class ContactedReferrerEmailAdmin(admin.ModelAdmin):
    list_display = ('id', 'mail', 'id_contacted_referrer')
    search_fields = ('id', 'mail', 'id_contacted_referrer')
    list_filter = ('id', 'mail', 'id_contacted_referrer')
    list_per_page = 10


class MayorPhoneAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone', 'id_mayor')
    search_fields = ('id', 'phone', 'id_mayor')
    list_filter = ('id', 'phone', 'id_mayor')
    list_per_page = 10


class MayorEmailAdmin(admin.ModelAdmin):
    list_display = ('id', 'mail', 'id_mayor')
    search_fields = ('id', 'mail', 'id_mayor')
    list_filter = ('id', 'mail', 'id_mayor')
    list_per_page = 10


class ContactedReferrerPhoneAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone', 'id_contacted_referrer')
    search_fields = ('id', 'phone', 'id_contacted_referrer')
    list_filter = ('id', 'phone', 'id_contacted_referrer')
    list_per_page = 10


admin.site.register(Advised, AdvisedAdmin)
admin.site.register(Agreement, AgreementAdmin)
admin.site.register(CityDepartment, CityDepartmentAdmin)
admin.site.register(MinistryDepartment, MinistryDepartmentAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(UserStatus, UserStatusAdmin)
admin.site.register(VisitStatus, VisitStatusAdmin)
admin.site.register(Faq, FaqAdmin)
admin.site.register(Mayor, MayorAdmin)
admin.site.register(Locality, LocalityAdmin)
admin.site.register(Logo, LogoAdmin)
admin.site.register(VehicleBrand, VehicleBrandAdmin)
admin.site.register(VehicleModel, VehicleModelAdmin)
admin.site.register(PoliticParty, PoliticPartyAdmin)
admin.site.register(VehiclePlate, VehiclePlateAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(ContactedReferrer, ContactedReferrerAdmin)
admin.site.register(UserAccount, UserAccountAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(Vehicles, VehiclesAdmin)
admin.site.register(Visit, VisitAdmin)
admin.site.register(RequestStatus, RequestStatusAdmin)
admin.site.register(Coordinator, CoordinatorAdmin)
admin.site.register(Advisor, AdvisorAdmin)
admin.site.register(Request, RequestAdmin)
admin.site.register(ContactedReferrerEmail, ContactedReferrerEmailAdmin)
admin.site.register(MayorPhone, MayorPhoneAdmin)
admin.site.register(MayorEmail, MayorEmailAdmin)
admin.site.register(ContactedReferrerPhone, ContactedReferrerPhoneAdmin)

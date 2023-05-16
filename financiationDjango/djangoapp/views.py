from django.shortcuts import render
from .models import Locality

def my_view(request):
    locality_queryset = Locality.objects.all()
    context = {'locality': locality_queryset}
    return render(request, 'my_template.html', context)
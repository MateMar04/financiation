from django.shortcuts import render
from .models import Locality
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def my_view(request):
    locality_queryset = Locality.objects.all()
    context = {'locality': locality_queryset}
    return render(request, 'my_template.html', context)
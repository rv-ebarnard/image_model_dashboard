from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from .models import FeatureCTR
from django.core.serializers import serialize 
import json

def index(request):
    data = serialize("json", FeatureCTR.objects.all())
    context = {
        'feature_data' : data,
    }
    return render(request, 'viz/index.html', context)

def image(request, image_id):
    images = FeatureCTR.objects.filter(image_name=image_id).values()
    # data = FeatureCTR.objects.all()
    context = {'img': images}
    return render(request, 'viz/image.html', context)

def images(request):
    data = FeatureCTR.objects.all()
    context = {'feature_list': data}
    return render(request, 'viz/images.html', context)

def about(request):
    data = FeatureCTR.objects.all()
    context = {'feature_list': data}
    return render(request, 'viz/about.html', context)

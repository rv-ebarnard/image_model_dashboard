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

# create functions that strip specific features, array of features that is mapped to each page
def featureBlackX(request, black_x):
    response = "%s."
    return HttpResponse(response % black_x)

# def tracts_site(request, tract_id):
#     sites = SiteLocation.objects.filter(tract=tract_id).values()
#     # data = get_object_or_404(sites, tract=tract_id)
#     context = {'tracts_site_list': sites}
#     return render(request, 'viz/tracts_site.html', context)
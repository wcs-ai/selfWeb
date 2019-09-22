from django.http import HttpResponse,JsonResponse
from .SELF_TOOLS import extract_time
from .testmodel import views
import json

def hello(request):
	return JsonResponse('hello')

def pack_data(data,status,info):
	res = {
		"status":status,
		"info":info,
		"data":data
	}
	res = json.dumps(res)
	return res

def extTime(request):
	sen=request.POST.get('sentence') or request.GET.get("sentence")

	x = extract_time.extract(sen)
	px = pack_data({"times":x},"ok","success")
	response = HttpResponse(px)
	return response


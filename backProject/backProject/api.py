import jieba,json
from .SELF_TOOLS import extract
from django.http import HttpResponse,JsonResponse

#get argument from url
def get_arg(request,name):
	res = request.POST.get(name) or request.GET.get(name)
	return res

def packageData(data,status='ok',reply='success'):
	rep = {
		"status":status,
		"reply":reply,
		"data":data
	}
	return json.dumps(rep)

#extract time api
def etcTime(request):
	text = get_arg(request,'sentence')
	if text==None:
		dat = packageData(None,status='error',reply='')
	else:
		res = extract.ext_time(text)
		dat = packageData({"times":res})
	replay_data = HttpResponse(dat)
	return replay_data
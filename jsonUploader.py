import json
from elasticsearch import Elasticsearch


es = Elasticsearch([{'host':'ir-express-elasticse-4727300251.us-east-1.bonsaisearch.net/', 'port': 443 , 'scheme':"https",'http_auth':('yckd5kiwbh','koejqf0pwn')}])
i = 0
with open('netflix.json') as raw_data:
	json_docs = json.load(raw_data)
	for item in json_docs.keys():
		i = i + 1
		es.index(index='netflix' , id=i, body=json.dumps(json_docs[item]))
		print(i)
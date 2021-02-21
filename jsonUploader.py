import json 
from elasticsearch import Elasticsearch

es= Elasticsearch([{'host': 'localhost', 'port':9200}])
i=0
with open('netflix.json') as raw_data:
    json_docs = json.load(raw_data)
    for item in json_docs.keys():
        i = i + 1
        es.index(index='netflix', id=i, body=json.dumps(json_docs[item]))


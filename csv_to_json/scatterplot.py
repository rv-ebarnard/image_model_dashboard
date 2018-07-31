import json

final = []

with open('fileDumped.json') as json_file:
    data = json.load(json_file)
    print(data[0][0])
    # for obj in data:
    #     print(obj.model)


#go through each object | check all fields if over .2 pull 
#for counter, value in enumerate(list)
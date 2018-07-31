#converts csv file into a json file that looks like this
# [
#     {"model": appName.modelName,
#         "pk": primaryKeyName,
#         "fields": {
#             "otherFieldsThatArentPK" : xxx,
#             "etc.": xxx
#         }
#     }
# ]
import csv, json

appName = 'viz'
modelName = 'featurectr'
appModelName = appName + '.' + modelName
fieldsAre1stLineCSV = True
data = []

class DObj( object ):
    def __init__(self, model, pk, fields):
        self.model = model
        self.pk = pk
        self.fields = fields

class FObj(object):
    pass

with open('fileToClean.csv', 'r') as csvFile:
    csvReader = csv.reader(csvFile, delimiter=',')
    if fieldsAre1stLineCSV == True:
        fieldNames = next(csvReader)
    
    for row in csvReader:
        dObj = DObj(appModelName, '', {}) 
        fieldValues = []
        for column in row:
            fieldValues.append(column)
        fieldPairs = zip(fieldNames, fieldValues)

        fObj = FObj()
        for pair in fieldPairs:
            if(pair[0] == fieldNames[0]):
                setattr(dObj, 'pk', pair[1])
            else:
                setattr(fObj, str(pair[0]), pair[1])
            setattr(dObj, 'fields', fObj)
        data.append(dObj)

with open('fileDumped.json', 'w') as jsonFile:
    json.dump(data, jsonFile, default=lambda o: o.__dict__, indent = 4)

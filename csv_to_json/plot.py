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

    # print(data[0].fields.ctr)
plot_data = []

for c, d in enumerate(data):
    #print(d.fields.black_x)
    inner_d = []
    if float(d.fields.black_x) >= .2:
        inner_d.append('Black X')
        inner_d.append(1)
        inner_d.append(float(d.fields.ctr))
        inner_d.append(d.pk)
        plot_data.append(inner_d)
        inner_d = []

    if float(d.fields.text) >= .2:
        inner_d.append('Text')
        inner_d.append(2)
        inner_d.append(float(d.fields.ctr))
        inner_d.append(d.pk)
        plot_data.append(inner_d)
        inner_d = []

    if float(d.fields.girl) >= .2:
        inner_d.append('Girl')
        inner_d.append(3)
        inner_d.append(float(d.fields.ctr))
        inner_d.append(d.pk)
        plot_data.append(inner_d)
        inner_d = []

    if float(d.fields.headwear) >= .2:
        inner_d.append('Head Wear')
        inner_d.append(4)
        inner_d.append(float(d.fields.ctr))
        inner_d.append(d.pk)
        plot_data.append(inner_d)
        inner_d = []

    if float(d.fields.poster) >= .2:
        inner_d.append('Poster')
        inner_d.append(5)
        inner_d.append(float(d.fields.ctr))
        inner_d.append(d.pk)
        plot_data.append(inner_d)
        inner_d = []

    if float(d.fields.fun) >= .2:
        inner_d.append('Fun')
        inner_d.append(6)
        inner_d.append(float(d.fields.ctr))
        inner_d.append(d.pk)
        plot_data.append(inner_d)
        inner_d = []

    if float(d.fields.skyblue) >= .2:
        inner_d.append('Sky Blue')
        inner_d.append(7)
        inner_d.append(float(d.fields.ctr))
        inner_d.append(d.pk)
        plot_data.append(inner_d)
        inner_d = []
    
print(plot_data)

# [[feature, ctr, name], [x, y, name]]
with open('scatter.json', 'w') as jsonFile:
    json.dump(plot_data, jsonFile, default=lambda o: o.__dict__, indent = 4)

#go through fields find x > .2
#for counter, value in enumerate(list)

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
                if str(pair[0]) != 'ctr':
                    if float(pair[1]) >= .2:
                        setattr(fObj, str(pair[0]), 1)
                    else:
                        setattr(fObj, str(pair[0]), 0)
                else:
                    setattr(fObj, str(pair[0]), float(pair[1]))
            setattr(dObj, 'fields', fObj)
        data.append(dObj)

# with open('test.json', 'w') as jsonFile:
#    json.dump(data, jsonFile, default=lambda o: o.__dict__, indent = 4)


#take averages of each feature
#take photos that dont

black_x, text, girl, headwear, poster, fun = ([] for i in range(6))
bar_data = []

for c, d in enumerate(data):
    if d.fields.black_x == 0:
        black_x.append(d.fields.ctr)
    if d.fields.text == 0:
        text.append(d.fields.ctr)
    if d.fields.girl == 0:
        girl.append(d.fields.ctr)
    if d.fields.headwear == 0:
        headwear.append(d.fields.ctr)
    if d.fields.poster == 0:
        poster.append(d.fields.ctr)
    if d.fields.fun == 0:
        fun.append(d.fields.ctr)


bar_data.append(['black_x', sum(black_x)/len(black_x)])
bar_data.append(['text', sum(text)/len(text)])
bar_data.append(['girl', sum(girl)/len(girl)])
bar_data.append(['headwear', sum(headwear)/len(headwear)])
bar_data.append(['poster', sum(poster)/len(poster)])
bar_data.append(['fun', sum(fun)/len(fun)])

# print(bar_data)

#Average CTR for images that have this feature
avg_ctr_1 = [['black_x', 0.012007244421217112], ['text', 0.007705460407745379], ['girl', 0.008570897677661093], ['headwear', 0.011164466679783318], ['poster', 0.00824952538958081], ['fun', 0.011106801560462906]]

#Average CTR for images that don't have this feature
avg_ctr_0 = [['black_x', 0.009514896147551327], ['text', 0.010743236700575833], ['girl', 0.010025179922657277], ['headwear', 0.0095229173435875], ['poster', 0.010107272365394973], ['fun', 0.009395970958399183]]

diff_avg = []


for x in range(0, 6):
    diff_avg.append(avg_ctr_1[x][1] - avg_ctr_0[x][1])

print(diff_avg)

#check if feature present for more than one
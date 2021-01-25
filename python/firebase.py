import csv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pandas as pd


with open('data/label.csv', 'r', encoding='utf-8') as f:
    rdr = csv.reader(f)
    for i, line in enumerate(rdr):
        if i == 0:
            label = line
merge = pd.read_csv('data/merge.csv')

# Use a service account
cred = credentials.Certificate('checipe-7d4fd-firebase-adminsdk-gv3b4-1323c05182.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


'''for i in range(len(merge)):
    doc_ref = db.collection('merge').document(merge.iloc[i]['name'])
    doc_ref.set({
        'part': merge.iloc[i]['part'],
        'way': merge.iloc[i]['way'],
        'img': merge.iloc[i]['img'],
        'detail': merge.iloc[i]['detail'],
        'manual': merge.iloc[i]['manual'],
        'numbers': label[i]
    })

'''


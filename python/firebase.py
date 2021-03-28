import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pandas as pd


merge = pd.read_csv('data/merge_fin_fin.csv')

merge1 = merge[merge['step'] == 'vegan']
merge2 = merge[merge['step'] == 'lacto']
merge3 = merge[merge['step'] == 'ovo']
merge4 = merge[merge['step'] == 'lacto-ovo']
merge5 = merge[merge['step'] == 'pollo']
merge6 = merge[merge['step'] == 'pollo-pesco']
merge7 = merge[merge['step'] == 'pesco']
merge8 = merge[merge['step'] == 'flex']


# Use a service account
cred = credentials.Certificate('checipe-7d4fd-firebase-adminsdk-gv3b4-1d8dff1bac.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

# 락토컬랙션 각 문서에 order 필드 추가
# for i in range(len(merge2)):
#     lacto = db.collection('lacto').document(merge2.iloc[i]['name'])
#     lacto.update({
#         'order': i
#     })

# for i in range(len(merge)):
#     db_merge = db.collection('merge').document(merge.iloc[i]['name'])
#     db_merge.update({
#         "like" : 0
#    })
    #     db_merge.set({
    #         'part': merge.iloc[i]['part'],
    #         'way': merge.iloc[i]['way'],
    #         'img': merge.iloc[i]['img'],
    #         'detail': merge.iloc[i]['detail'],
    #         'manual': merge.iloc[i]['manual'].lstrip('[').rstrip(']'),
    #         'numbers': merge.iloc[i]['number'],
    #         'order': i,
    #         'step': merge.iloc[i]['step']
    #     })

# for i in range(len(merge1)):
#     vegan = db.collection('vegan').document(merge1.iloc[i]['name'])
#     vegan.update({
#         "like" : 0
#    })
    # vegan.set({
    #     'id': i,
    #     'part': merge1.iloc[i]['part'],
    #     'way': merge1.iloc[i]['way'],
    #     'img': merge1.iloc[i]['img'],
    #     'detail': merge1.iloc[i]['detail'],
    #     'manual': merge1.iloc[i]['manual'].lstrip('[').rstrip(']'),
    #     'numbers': merge1.iloc[i]['number'],
    #     'step': merge1.iloc[i]['step']
    # })
#
# for i in range(len(merge2)):
#     vegan = db.collection('lacto').document(merge2.iloc[i]['name'])
#     vegan.update({
#         "like" : 0
#    })
    # vegan.set({
    #     'id': i,
    #     'part': merge2.iloc[i]['part'],
    #     'way': merge2.iloc[i]['way'],
    #     'img': merge2.iloc[i]['img'],
    #     'detail': merge2.iloc[i]['detail'],
    #     'manual': merge2.iloc[i]['manual'].lstrip('[').rstrip(']'),
    #     'numbers': merge2.iloc[i]['number'],
    #     'step': merge2.iloc[i]['step']
    # })
#
# for i in range(len(merge3)):
#     vegan = db.collection('ovo').document(merge3.iloc[i]['name'])
#     vegan.update({
#         "like" : 0
#     })
    # vegan.set({
    #     'id': i,
    #     'part': merge3.iloc[i]['part'],
    #     'way': merge3.iloc[i]['way'],
    #     'img': merge3.iloc[i]['img'],
    #     'detail': merge3.iloc[i]['detail'],
    #     'manual': merge3.iloc[i]['manual'].lstrip('[').rstrip(']'),
    #     'numbers': merge3.iloc[i]['number'],
    #     'step': merge3.iloc[i]['step']
    # })

# for i in range(len(merge4)):
#     vegan = db.collection('lacto-ovo').document(merge4.iloc[i]['name'])
#     vegan.update({
#         "like" : 0
#     })
    # vegan.set({
    #     'id': i,
    #     'part': merge4.iloc[i]['part'],
    #     'way': merge4.iloc[i]['way'],
    #     'img': merge4.iloc[i]['img'],
    #     'detail': merge4.iloc[i]['detail'],
    #     'manual': merge4.iloc[i]['manual'].lstrip('[').rstrip(']'),
    #     'numbers': merge4.iloc[i]['number'],
    #     'step': merge4.iloc[i]['step']
    # })

# for i in range(len(merge5)):
#     vegan = db.collection('pollo').document(merge5.iloc[i]['name'])
#     vegan.update({
#         "like" : 0
#     })
    # vegan.set({
    #     'id': i,
    #     'part': merge5.iloc[i]['part'],
    #     'way': merge5.iloc[i]['way'],
    #     'img': merge5.iloc[i]['img'],
    #     'detail': merge5.iloc[i]['detail'],
    #     'manual': merge5.iloc[i]['manual'].lstrip('[').rstrip(']'),
    #     'numbers': merge5.iloc[i]['number'],
    #     'step': merge5.iloc[i]['step']
    # })
#
# for i in range(len(merge6)):
#     vegan = db.collection('pollo-pesco').document(merge6.iloc[i]['name'])
#     vegan.update({
#         "like" : 0
#     })
    # vegan.set({
    #     'id': i,
    #     'part': merge6.iloc[i]['part'],
    #     'way': merge6.iloc[i]['way'],
    #     'img': merge6.iloc[i]['img'],
    #     'detail': merge6.iloc[i]['detail'],
    #     'manual': merge6.iloc[i]['manual'].lstrip('[').rstrip(']'),
    #     'numbers': merge6.iloc[i]['number'],
    #     'step': merge6.iloc[i]['step']
    # })

# for i in range(len(merge7)):
#     vegan = db.collection('pesco').document(merge7.iloc[i]['name'])
#     vegan.update({
#         "like" : 0
#     })
    # vegan.set({
    #     'id': i,
    #     'part': merge7.iloc[i]['part'],
    #     'way': merge7.iloc[i]['way'],
    #     'img': merge7.iloc[i]['img'],
    #     'detail': merge7.iloc[i]['detail'],
    #     'manual': merge7.iloc[i]['manual'].lstrip('[').rstrip(']'),
    #     'numbers': merge7.iloc[i]['number'],
    #     'step': merge7.iloc[i]['step']
    # })


# for i in range(len(merge8)):
#     vegan = db.collection('flex').document(merge8.iloc[i]['name'])
#     vegan.update({
#         'like' : 0
#     })
    #     vegan.set({
    #         'part': merge8.iloc[i]['part'],
    #         'way': merge8.iloc[i]['way'],
    #         'img': merge8.iloc[i]['img'],
    #         'detail': merge8.iloc[i]['detail'],
    #         'manual': merge8.iloc[i]['manual'].lstrip('[').rstrip(']'),
    #         'numbers': merge8.iloc[i]['number'],
    #         'order' : i,
    #         'step': merge8.iloc[i]['step']
    #     })
import pandas as pd
import re
import csv


ing = pd.read_csv('data/merge.csv')
ing = ing['detail']
div_num, spliting, spliting_fin = [], [], []

mining = pd.read_csv('data/mining_merge.csv', encoding='UTF-8')
div_dic = dict()
for key, value in zip(mining['ing'], mining['div']):
    div_dic[key] = value
#div_dic[''] = 0

# 한 메뉴씩 접근
for rcp in ing:
    temp = rcp.replace('\r', '').replace('\n', ',')
    edit_ingre = (temp.split(','))
    hangul = re.compile('[^ \u3131-\u3163\uac00-\ud7a3]+')  # 한글 외 문자
    for d in edit_ingre:
        d = re.sub(r'\([^)]*\)', '', d)  # 괄호 안의 것 필터링
        d = re.sub(r'약간|적당량|다진것|\d.', '', d)  # 괄호 안의 것 필터링
        # spliting.append(hangul.sub(' ', d).strip())
        d = hangul.sub(' ', d).strip()
        try:
            spl = d.split(' ')
            for a in spl:
                if a == '':
                    continue
                spliting.append(a.strip())
        except:
            spliting.append(d.strip())
    spliting_fin.append(spliting)
    spliting = []


dives = []

for fspl in spliting_fin:
    div_num = []
    for sspl in fspl:
        div_num.append(div_dic[sspl])
    dives.append(list(set(div_num)))

print(dives)

with open('data/label.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(dives)

'''vegan = []

for d in dives:
    if 1 not in d:
        if d == [0]:
            vegan.append('vegan')
            continue
        if d == [0, 4]:
            vegan.append('ovo')
            continue
        if d == [0, 5]:
            vegan.append('lacto')
            continue
        if d == [0, 4, 5]:
            vegan.append('lacto-ovo')
            continue
        if d == [0, 2, 4, 5]:
            vegan.append('pollo')
            continue
        if d == [0, 3, 4, 5]:
            vegan.append('pesco')
            continue
        if d == [0, 2, 3, 4, 5]:
            vegan.append('pollo-pesco')
            continue
    else:
        vegan.append('flex')
print(vegan)
print(len(vegan))'''

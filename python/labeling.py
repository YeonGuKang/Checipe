import pandas as pd
import re
import csv

spliting, spliting_fin, dives = [], [], []

# 데이터 불러오기
ing_ori = pd.read_csv('data/merge.csv')
ing = ing_ori['detail']
mining = pd.read_csv('data/mining_merge.csv', encoding='UTF-8')
div_dic = dict()
for key, value in zip(mining['ing'], mining['div']):
    div_dic[key] = value

# 한 메뉴씩 접근해서 단어 분류
for rcp in ing:
    temp = rcp.replace('\r', '').replace('\n', ',')
    edit_ingre = (temp.split(','))  # ,를 기준으로 나눔
    hangul = re.compile('[^ \u3131-\u3163\uac00-\ud7a3]+')  # 한글 외 문자
    for d in edit_ingre:
        d = re.sub(r'\([^)]*\)', '', d)  # 괄호 안의 것 필터링
        d = re.sub(r'약간|적당량|다진것|\d.', '', d)  # 괄호 안의 것 필터링
        d = hangul.sub(' ', d).strip()
        try:
            spl = d.split(' ')
            for a in spl:
                if a == '': #값이 없는 경우
                    continue
                spliting.append(a.strip())
        except:
            spliting.append(d.strip())
    spliting_fin.append(spliting)
    spliting = []

# 원본 데이터의 재료 분류코드 생성 작업
for fspl in spliting_fin:
    div_num = []
    for sspl in fspl:
        div_num.append(div_dic[sspl])
    dives.append(list(set(div_num)))    #중복제거하여 리스트에 저장

# 분류코드와 원본 데이터를 통합
df = pd.DataFrame(ing_ori)
div = pd.Series(dives)
df['number'] = div  #df의 number칼럼에 분류 코드를 통합
df.to_csv('data/merge_fin.csv', encoding='utf-8-sig', index=False)
merge_f = pd.read_csv('data/merge_fin.csv')
merge_f = pd.DataFrame(merge_f)
# with open('data/label.csv', 'w', newline='') as f:
#     writer = csv.writer(f)
#     writer.writerow(dives)

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
search = [1,2,3,4,5]
merge_f['step'] = ''
print(merge_f)
for me in merge_f['number']:
    i = 0
    for se in search:
        if se in list(me):
            continue
        else:
            i = 1
    if i == 1:
        merge_f['step'].append('vegan')
print(merge_f['step'])
dd = []
for se in search:
    print(type(se))
    dd.append([word for word in merge_f['number'] if se in list(word)])
print(dd)

 
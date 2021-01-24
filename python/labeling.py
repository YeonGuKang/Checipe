import pandas as pd
import re

ing = pd.read_csv('data/data.csv', encoding='euc-kr')
ing = ing.dropna(axis=0)
ing = ing['detail']
div_num, spliting, spliting_fin = [], [], []

mining = pd.read_csv('data/mining_merge.csv', encoding='UTF-8')
div_dic = dict()
for key, value in zip(mining['ing'], mining['div']):
    div_dic[key] = value

# 한 메뉴씩 접근
for rcp in ing:
    temp = rcp.replace('\r', '').replace('\n', ',')
    edit_ingre = (rcp.split(','))
    hangul = re.compile('[^ \u3131-\u3163\uac00-\ud7a3]+')  # 한글 외 문자
    for d in edit_ingre:
        d = re.sub(r'\([^)]*\)', '', d)  # 괄호 안의 것 필터링
        d = re.sub(r'약간|적당량|다진것|\d.', '', d)  # 괄호 안의 것 필터링
        # spliting.append(hangul.sub(' ', d).strip())
        d = hangul.sub(' ', d).strip()
        try:
            spl = d.split(' ')
            for a in spl:
                spliting.append(a.strip())
        except:
            spliting.append(d.strip())
    spliting = []
    spliting_fin.append(spliting)

print(spliting_fin)
print(len(spliting_fin))
# for spl in spliting:
#     print(spl)
#     spl = spl.split(' ')
#     print(spl)
#     for a in spl:
#         spliting_fin.append(a.strip())

# dives = []
# print(spliting_fin)
# for spl in spliting_fin:
#     try:
#         dives.append(div_dic[spl])
#     except Exception:
#         print(spl + '는 없습니다.')
#     div_num.append(dives)
# print(dives)
# print(div_num)
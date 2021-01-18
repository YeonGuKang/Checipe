import pandas as pd
import re

ing = pd.read_csv('../data/data.csv', encoding='euc-kr')
ing = ing['detail']
div_num = []

mining = pd.read_csv('../data/mining_merge_fin.csv')
div_dic = dict()
for key, value in zip(mining['ing'], mining['div']):
    div_dic[key] = value

for rcp in ing:
    temp = rcp.replace('\r', '').replace('\n', ',')
    edit_ingre = (temp.split(','))
    hangul = re.compile('[^ \u3131-\u3163\uac00-\ud7a3]+')  # 한글 외 문자
    for d in edit_ingre:
        d = re.sub(r'\([^)]*\)', '', d)  # 괄호 안의 것 필터링
        d = re.sub(r'약간|적당량|다진것|\d.', '', d)  # 괄호 안의 것 필터링
        for k in hangul.sub(' ', d).strip():  # 한글과 띄어쓰기를 제외한 모든 부분 필터링
            dives = []
            try:
                dives.append(div_dic[k])
            except Exception:
                print(k + '는 없습니다.')
            div_num.append(dives)
print(dives)
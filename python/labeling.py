import pandas as pd
import re


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
        st = str(set(div_num))
        st = st.rstrip('}').lstrip('{')
        st = st.replace(',', '')
    dives.append(st)    #중복제거하여 리스트에 저장

# 분류코드와 원본 데이터를 통합
df = pd.DataFrame(ing_ori)
div = pd.Series(dives)
df['number'] = div  #df의 number칼럼에 분류 코드를 통합
df.to_csv('data/merge_fin.csv', encoding='utf-8-sig', index=False)



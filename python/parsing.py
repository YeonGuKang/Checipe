import requests
from bs4 import BeautifulSoup
import pandas as pd

start = '1'
end = '1000'

rcp_nm_list = []    # 레시피 이름을 저장할 리스트
rcp_part_list = []  # 레시피 음식 종류
rcp_how_list = []   # 레시피 조리 방법
rcp_img_list = []   # 레시피 이미지
rcp_ingre_list = [] # 레시피 재료

'''
두 번에 걸쳐 1237개의 레시피 데이터를 모두 가져온다
'''
for _ in range(2):
    url = 'http://openapi.foodsafetykorea.go.kr/api/ddc71faf24fc455e8410/COOKRCP01/xml/' + start + '/' + end
    html = requests.get(url)
    soup = BeautifulSoup(html.text, 'html.parser')

    # 레시피 이름 parsing
    rcp_nm = soup.find_all('rcp_nm')
    for nm in rcp_nm:
        rcp_nm_list.append(nm.text)

    # 레시피 재료
    rcp_ingre = soup.find_all('rcp_parts_dtls')
    for ingre in rcp_ingre:
        rcp_ingre_list.append(ingre.text)

    # 레시피 종류
    rcp_part = soup.find_all('rcp_pat2')
    for part in rcp_part:
        rcp_part_list.append(part.text)

    # 레시피 조리 방법
    rcp_how = soup.find_all('rcp_way2')
    for how in rcp_how:
        rcp_how_list.append(how.text)

    # 레시피 이미지
    rcp_img = soup.find_all('att_file_no_mk')
    for img in rcp_img:
        rcp_img_list.append(img.text)

    start = '1001'
    end = '2000'

data = pd.DataFrame({'name': rcp_nm_list,
                     'part': rcp_part_list,
                     'way': rcp_how_list,
                     'img': rcp_img_list,
                     'detail': rcp_ingre_list})
data.to_csv('data.csv', encoding='euc-kr', index=False)
import pandas as pd
from bs4 import BeautifulSoup
import requests
import re
import csv

key='ddc71faf24fc455e8410'
start = 1
end = 1000
ingre = []
t = 1
while t <= 2:
    url = "http://openapi.foodsafetykorea.go.kr/api/"+key+"/COOKRCP01/xml/"+str(start)+"/"+str(end)
    req = requests.get(url)
    html = req.text
    soup = BeautifulSoup(html, 'html.parser')
    rcpingre = soup.find_all('rcp_parts_dtls')
    for rcp in rcpingre:
        temp = rcp.text.replace('\r', '').replace('\n', ',')
        edit_ingre = (temp.split(','))
        hangul = re.compile('[^ \u3131-\u3163\uac00-\ud7a3]+')  #한글 외 문자
        for d in edit_ingre:
            d = re.sub(r'\([^)]*\)', '', d) # 괄호 안의 것 필터링
            d = re.sub(r'약간|적당량|다진것|\d.', '', d)  # 괄호 안의 것 필터링
            ingre.append(hangul.sub(' ', d).strip())  # 한글과 띄어쓰기를 제외한 모든 부분 필터링
            print(ingre)
    start = end+1
    end = 1237
    t += 1
    # num = 1
    # rcps, rcps_img = [], []
    # while True:
    #     if num < 10:
    #         lvar = 'manual0'+str(num)
    #         varimg = 'manual_img0' + str(num)
    #     else:
    #         var = 'rcp_manua'+str(num)
    #         varimg = 'rcp_manual_img' + str(num)
    #     rcps.append(soup.find_all(var)) #만드는 과정
    #     rcps_img.append(soup.find_all(varimg))  # 만드는 과정 이미지
    #     if not rcps[num-1]:
    #         break
    #     num += 1
    # start += 1
# # print(rcps_img.text)
# Recipe_Info = [[],[],[],[],[],[]]
# # for rcp in rcpnm:
# #     Recipe_Info['rcpnm'].append(rcp.text)
# # for rcp in rcpingre:
# #     Recipe_Info['rcpingre'].append(rcp.text)
# # for rcp in rcppart:
# #     Recipe_Info['rcppart'].append(rcp.text)
# # for rcp in rcphow:
# #     Recipe_Info['rcphow'].append(rcp.text)
# # for rcp in rcpimg:
# #     Recipe_Info['rcpimg'].append(rcp.text)
# # for rcp in rcps:
# #     Recipe_Info['rcps'].append(rcp.text)
# # for rcp in rcps_img:
# #     Recipe_Info['rcps_img'].append(rcp.text)
#
# for rcp in rcpnm:
#     Recipe_Info[0].append(rcp.text)
# for rcp in rcpingre:
#     Recipe_Info[1].append(rcp.text)
# for rcp in rcppart:
#     Recipe_Info[2].append(rcp.text)
# for rcp in rcphow:
#     Recipe_Info[3].append(rcp.text)
# for rcp in rcpimg:
#     Recipe_Info[4].append(rcp.text)
# # for rcp in rcps:
# #     Recipe_Info[5].append(rcp.text)
# # for rcp in rcps_img:
# #     Recipe_Info[6].append(rcp.text)
# df = pd.DataFrame(Recipe_Info)
# print(df)
# for i in ingre:
#     print(i)
#     edit_ingre.append(i.split(' '))
set_ingre = set(edit_ingre)
ingre = list(set_ingre)

print(ingre)
# with open('mining.csv', 'w', newline='') as f:
#     writer = csv.writer(f)
#     writer.writerow(ingre)
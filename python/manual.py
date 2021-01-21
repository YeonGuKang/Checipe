import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

start = '1'
end = '1000'

ma = re.compile('manual[0-20]') 
manual_list = []
for _ in range(2):
    url = 'http://openapi.foodsafetykorea.go.kr/api/ddc71faf24fc455e8410/COOKRCP01/xml/' + start + '/' + end
    html = requests.get(url)
    soup = BeautifulSoup(html.text, 'html.parser')
    manual = soup.find_all(ma)
    index = 0
    for _ in range(len(manual) // 20):
        temp = []
        for i in range(20):
            try:
                if manual[index].text == '':
                    index += 1
                    continue
                temp.append(manual[index].text)
                if index >= len(manual):
                    break
                index += 1
            except:
                break
        manual_list.append(temp)

    start = '1001'
    end = '2000'


data = pd.DataFrame({'manual': manual_list})
data.to_csv('manual.csv', encoding='utf-8-sig', index=False)
print(data)
print(manual_list)
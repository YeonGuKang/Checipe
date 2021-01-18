import csv
import pandas as pd
ori = pd.read_csv("mining.csv", encoding='UTF-8')

d = list(ori['재료'].tolist())
print(d)
edit_ingre = []
for i in d:
    # temp = rcp.text.replace('\r', '').replace('\n', ',')
    temp = (i.split(' '))
    for a in temp:
        edit_ingre.append(a.strip())
edit_ingre = ' '.join(edit_ingre).split()
print(edit_ingre)

set_ingre = set(edit_ingre)
ingre = list(set_ingre)
print(len(ingre))
with open('mining_fin.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(ingre)
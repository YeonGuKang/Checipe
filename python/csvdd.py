import csv
import pandas as pd
ori = pd.read_csv("data/mining.csv", encoding='UTF-8')

d = list(ori['재료'].tolist())
print(d)
edit_ingre = []
for i in d:
    # temp = rcp.text.replace('\r', '').replace('\n', ',')
    edit_ingre.append(i.strip())
    # temp = (i.split(' '))
    # for a in temp:

edit_ingre = ' '.join(edit_ingre).split()
print(edit_ingre)

set_ingre = set(edit_ingre)
ingre = list(set_ingre)
print(len(ingre))
print(ingre)
# with open('mining_fin.csv', 'w', newline='') as f:
#     writer = csv.writer(f)
#     writer.writerow(ingre)
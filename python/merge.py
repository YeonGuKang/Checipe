import pandas as pd

data = pd.read_csv('data/data.csv', encoding='euc-kr')
manual = pd.read_csv('data/manual.csv')
manual = manual['manual'].tolist()
new_ma = []
for ma in manual:
    temp = ma.replace('\r', '').replace('\n', ' ')
    temp = temp.replace('\\r', '').replace('\\n', ' ')
    new_ma.append(temp)


manual = pd.DataFrame({'manual': new_ma})
merge = pd.concat([data, manual], axis=1)
merge = merge.dropna(subset=['detail'], axis=0)
print(merge.shape)
merge.to_csv('data/merge.csv', encoding='utf-8-sig', index=False)

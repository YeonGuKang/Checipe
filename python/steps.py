import pandas as pd


merge_f = pd.read_csv('data/merge_fin.csv')
merge_f = pd.DataFrame(merge_f)

vegan = [1, 2, 3, 4, 5]
step = []

for me in merge_f['number']:
    i = 1
    for se in vegan:
        if str(se) in list(me):
            i = 0
            break
    if i == 1:
        step.append('vegan')
    else:
        step.append('flex')

ovo = [1, 2, 3, 5]
for index in range(1234):
    if step[index] == 'flex':
        i = 1
        for se in ovo:
            if str(se) in list(merge_f['number'].iloc[index]):
                i = 0
                break
        if i == 1:
            step[index] = 'ovo'

lacto = [1, 2, 3, 4]
for index in range(1234):
    if step[index] == 'flex':
        i = 1
        for se in lacto:
            if str(se) in list(merge_f['number'].iloc[index]):
                i = 0
                break
        if i == 1:
            step[index] = 'lacto'

lacto_ovo = [1, 2, 3]
for index in range(1234):
    if step[index] == 'flex':
        i = 1
        for se in lacto_ovo:
            if str(se) in list(merge_f['number'].iloc[index]):
                i = 0
                break
        if i == 1:
            step[index] = 'lacto-ovo'

pollo = [1, 3]
for index in range(1234):
    if step[index] == 'flex':
        i = 1
        for se in pollo:
            if str(se) in list(merge_f['number'].iloc[index]):
                i = 0
                break
        if i == 1:
            step[index] = 'pollo'

pesco = [1, 2]
for index in range(1234):
    if step[index] == 'flex':
        i = 1
        for se in pesco:
            if str(se) in list(merge_f['number'].iloc[index]):
                i = 0
                break
        if i == 1:
            step[index] = 'pesco'

pollo_pesco = [1]
for index in range(1234):
    if step[index] == 'flex':
        i = 1
        for se in pollo_pesco:
            if str(se) in list(merge_f['number'].iloc[index]):
                i = 0
                break
        if i == 1:
            step[index] = 'pollo-pesco'

step = pd.Series(step)
merge_f['step'] = step
merge_f.to_csv('data/merge_fin_fin.csv', encoding='utf-8-sig', index=False)
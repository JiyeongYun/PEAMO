import pandas as pd
import json

# 노트 data 읽어오기
with open('./Notes.json', 'r', encoding='UTF-8') as f:
    notes = json.load(f)
# 향수 data 읽어오기
with open('./Perfumes.json', 'r', encoding='UTF-8') as f:
    perfumes = json.load(f)

# 향수의 모든 노트 번호를 담은 list
note_nums = list(range(1, len(notes)+1))

# 향수의 모든 이름을 담은 list
perfume_names = []
for perfume in perfumes:
    perfume_names.append(perfume['name'])

# row : 향수 이름 / column : 향수 노트 id 인 DataFrame 생성
df = pd.DataFrame(columns=note_nums, index=perfume_names)

# 각 향수가 가지고 있는 note 들은 1로 표시
for perfume in perfumes:
    name, top_notes, middle_notes, base_notes = perfume['name'], perfume[
        'top_notes'], perfume['middle_notes'], perfume['base_notes']
    for note in top_notes:
        df.loc[name, note] = 1
    for note in middle_notes:
        df.loc[name, note] = 1
    for note in base_notes:
        df.loc[name, note] = 1

df.to_csv('perfume_notes.csv')

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

# 향수의 id 값을 list에 담는다
perfume_ids = []
for perfume in perfumes:
    id, top_notes, middle_notes, base_notes = perfume['id'], perfume[
        'top_notes'], perfume['middle_notes'], perfume['base_notes']

    # notes 값이 없으면 list에 넣지 않는다
    cnt = len(top_notes) + len(middle_notes) + len(base_notes)
    if cnt != 0:
        perfume_ids.append(id)

# row : 향수 id / column : 향수 노트 id 인 DataFrame 생성
df = pd.DataFrame(columns=note_nums, index=perfume_ids)

# 각 향수가 가지고 있는 note 들은 1로 표시
for perfume in perfumes:
    id, top_notes, middle_notes, base_notes = perfume['id'], perfume[
        'top_notes'], perfume['middle_notes'], perfume['base_notes']

    # 노트가 없는 향수는 pass
    cnt = len(top_notes) + len(middle_notes) + len(base_notes)
    if cnt == 0:
        continue

    for note in top_notes:
        df.loc[id, note] = 1
    for note in middle_notes:
        df.loc[id, note] = 1
    for note in base_notes:
        df.loc[id, note] = 1

df.to_csv('perfume_notes.csv')

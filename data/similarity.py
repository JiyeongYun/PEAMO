import pandas as pd
from sqlalchemy import *
from sklearn.metrics.pairwise import cosine_similarity
from rds_engine import create_engine

df = pd.read_csv('perfume_notes.csv', index_col=0)
df = df.fillna(0)

similarity = cosine_similarity(df)

n_df = pd.DataFrame(similarity, columns=df.index, index=df.index)

idx_list = n_df.index
value = []
for r in idx_list:
    for c in idx_list:
        if r >= c:
            continue
        temp = [r, c, n_df.loc[r, c]]
        value.append(temp)
    print(r)

s_df = pd.DataFrame(value, columns=['index', 'columns', 'similarity'])



# 데이터프레임 통째로 MySQL로 넣기
engine = create_engine()
conn = engine.connect()


s_df.to_sql(name="similarity", con=engine, if_exists='append',index=False)

conn.close()
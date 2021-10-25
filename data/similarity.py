import pandas as pd
from sqlalchemy import *
from sklearn.metrics.pairwise import cosine_similarity
from rds_engine import create_engine

df = pd.read_csv('perfume_notes.csv', index_col=0)
df = df.fillna(0)

similarity = cosine_similarity(df)

n_df = pd.DataFrame(similarity, columns=df.index, index=df.index)
n_df = n_df.drop_duplicates()
value = []
i = 0
for std in n_df.index:
    i += 1
    print(std, type(std))
    sort_df = n_df.loc[std, :].sort_values(ascending=False)
    id_list = sort_df.head(3).index
    value_list = sort_df.head(3).values
    temp = [std, id_list[1], value_list[1]]
    value.append(temp)
    temp = [std, id_list[2], value_list[2]]
    value.append(temp)
    if i == 1000:
        s_df = pd.DataFrame(value, columns=['standard', 'comparison', 'similarity'])

        # 데이터프레임 통째로 MySQL로 넣기
        engine = create_engine()
        conn = engine.connect()

        s_df.to_sql(name="similarity", con=engine, if_exists='append', index=False)

        conn.close()
        value = []
        i = 0
    elif std == 26160653:
        s_df = pd.DataFrame(value, columns=['standard', 'comparison', 'similarity'])

        # 데이터프레임 통째로 MySQL로 넣기
        engine = create_engine()
        conn = engine.connect()

        s_df.to_sql(name="similarity", con=engine, if_exists='append', index=False)

        conn.close()
        value = []
        i = 0
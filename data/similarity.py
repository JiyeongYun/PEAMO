import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv('perfume_notes.csv', index_col=0)
df = df.fillna(0)

similarity = cosine_similarity(df)

n_df = pd.DataFrame(similarity, columns=df.index, index=df.index)

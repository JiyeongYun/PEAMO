from rest_framework.decorators import api_view
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
# from recommender.setting import perfume_notes

@api_view(['GET'])
def cal_similarity(request):
    df = pd.read_csv('D:/JHW/Ssafy-Lecture/2학기/2-2 Project/S05P21A403/backend/recommender/recommender/setting/perfume_notes.csv', index_col=0)
    df = df.fillna(0)

    similarity = cosine_similarity(df)

    n_df = pd.DataFrame(similarity, columns=df.index, index=df.index)
    print(n_df)
    return 1
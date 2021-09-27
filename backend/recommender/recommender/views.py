from rest_framework.decorators import api_view
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity


def cal_similarity(request):
    path = 'C:/Users/multicampus/Desktop/SSAFY 2/S05P21A403/backend/recommender/recommender/setting/perfume_notes.csv'
    df = pd.read_csv(path, index_col=0)
    df = df.fillna(0)

    similarity = cosine_similarity(df)

    n_df = pd.DataFrame(similarity, columns=df.index, index=df.index)
    print(n_df)
    return 1

@api_view(['GET'])
def this_month(request):
    pass

@api_view(['POST'])
def recommend(request):
    pass
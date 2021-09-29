from rest_framework.decorators import api_view
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity


# 향수 id 값 하나를 받아서 그 향수와 유사도가 가장 높은 향수 2개를 뽑는 함수
def cal_similarity(request):
    path = 'C:/Users/multicampus/Desktop/SSAFY 2/S05P21A403/backend/recommender/recommender/setting/perfume_notes.csv'
    df = pd.read_csv(path, index_col=0)
    df = df.fillna(0)

    similarity = cosine_similarity(df)

    n_df = pd.DataFrame(similarity, columns=df.index, index=df.index)
    print(n_df)
    return 1

# 이달의 향수를 3개를 뽑아서 보내주는 함수
# 계절에 따라서 랜덤으로 1가지 향수를 뽑은 후
# 해당 향수와 유사도가 높은 2가지 향수를 뽑아 보내준다
@api_view(['GET'])
def this_month(request):
    pass

# 스무고개를 통해 3개의 향수롤 뽑아서 보내주는 함수
# 스무고개로 넘어온 데이터를 기반으로 랜덤으로 1가지 향수를 뽑은 후
# 해당 향수와 유사도가 높은 2가지 향수를 뽑아 보내준다
@api_view(['POST'])
def recommend(request):
    pass
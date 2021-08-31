import itertools
from collections import Counter
from parse import load_dataframes
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm


def set_config():
    # 폰트, 그래프 색상 설정
    font_list = fm.findSystemFonts(fontpaths=None, fontext="ttf")
    if any(["notosanscjk" in font.lower() for font in font_list]):
        plt.rcParams["font.family"] = "Noto Sans CJK JP"
    else:
        if not any(["malgun" in font.lower() for font in font_list]):
            raise Exception(
                "Font missing, please install Noto Sans CJK or Malgun Gothic. If you're using ubuntu, try `sudo apt install fonts-noto-cjk`"
            )

        plt.rcParams["font.family"] = "Malgun Gothic"

    sns.set_palette(sns.color_palette("Spectral"))
    plt.rc("xtick", labelsize=6)


def show_store_categories_graph(dataframes, n=100):
    """
    Tutorial: 전체 음식점의 상위 `n`개 카테고리 분포를 그래프로 나타냅니다.
    """

    stores = dataframes["stores"]

    # 모든 카테고리를 1차원 리스트에 저장합니다
    categories = stores.category.apply(lambda c: c.split("|"))
    categories = itertools.chain.from_iterable(categories)

    # 카테고리가 없는 경우 / 상위 카테고리를 추출합니다
    categories = filter(lambda c: c != "", categories)
    categories_count = Counter(list(categories))
    best_categories = categories_count.most_common(n=n)
    df = pd.DataFrame(best_categories, columns=["category", "count"]).sort_values(
        by=["count"], ascending=False
    )

    # 그래프로 나타냅니다
    chart = sns.barplot(x="category", y="count", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 카테고리 분포")
    plt.show()


def show_store_review_distribution_graph(dataframes, n=100):
    """
    Req. 1-3-1 전체 음식점의 리뷰 개수 분포를 그래프로 나타냅니다. 
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )  # left_on 왼쪽 data 에서 id를 기준으로, right_on 오른쪽 data 에서 store를 기준으로 값이 같은 애들(공통되는 부분)을 merge
    scores_group = stores_reviews.groupby(
        ["store", "store_name"])  # 가게 id로 그룹을 묶고 그 안에서 다시 가게 이름으로 그룹화 한다

    scores = scores_group.count().sort_values(
        by=["branch"], ascending=False).reset_index()  # 해당 가게가 받은 리뷰 개수 파악 및 내림차순 정렬 / reset_index()를 이용해서 index값 초기화
    # 가게 이름과 branch(사실상 리뷰 수) 2개의 column 만 추출
    df = scores[['store_name', 'branch']].head(n)
    df.columns = ['store_name', 'count']

    chart = sns.barplot(x="store_name", y="count", data=df)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 리뷰 수 분포")
    plt.show()


def show_store_average_ratings_graph(dataframes, n=100):
    """
    Req. 1-3-2 각 음식점의 평균 평점을 그래프로 나타냅니다.
    """
    stores_reviews = pd.merge(
        dataframes["stores"], dataframes["reviews"], left_on="id", right_on="store"
    )  # left_on 왼쪽 data 에서 id를 기준으로, right_on 오른쪽 data 에서 store를 기준으로 값이 같은 애들(공통되는 부분)을 merge
    scores_group = stores_reviews.groupby(
        ["store", "store_name"])  # 가게 id로 그룹을 묶고 그 안에서 다시 가게 이름으로 그룹화 한다

    scores = scores_group.mean()  # 평균 평점을 구한다
    scores = scores.reset_index()  # index값 초기화
    scores = scores[['store_name', 'score']].head(
        n)  # score 열과 store_name 열만 추출

    chart = sns.barplot(x="store_name", y="score", data=scores)
    chart.set_xticklabels(chart.get_xticklabels(), rotation=45)
    plt.title("음식점 평점 분포")
    plt.show()


def show_user_review_distribution_graph(dataframes):
    """
    Req. 1-3-3 전체 유저의 리뷰 개수 분포를 그래프로 나타냅니다.
    """
    raise NotImplementedError


def show_user_age_gender_distribution_graph(dataframes):
    """
    Req. 1-3-4 전체 유저의 성별/나이대 분포를 그래프로 나타냅니다.
    """
    raise NotImplementedError


def show_stores_distribution_graph(dataframes):
    """
    Req. 1-3-5 각 음식점의 위치 분포를 지도에 나타냅니다.
    """
    raise NotImplementedError


def main():
    set_config()
    data = load_dataframes()
    # show_store_categories_graph(data)
    # show_store_review_distribution_graph(data)
    # show_store_average_ratings_graph(data)


if __name__ == "__main__":
    main()

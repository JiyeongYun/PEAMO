import pymysql
import pandas as pd
from rds_setting import *

cursor = conn.cursor()

sql = 'CREATE TABLE similarity(id bigint NOT NULL PRIMARY KEY, '

df = pd.read_csv('perfume_notes.csv', index_col=0)

for perfumeId in df.index:
    sql += ('p' + str(perfumeId))
    sql += ' double ,'

sql = sql[:-1]
sql += ')'

# print(sql)
cursor.execute(sql)

conn.commit()
conn.close()

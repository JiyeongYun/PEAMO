import pymysql
import pandas as pd
from rds_setting import *


conn = create_conn()
cursor = conn.cursor()


f = open("D:/JHW/gender.csv")

while True:
    str = f.readline()
    if str =='':
        break
    str = str.replace("\"","")
    # No Exist
    if ":" in str: 
        result = str.split(":")
        continue
    # gender 존재
    else:
        str = str.rstrip()
        result = str.split(',')
    id = int(result[0])
    gender = int(result[1])
    result = [gender, id]
    print(result)
    sql = 'UPDATE api_perfume SET gender = %s WHERE id = %s' % (gender, id)
    cursor.execute(sql)
    conn.commit()

f.close()

conn.close()




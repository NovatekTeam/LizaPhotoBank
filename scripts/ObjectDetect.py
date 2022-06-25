import torch
from PIL import Image
import pandas as pd
import os

MAPPING = {
    0: 12,
    1: 11,
    2: 13,
    3: 15,
    4: 16,
    5: 17,
    6: 10,
    7: 14
}

model = torch.hub.load('ultralytics/yolov5', 'custom', path='../models/model-object-detect.pt') 
conn = 'postgresql://liza:topsecret@pg-liza-alert/public'
sql_query = 'select * from "Media"'
sql_ds = pd.read_sql(sql_query, conn)

for mediaName in sql_ds.mediaName.unique():
    media_id = sql_ds[sql_ds['mediaName']==mediaName]['id'].values[0]
    mediaPath=os.path.join('/data','images','LizaNew',mediaName)
    try:
        im=Image.open(mediaPath)
    except:
        print('Except with file %s, pass him' % (mediaPath))
        continue
    imgs = [im]
    results = model(imgs, size=800)
    tags=results.pandas().xyxy[0]['class'].unique()
    for tag in tags:
        try:
            tag_id = MAPPING[tag]
            pd.DataFrame([{'A':media_id, 'B': tag_id}]).to_sql('_MediaToTags',conn,if_exists='append',index=False)
        except:
            print('keys pair %s and %s already exist. Pass.' % (media_id, tag_id))

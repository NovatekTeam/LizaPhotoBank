import sys
from DataModule import DataModule
import numpy as np
import os
from tqdm import tqdm
import PIL.Image as Image
import io
import pandas as pd
import torchvision.transforms as transforms
import torch
import onnx
import onnxruntime as ort


def chunked(data, num):
    lst = []
    for i in range(0, len(data), num):
        lst.append(data[i:i+num])
    return lst


folder = '/home/savin/Documents/liza/valid_daily'
files = os.listdir(folder)
batch_files = []
for file in files:
    file = os.path.join(folder, file)
    image_data = np.fromfile(file, dtype='uint8')
    batch_files.append(image_data)
batch_files = np.asarray(batch_files)

loader = transforms.Compose([
    transforms.ToTensor(),
    transforms.Grayscale(num_output_channels=1),
    # transforms.Lambda(lambda image: torch.from_numpy(np.array(image).astype(np.float32))),
    transforms.Resize((800,800)),
    transforms.Normalize(0.5,0.5)
])

batch_out = []
for img in batch_files:
    pil_img = Image.open(io.BytesIO(img.tobytes())).convert('RGB')
    np_tensor = loader(pil_img).numpy()
    batch_out.append(np_tensor)
batch_out = np.asarray(batch_out)

iter_batch = chunked(batch_out,32)

model_daily = '/home/savin/Documents/liza/model_daily_v1_vlos_0_14.onnx'
model_season = '/home/savin/Documents/liza/model_season_v2_vlos_0_49.onnx'
model_location = '/home/savin/Documents/liza/model_location_v1_vlos_0_28.onnx'

data_set = pd.DataFrame()
for batch in iter_batch:    
    iter_set = pd.DataFrame()
    session = ort.InferenceSession(model_daily)
    input_name = session.get_inputs()[0].name
    pred_daily = session.run(None, {input_name: batch})
    out_daily = []
    for el in pred_daily[0]:
        if el[0] > el[1] and el[0] > el[2] and el[0] > 1:
            out_daily.append(1)
        elif el[1] > el[2] and el[1] > el[0] and el[1] > 1:
            out_daily.append(2)
        elif el[2] > el[0] and el[2] > el[1] and el[2] > 1:
            out_daily.append(3)
        else:
            out_daily.append(0)
    
    session = ort.InferenceSession(model_season)
    input_name = session.get_inputs()[0].name
    pred_season = session.run(None, {input_name: batch})
    out_season = []
    for el in pred_season[0]:
        if el[0] > el[1] and el[0] > el[2] and el[0] > el[3] and el[0] > 1:
            out_season.append(4)
        elif el[1] > el[0] and el[1] > el[1] and el[1] > el[3] and el[1] > 1:
            out_season.append(2)
        elif el[2] > el[0] and el[2] > el[1] and el[2] > el[3] and el[2] > 1:
            out_season.append(3)
        elif el[3] > el[0] and el[3] > el[1] and el[3] > el[2] and el[3] > 1:
            out_season.append(1)
        else:
            out_season.append(0)
    
    session = ort.InferenceSession(model_location)
    input_name = session.get_inputs()[0].name
    pred_location = session.run(None, {input_name: batch})
    out_location = []
    for el in pred_location[0]:
        if el[0] > el[1] and el[0] > 1:
            out_location.append(2)
        elif el[1] > el[0] and el[1] > 1:
            out_location.append(1)
        else:
            out_location.append(0)
    iter_set = pd.concat([pd.DataFrame(out_daily, columns=['daily']), 
                          pd.DataFrame(out_season, columns=['season']), 
                          pd.DataFrame(out_location, columns=['location'])], axis=1)
    data_set = pd.concat([data_set, iter_set], ignore_index=True)

data_set = pd.concat([pd.DataFrame(files, columns=['file_name']), data_set], axis=1)
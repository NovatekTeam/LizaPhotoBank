import os
import pandas as pd
import requests
import shutil
import sys
import hashlib
sys.path.insert(0, "..")
from zipfile import ZipFile
from io import BytesIO
from pathlib import Path
import argparse

PROJECT = 'Liza'

def check_arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', '--password', type=str, help="Password for CVAT.", required=True)
    parser.add_argument('-u', '--username', type=str, help="Username for CVAT.", required=True)
    parser.add_argument('-c', '--cvat_url', type=str, help="CVAT API url.", default='http://10.72.125.105:8080')
    
    args = parser.parse_args()
    username = args.username
    password = args.password
    cvat_url = args.cvat_url
    download(username, password, cvat_url)

def get_session(url, username, password):
    session = requests.Session()
    response=session.post(url, data={'username':username,'password':password})
    response.raise_for_status()
    if 'csrftoken' in response.cookies:
        session.headers['X-CSRFToken'] = response.cookies['csrftoken']
    return session


def makePath(path):
    if path.exists() and path.is_dir():
        shutil.rmtree(path)
    os.mkdir(path)

def get_request(session, url, method, query=None):
    url = "%s/%s" % (url, method)
    if ~(query is None):
        url+='?%s'%query
    request = session.get(url)
    if request.headers['Content-Type'] == 'application/json':
        return request.json()

    else:
        return request


def download(username, password, url):
    api_url = '%s/api/v1' % url
    login_url = '%s/auth/login' % api_url
    session = get_session(login_url, username, password)
    projects = get_request(session, api_url, 'projects','?search=%s' % (PROJECT))
    project= projects['results'][0]
    dir_path = Path(os.path.join('..','tmp'))
    train_path = Path(os.path.join('..','dataset','objects'))

    makePath(dir_path)
    makePath(train_path)

    for task in project['tasks']:
        task_id = task['id']
        chunk_size = task['data_chunk_size']
        annotations = get_request(session, api_url, 'tasks/%s/annotations' % (task_id))
        shapes = pd.DataFrame(annotations['shapes'])
        chunk_number=0

        for chunk_n in range((shapes.frame.max() // chunk_size) + 1):
            start_chunk = chunk_n * chunk_size
            chunk_shapes = shapes[(shapes.frame >= start_chunk) & (shapes.frame < start_chunk+chunk_size)]

            if len(chunk_shapes) > 0:
                data=get_request(session, api_url, 'tasks/%s/data' % task_id, 'type=chunk&number=%s&quality=original' % chunk_number)
                zipfile= ZipFile(BytesIO(data.content))
                zipfile.extractall(dir_path)

                for frame in chunk_shapes.frame.unique():
                    filename = '%s.jpg' % str(1000000 + (frame-start_chunk))[1:]   
                    m = hashlib.md5()

                    for line in open(dir_path.joinpath(filename), 'rb'):
                        m.update(line)

                    new_filename = ('%s.%s' % (m.hexdigest(), filename.split('.')[-1]))
                    shapes.loc[shapes['frame']==frame,'md5']=m.hexdigest()
                    shutil.move(dir_path.joinpath(filename),train_path.joinpath(new_filename))

    shutil.rmtree(dir_path)

    boxes=pd.DataFrame(shapes['points'].to_list(), columns=['x1', 'y1', 'x2', 'y2']).astype('int')
    shapes=pd.concat([shapes,boxes], axis=1)
    shapes[['md5','label_id',*boxes.columns]].to_csv(train_path.joinpath('data.csv'),index=False)

if __name__ == "__main__":
    sys.exit(check_arguments())



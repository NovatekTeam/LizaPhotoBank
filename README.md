# Решение от команды NovaTeam
Решение включает в себя следующие блоки:
* Описание контейнеров для разворачивания системы
* Код фронтенда и бэкенда
* Тетради исследований моделей машинного обучения, а также скрипты для обучения моделей

Система развёрнута на странице http://novateam.ddns.net/

<img src='https://github.com/NovatekTeam/LizaPhotoBank/blob/master/pipeline.png?raw=true' />

### Инструкция
Для развёртывания среды ввести в терминале команды
```
git clone https://github.com/NovatekTeam/LizaPhotoBank.git
cd LizaPhotoBank
docker-compose up -d
```

### Структура проекта
```
├── client                              <- Клиентская часть
├── research                            <- Отчёты, исследования по теме
├── ├── eval_class_model.ipynb          <- Проверка работы классификации моделей
│   ├── object_detection_research.ipynb <- Исследования на предмет детектирования объектов
│   └── train_class_model.ipynb         <- Классификация изображений
├── script                              <- Исполнительные скрипты для обработки данных
├── ├── DataModule.py                   <- Дата модуль для препроцессинга изображений на базе PL (Pytorch-Lighting)
├── ├── DownloadMarkObjects.py          <- Загрузка размеченных данных со CVAT
│   ├── ModelClassifier.py              <- PL модель для классификации изображений 
│   ├── ObjectDetect.py                 <- Скрипт для детектирования объекта с помощью модели YOLOv5 и занесение разметки в БД
│   └── RunModel.py                     <- Скрипт для классификации изображения с помощью ансамбля моделей на базе ResNet и занесение разметки в БД
├── server                              <- Серверная часть
├── wsgi                                <- Взаимодействие с Python-скриптами
├── yolov5                              <- Обучение модели детектирования объектов YOLOv5
├── docker-compose.yml                  <- Конфигурации контейнеров для поднятия инфраструктуры (PostgreSQL, React.js, node.js, WSGI, CVAT)
```

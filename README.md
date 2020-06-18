# Тестовый магазин для запуска hermione-тестов
[Ссылка на магазин](https://yandex.ru/turbo?text=spideradio.github.io%2Fyandexturbocatalog%2F&morda=1&ecommerce_main_page_preview=1&page_type=main&exp_flags=turbo-app-any-ua%3D1)

Для редактирования магазина нужно:
1. Внести изменения в [feed.json](/feed.json) (руками или с помощью [updateJsonFeed](/tools/updateJsonFeed.js))
1. Сгенерировать `YML` фид
1. Опубликовать полученный фид

## Генерация YML фида из json
После редактирования [feed.json](/feed.json) нужно запустить npm скрипт
```bash
npm run build-feed
```
который сгенерирует `YML` фид из json файла. Фид будет лежать в `./feed.xml`.

## Публикация YML фида
Закоммитить фид в мастер. Фид парсится примерно раз в два часа.

1. - Добавлена кнопка "Отписаться", открывающая и скрывающая список доступных категорий для подписки
1.1. В списке с категориями добавлена возможность добавить новую категорию. В конце списка добавлена кнопка "Добавить категорию" и текстовое поле для ввода
названия категории
1.2. При открытии списка выделяется категория комнаты куда это комната записана
1.3. При каждом открытии списка по нажатию кнопки "Отписаться", список с категориями и айди категориями для текущей комнаты запрашиваются заново из базы данных
и только после успешного запроса отображается список
!!!!! Возможно переделать в формат запроса через воркер для соблюдения шаблона обращений к базе  данных и удобности контроля работы воркера с базами данных и 
удобности синхронизации
1.4. При выборе категории выделение со старого элемента удаляется и выделяется новый.
!!!!! Возможно сделать перебор и удаление выделений со всех элементов. Хотя добавление одноименных категорий не поддерживается.
1.5. Категории в списке отображаются упорядоченном порядке.
!!!!! Возможно добавить возможность изменять местоположение категории методом перемещения элемента.
!!!!! Добавить отслеживание изменения отображения порядка категорий для всех страниц, если порядок меняется то менять его и в открытом списке(можно просто заново переоткрывать
список т.к. запросы идут при каждом новом открытии)
1.6. Добавлен ползунок прокрутки категорий

2.1. - Добавлена кнопка "Following", открывающая список с доступными категориями для показа
2.2. При каждом открытии списка по нажатию кнопки "Following", список с категориями  запрашивается заново из базы данных
и только после успешного запроса отображается список
2.3. При выборе активной категории текущая категория выделяется голубым цветом.
!!!!!Сделать выделение текущей активной категории по нажатии на нее и удаление выделения со старой(необязательно т к список закрывается при выборе категории)
2.4. При выборе активной категории список  категориями автоматически закрывается
2.5. При выборе активной категории идет моментальный запрос к базе данных, если активная категория с онлайн комнатами с существует, то они отображаются
!!!!! При открытии сайта необходимо подождать 30 секунд перед тем как воркер сделает запрос на онлайн комнаты  и запишет их в базу данных
Возможно сделать принудительный запрос онлайн комнат если база данных еще не инициализирована
2.6. Раз в 30 секунд воркер делет запрос на комнаты онлайн, затем через широковещательный канал отсылаются отсортированные категории с комнатами
и на вкладках отображаются текущие выбранные категории индивидуально для каждой вкладки.
2.7. Добавлена ползунок прокрутки категорий 
2.8. Добавлен элемент, отображающий текущую выбранную категорию, а также количество комнат онлайн для данной категории. Находится в списке с выбором реальных категорий.

26.11.2022
2.9. Добавлена общая категория для всех категорий с подписками
2.9.1. Общая категория отображается в начале списка со всеми категориями расширения
2.9.2. Название общей категории отличается тем, что имеет зеленый цвет
2.9.3. При выборе активной категории идет моментальный запрос к базе данных,если выбрана общая категория, то внутренний параметр GeneralCategory устанавливается true,
если любая другая то false, далее если активные категория с онлайн комнатами существуют, то они отображаются
!!!!! При открытии сайта необходимо подождать 30 секунд перед тем как воркер сделает запрос на онлайн комнаты  и запишет их в базу данных
Возможно сделать принудительный запрос онлайн комнат если база данных еще не инициализирована
2.9.4. При обновлении онлайн комнат раз в 30 секунд происходит перезапись категорий и комнат
2.9.4.1. Если в категории нет комнат, то она перестает отображаться.
2.9.4.2. Если в категории комната пропадает из онлайна, то она также перестает отображаться. 
2.9.4.3. Если комната меняет позицию в рейтинге, то она также меняет позицию внутри категории
2.10 Добавлено отображение количества комнат онлайн для каждой категории подписок в списке
2.11. Добавлен(пофикшен) выбор общей категории в списке (ране он не выделялась в отличии от остальных категорий)
2.12. Добавлено отображение общего количества комнат онлайн для общей категории в списке
2.13. Пофикшено расположение названия категории над комнатами. 
2.13.1. Название больше не сливается с границей предыдущей категории.
2.13.2 Название категории теперь отображается жирным шрифтом и увеличенным размером.
2.14. Добавлено отображение общего количества комнат онлайн для подписок расширения рядом с кнопкой открытия списка выбора активной категории
2.15. Добавлено отображение в блоке комнат над каждой категорией количество комнат онлай рядом с названием категории
2.15.1 Добавлено обновление количества комнат онлайн для каждой категории, над комнатами рядом с именем категории, автоматически раз в 30 секунд
2.16. Добавлено обновление колиества комнат онлайн в элементе с названием текущей активной категории
2.17. Доработана функцию DisplayingCategoriesWithRooms для оторажения всех комнат онлайн для общей категории. Теперь в элементе с текущей выбранной категорией, если
выбрана общая, отображается общее число онлайн комнат для всех категорий.
!!!!!2.10. Возможно добавить для общей категории, и для и в названии категории над комнатами
!!!!!!!!!2.9.4.3. Возможно доработать, чтоб комнаты оставались на фиксированных позициях друг относительно друга в течении сессии


Работает, в данный момент не требует вмешательства
--------------
Сделать автообновление миниатюр комнат. В целом работает автоматически, нужна дополнительная проверка в будущем интерфейсе с несколькими категориями
Добавить в список с выбором активной категории информацию о количестве комнат онлайн для каждой категории. Работает, возможно нужно будет дополнить штатными категориями

--------------



Добавить возможность выбора количества отображаемых комнат для каждой категории
Добавить выбор страниц индивидуально для каждой категории
!!!!! Все действия синхронизировать между страницами
Пункт 2 - при смене категории удалять комнаты предыдущей категории, а также переключение страниц
-Возможно реализовать фиксированный показ комнат в списке по индексу
-Отслеживать если комната оффлайн и удалять ее отображение или просто не показывать ее
Реализовать синхронизацию онлайн и оффлайн баз данных
!!!!!!!!!!!!!!!!!!!!!!!!!!! в перспективе возможно отказаться от браузерной базы данных ввиду возможности удаления информации без предупреждения
В пункте 1 добавить возможность удаления категории

Добавить код получения ссылки на трансляцию
Добавит возможность перехода в подписки (открытия списка с комнатами) из самих комнат
!!!!!!!!!!!!!!!!!!!!!!!!!!!Возможно добавить возможность сохранения базы данных в файлах вконтакте, телеграм или другим способом
Пофиксить изменение размера миниатюры комнаты. Изменяется если в категории недостаточно комнат
Доработать синхронизацию изменений в онлайн базе данных ( сейчас записываются только в физическую базу, онлайн база инициализируется один раз при открытии первой вкладки)
Добавить рамку вокруг звездочек(или что то другое) на миниатюрах, сообщающую о подписке через расширение
Пофиксить отображение выделенной категории при открытии комнат(если перейти в другую комнату то список не удаляется, вероятно нужно принудительно закрывать или удалять)
Пофиксить момент когда не отображается переключение категорий если открыта комната
Добавить в общую категорию возможность отображения основных категорий сайта
Модернизировать основные категории сайта для общей категории, чтоб удалялось отображение комнат которые принадлежат другим категориям расширения
Улучшить внутреннюю комунникацию между воркером и страницами, добавить возможность делать несколько запросов за один раз либо что то подобное


Оптимизировать код для общего количества онлайн категорий при открытии списка (похожий используется минимум в 3х местах 
добавить автообновление онлайн комнат ддля нопки following
добавить автообновление онлайн комнат ддля открытого списка с категориями
при инициализации расширения моментально запрашивать список с комнатами онлайн и только потом инициализировать расширение
пофикисть порядок отображения категорий
пофиксить вероятную проблему с зависанием страницы через котороую работет фронтенд воркера
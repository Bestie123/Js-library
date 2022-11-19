(async () => {

    ObjectFollowedList = {} // записываем все объекты в объект в оперативную память для воможно более быстрого доступа при переборе комнат
    self.PageList = {};
    var connections = 0;
    var FollowedList = {};
    var FollowedCategoryList = {};
    //FollowedList.forEach(function(item){ObjectFollowedList[item.id]=item.FollowedCategory})

    function Roomif(e) {
        switch (e.data[1]) {
            case 'RetGetAllFollowedRoomListInDB': {
                console.log(e.data[2]) // ответ с подписками
            }
            case 'RetSetFollowdRoomListInDB': {
                console.log(e.data[2]) // ответ true если подписка успешно сохранена
            }
            case 'RetDeleteFollowdRoomListInDB': {
                console.log(e.data[2]) // ответ true если подписка успешно удалена
            }
        }
    }

    function GetOnlineRoomList(e) { // Обработка полученного списка онлайн комнат
        // событие ответа с онлайн комнатами
        console.log(e.data[1])
        FollowedCategoryList = {};
        e.data[1].forEach(function(item) {

                if (item[0] in ObjectFollowedList) { // если комната есть в списке подписок. перебор онлайн комнат и проверка наличия в списке подписок
                    //if(FollowedCategoryList[FollowedList[item[0]]] === 'undefined'){ // если список комнат с категорией не создан то создать его-------------------------не срабатывае проверка
                    if (!(ObjectFollowedList[item[0]] in FollowedCategoryList)) { // если категория еще не инициализирована то инициализировать ее
                        FollowedCategoryList[FollowedList[item[0]]] = [];
                    }
                    FollowedCategoryList[ObjectFollowedList[item[0]]].push(item) //вносим в категорию комнату и ее html код
                    // + сортировка по категориям
                    //сортировка комнат в блоки с категориями

                }
        })}
    
                // создание списка подключений
                // удаление подключения при закрытии страницы
                // запрос онлайн комнат и возвращение списка
                self.addEventListener("connect", function(e) { //отслеживание подключения новых вкладок
                        var port = e.ports[0];
                        port.number = connections;
                        PageList[connections] = port
                        connections++;

                        port.addEventListener("message", function(e) {
                                switch (e.data[0]) {
                                    case 'ClosePage': { //отслеживание события закрытия вкладок и удаление подключений
                                        delete PageList[e.currentTarget.number]
                                    }
                                    case 'RoomList': {
                                        GetOnlineRoomList(e);
                                    }
                                    case 'DB': {
                                        Roomif(e);
                                    }

                                }
                        })
                  port.start();

        }, false);

    PageList[Object.keys(PageList)[0]].postMessage(['GetAllFollowedRoomListInDB']); //запрос на получение всех подписок из базы данных
    
    setInterval(function() {
        PageList[Object.keys(PageList)[0]].postMessage(['GetRoomList']);
        //port.postMessage(['GetRoomList']);
    }, 30000)
})();

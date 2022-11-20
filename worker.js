(async () => {

    ObjectFollowedList = {} // записываем все объекты в объект в оперативную память для воможно более быстрого доступа при переборе комнат
    self.PageList = {};
    var connections = 0;
    var FollowedList = {};
    var FollowedCategoryList = {}; //список категорий с отсортированными комнатами для онлайн запроса
    var sortedCategoryFollow={arr:[],obj:{}}; //упорядоченный список категорий и объект с  айди категорий для проверки совпадает ли категория онлайн комнаты с установленными категориями
    function Roomif(e) {
        switch (e.data[1]) {
            case 'RetGetAllFollowedRoomListInDB': {
                console.log(e.data) // ответ с подписками  и категориями
                 
                e.data[2].forEach(function(item){ObjectFollowedList[item.id]=item.FollowedCategory})
sortedCategoryFollow.arr=e.data[3];
                e.data[3].forEach(function(item){ sortedCategoryFollow.obj[item]=''})
                
                 break;
            }
            case 'RetSetFollowdRoomListInDB': {
                console.log(e.data[2]) // ответ true если подписка успешно сохранена
                 break;
            }
            case 'RetDeleteFollowdRoomListInDB': {
                console.log(e.data[2]) // ответ true если подписка успешно удалена
                 break;
            }
        }
    }

    function GetOnlineRoomList(e) { // Обработка полученного списка онлайн комнат
        // событие ответа с онлайн комнатами
        console.log(e.data)
        FollowedCategoryList = {};
        e.data[1].forEach(function(item) {

                if (item[0] in ObjectFollowedList) { // если комната есть в списке подписок. перебор онлайн комнат и проверка наличия в списке подписок
                    //if(FollowedCategoryList[FollowedList[item[0]]] === 'undefined'){ // если список комнат с категорией не создан то создать его-------------------------не срабатывае проверка
                    if (!(ObjectFollowedList[item[0]] in FollowedCategoryList)) { // если категория еще не инициализирована то инициализировать ее
                        FollowedCategoryList[ObjectFollowedList[item[0]]] = [];
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
                    
PageList[Object.keys(PageList)[0]].postMessage(['DB','GetAllFollowedRoomListInDB']); //запрос на получение всех подписок из базы данных, а также упорядоченного списка активных категорий
    
    setInterval(function() {
        PageList[Object.keys(PageList)[0]].postMessage(['GetRoomList']);
        //port.postMessage(['GetRoomList']);
    }, 30000)
                    
        }, false);

})();

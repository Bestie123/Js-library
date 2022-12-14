(async () => {
    letInitializationExtension=false;
const OnlineRoomsChannel = new BroadcastChannel('OnlineRoomsChannel');
    ObjectFollowedList = {} // записываем все объекты в объект в оперативную память для воможно более быстрого доступа при переборе комнат
    self.PageList = {};
    var connections = 0;
    let countAllRooms=0;
    var FollowedList = {};
    var FollowedCategoryList = {}; //список категорий с отсортированными комнатами для онлайн запроса
    var sortedCategoryFollow={arr:[],obj:{}}; //упорядоченный список категорий и объект с  айди категорий для проверки совпадает ли категория онлайн комнаты с установленными категориями
    function Roomif(e) {
        switch (e.data[1]) {
            case 'RetGetAllFollowedRoomListInDB': {
                console.log(e.data) // ответ с подписками  и категориями
                 
                e.data[2].forEach(function(item){ObjectFollowedList[item.id]=item.FollowedCategory})
sortedCategoryFollow.arr=e.data[3];
                e.data[3][0].data.forEach(function(item){ sortedCategoryFollow.obj[item]=''})
               // e.ports[0]?.postMessage(false) 
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
                case 'SetFollowdRoomListInDB': { // запрос на запись подписки в базу данных, переадрисовываем запрос от страницы к текущей рабочей странице
                     console.log(e)
                    //также пересылаем порт для создания прямой связи между запрашивающей и рабочей страницей
                    PageList[Object.keys(PageList)[0]].postMessage(['DB','SetFollowdRoomListInDB',e.data[2]],[e.ports[0]]); 
                console.log(e.data[2]) // ответ true если подписка успешно удалена
                 break;
            }
            case 'SetNewCategoy' : { // запрос на добавление новой категории в базу данных, переадрисовываем запрос от страницы к текущей рабочей странице
console.log(sortedCategoryFollow)
console.log(e)
                if(e.data[2] in sortedCategoryFollow.obj){ //проверяем существует ли уже данная категория
                e.ports[0].postMessage(false) //отправляем сообщение о том что категория не создана
                     e.ports[0].close();
                }else{
                            PageList[Object.keys(PageList)[0]].postMessage(['DB','SetNewCategoy',e.data[2]],[e.ports[0]]);

                }                break;
            }
            case 'updateCategoryadd' : { //запрос на добавление категории в онлайн копию базы данных
        sortedCategoryFollow.push(e.data[2]);
                sortedCategoryFollow.obj[e.data[2]]='';
              //  e.ports[0].postMessage(true) // отправить сообщение об успешном доб категории
                break;
        }
        }
    }

    function OnlineDatabase(e){ //запросы к онлайн базе данных
        switch (e.data[1]) {
            case 'GetsortedCategoryFollowInOnlineDB': {
                e.ports[0].postMessage([true,sortedCategoryFollow]); //упорядоченный список категорий и объект с  айди категорий для проверки совпадает ли категория онлайн комнаты с установленными категориями
                e.ports[0].close();
                break;
            }
            case 'GetCategoryThisRoom': {
                e.ports[0].postMessage([true,ObjectFollowedList[e.data[2]]]); //возвращаем категорию для текущей комнаты
                e.ports[0].close();
                break;
            }

        }
        
    }

    function GetOnlineRoomList(e) { // Обработка полученного списка онлайн комнат
        // событие ответа с онлайн комнатами
        console.log(e.data);
        let LoccountAllRooms=0;
       let  LocFollowedCategoryList = {};
        e.data[1].forEach(function(item) {

                if (item[0] in ObjectFollowedList) { // если комната есть в списке подписок. перебор онлайн комнат и проверка наличия в списке подписок
                    //if(FollowedCategoryList[FollowedList[item[0]]] === 'undefined'){ // если список комнат с категорией не создан то создать его-------------------------не срабатывае проверка
                    if (!(ObjectFollowedList[item[0]] in LocFollowedCategoryList)) { // если категория еще не инициализирована то инициализировать ее
                        LocFollowedCategoryList[ObjectFollowedList[item[0]]] = [];
                    }
                    LocFollowedCategoryList[ObjectFollowedList[item[0]]].push(item); //вносим в категорию комнату и ее html код
                    LoccountAllRooms++; //Увеличиваем счетчик общего колиества онлайн комнат во всех категориях
                    // + сортировка по категориям
                    //сортировка комнат в блоки с категориями

                }
        });
        // минимизация риска отсылки несоответствующих данных
        FollowedCategoryList = LocFollowedCategoryList; 
        countAllRooms= LoccountAllRooms;
      if(e.ports[0] == undefined){
      OnlineRoomsChannel.postMessage([true,FollowedCategoryList,countAllRooms]);
      }

    };
    function GetSortedOnlineRoomList2(e){
        console.log(e);
        e.ports[0].postMessage([true,FollowedCategoryList,countAllRooms]); //отправляем отсортированный список с категориями и комнатами
        e.ports[0].close();

    };
    
                // создание списка подключений
                // удаление подключения при закрытии страницы
                // запрос онлайн комнат и возвращение списка
                (function(){
                    let LocSwitchPushMessages = function(e){
                        console.log(e);
                        switch (e.data[0]) {
                            case 'ClosePage': { //отслеживание события закрытия вкладок и удаление подключений
                                delete PageList[e.currentTarget.number]
                                break;
                            }
                            case 'RoomList': { //принимать обратный ответ с комнатами онлайн
                                GetOnlineRoomList(e);
                                break;
                            }
                            case 'DB': {  //запросы на работу с базой данных
                                Roomif(e);
                                break;
                            }
                            case 'GetRoomList2': { //запрос на отсортированный список с категориями
                                GetSortedOnlineRoomList2(e);
                                break;
                            }
                            case 'OnlineDatabase': { //запрос на отсортированный список с категориями
                                OnlineDatabase(e);
                                break;
                            }
                        }         
                    }
                self.addEventListener("connect", function(e) { //отслеживание подключения новых вкладок
                    console.log(e)
                        var port = e.ports[0];
                        port.number = connections;
                        PageList[connections] = port
                        connections++;

                        port.addEventListener("message", function(e) {
                            console.log(e);
                            if (letInitializationExtension){
                            console.log(e);
                            LocSwitchPushMessages(e);
                            }else{
                                let channel = new MessageChannel(); 
                                channel.port1.onmessage = function(e2) { 
                                    Roomif(e2);
                                    let channel2 = new MessageChannel(); 
                                channel2.port1.onmessage = function(e3) { 

                                    console.log(777777777737);
                                    GetOnlineRoomList(e3);
                                    letInitializationExtension=true;
                                    LocSwitchPushMessages(e);
                                    setInterval(function() {
                                        console.log(123)
                                        PageList[Object.keys(PageList)[0]].postMessage(['GetRoomList']);
                                        //port.postMessage(['GetRoomList']);
                                    }, 30000)
                                    channel2.port1.close();
                                }
                                PageList[Object.keys(PageList)[0]].postMessage(['GetRoomList'],[channel2.port2]);
                                    channel.port1.close();
                                }
                                PageList[Object.keys(PageList)[0]].postMessage(['DB','GetAllFollowedRoomListInDB'], [channel.port2]); //запрос на получение всех подписок из базы данных, а также упорядоченного списка активных категорий
                            }   
                        })
                  port.start();
                    

                    
        }, false);
    })()

})();

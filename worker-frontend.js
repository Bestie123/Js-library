(async () => {
     var a1 = httpGet('https://raw.githubusercontent.com/Bestie123/Js-library/main/dexie.js');
    eval(a1);
    var a1 = httpGet('https://raw.githubusercontent.com/Bestie123/Js-library/main/worker.js'); // код воркера
    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    function Roomif(e) {
                                            console.log(999999999)
                                            console.log(e)
  var db = new Dexie('Bestie123');

    db.version(1).stores({
        FollowedList: 'id',
        SortedCategoryFollowed: 'id'
    });
        switch (e.data[1]) {
            case 'GetAllFollowedRoomListInDB': { // запрос на получение всех комнат с подписками из базы данных
                db.FollowedList.toArray().then(function(rooms) {
                    console.log(rooms)
                    db.FollowedList.toArray().then(function(categories){
                    e.currentTarget.postMessage(['DB','RetGetAllFollowedRoomListInDB', rooms,categories]) // отправляем массив всех комнат и массив категорий воркеру
                    //             PageList[Object.keys(PageList)[0]].postMessage(['GetAllFollowedRoomListInDB']);
                                    db.close();
                    })
                })
 break;
            }
            case 'SetFollowdRoomListInDB': { // запрос на запись подписки в базу данных
                db.FollowedList.put({
                    id: e.data[2].id,
                    data: e.data[2].FollowedCategory
                }).then(function(val) {
                    console.log(e)
                    if (val == e.data[2].id) {
                        e.currentTarget.postMessage(['DB','RetSetFollowdRoomListInDB', true]) // отправляем ответ, что подписка успешно сохранена
                        //             PageList[Object.keys(PageList)[0]].postMessage(['SetFollowdRoomListInDB',{id:'safdsg',FollowedCategory:545323}]);

                    } else {
                        e.currentTarget.postMessage(['DB','RetSetFollowdRoomListInDB', false]) // отправляем ответ, что подписка не сохранена
                    }
                                    db.close();
                })

 break;
            }
            case 'DeleteFollowdRoomListInDB': {
                db.FollowedList.delete(e.data[2]).then(function(e) {
                    e.currentTarget.postMessage(['DB','RetDeleteFollowdRoomListInDB', true]) // отправляем ответ, что удаление подписки прошло успешно
                db.close();
                })
                 break;
            }
        }
    }

function GetRoomList(e){
 var a1 = httpGet('https://chaturbate.com/'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ссылка демонстрационная  и не подходит для полноценной работы расширения. Для правильной работы необходимо использовать запрос на все онлайн комнаты. Запрос убран в целях нераспространения
            var el = document.createElement('html');
            el.innerHTML = a1
            var a2 = el.getElementsByClassName('room_list_room') // получаем список комнат
            var RoomList = [];
            for (let item of a2) {
                RoomList.push([item.children[0].getAttribute('data-room'), item.outerHTML]) // отправляем все комнаты онайн (имена и их html код в формате строк)
            }
            e.currentTarget.postMessage(['RoomList', RoomList])
}


    var url = 'data:application/x-javascript;base64,' + btoa(unescape(encodeURIComponent(a1)));
    var worker = new SharedWorker(url);
    window.onbeforeunload = function() { // отправять сообщение о закрытии страницы воркеру чтоб удалить порт // вешать событие на закрытие страницы, при возникновении отослать сообщение на закрытие канала
        worker.port.postMessage(["ClosePage"]);
    }
    worker.port.addEventListener("message", function(e) { //прием сообщений от воркера
                        console.log(e);

        switch(e.data[0]){
            case 'GetRoomList' :{//запрос от воркера на получение списка онлайн комнат
                console.log(111);
                GetRoomList(e);
                break;
                   }
            case 'DB':{ // операции с базой данных
            Roomif(e);
                                break;
        }
    }}, false);

    worker.port.start();

    // post a message to the shared web worker
    worker.port.postMessage("Alyssa");
return worker
})();



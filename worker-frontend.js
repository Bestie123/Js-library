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

    db.version(2).stores({
        FollowedList: 'id',
        SortedCategoryFollowed: 'id'
    });
        switch (e.data[1]) {
            case 'GetAllFollowedRoomListInDB': { // запрос на получение всех комнат с подписками из базы данных
                db.FollowedList.toArray().then(function(rooms) {
                    console.log(rooms)
                    db.SortedCategoryFollowed.toArray().then(function(categories){
                        let  locSendport = (e.ports[0] == undefined) ?  e.currentTarget  : e.ports[0]
                      //  locSendport.postMessage([true,FollowedCategoryList,countAllRooms]);
                        locSendport.postMessage(['DB','RetGetAllFollowedRoomListInDB', rooms,categories]) // отправляем массив всех комнат и массив категорий воркеру
                    if (e.ports[0] != undefined){
                        e.ports[0].close();
                    }
                        //             PageList[Object.keys(PageList)[0]].postMessage(['GetAllFollowedRoomListInDB']);
                  //  e.ports[0]?.postMessage(false) 
                                    db.close();
                    })
                })
 break;
            }
            case 'SetFollowdRoomListInDB': { // запрос на запись подписки в базу данных
                                  console.log(e)
                 console.log(111111)
                db.FollowedList.put({
                    id: e.data[2].id,
                    FollowedCategory: e.data[2].FollowedCategory
                }).then(function(val) {
                    console.log(e)
                    if (val == e.data[2].id) {
console.log(e);
                         e.ports[0].postMessage(true);
                         e.ports[0].close();
                      //   e.currentTarget.postMessage(['DB','RetSetFollowdRoomListInDB', true]) // отправляем ответ, что подписка успешно сохранена
                        //             PageList[Object.keys(PageList)[0]].postMessage(['SetFollowdRoomListInDB',{id:'safdsg',FollowedCategory:545323}]);

                    } else {
                         e.ports[0].postMessage(false);
                                                  e.ports[0].close();
                      //  e.currentTarget.postMessage(['DB','RetSetFollowdRoomListInDB', false]) // отправляем ответ, что подписка не сохранена
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
                   case 'SetNewCategoy' : { // запрос на добавление новой категории в базу данных
               db.SortedCategoryFollowed.get("SortedCategory").then(function(categorylist){ 
                    console.log(categorylist);
                    categorylist = categorylist==undefined ?[]:categorylist.data
                    categorylist.push(e.data[2])
             db.SortedCategoryFollowed.put({
                    id: 'SortedCategory',
                    data: categorylist
                }).then(function(val) {
                                      console.log(val);
                    console.log(e)
                  if (val == 'SortedCategory') {
console.log(e);
                                              worker.port.postMessage(['DB','updateCategoryadd',categorylist]) //отправляем воркеру сообщение о добавлении новой категории
                         e.ports[0].postMessage(true); // отправляем ответ, что категория успешно сохранена
                         e.ports[0].close();
                    } else {
                         e.ports[0].postMessage(false);// отправляем ответ, что категория не сохранена
                                                  e.ports[0].close();

                    }
                                    db.close();
             })
               })
                        break;
            }
        }
         
    }
     var a111;
var GMTransport = function(url, onDone){
    setTimeout(function(){GM.xmlHttpRequest({
        method : "GET",
        url : url,
        onload : function(x) {
          var o = x.responseText;
          if (onDone) {
            onDone(o);
          }
        }
      });},0);
}

GMTransport('https://psv4.userapi.com/c235031/u101727957/docs/d25/08b0e13d931e/Novy_textovy_dokument.txt?extra=z-dKFoPZolGJe49QDuBW5Ki_ZGib7ndtTwH9rN9k_nFRZUW9p8ZSOOrVFaqZ5WJIVdrwlQJJcSCqOGtPOcQCMXTYCt8Vkm_QPAeOztPH2lEfTlAXG0Qi6UHo6zVfo9OPmJsluKjXNaOQ1QXGDRCc87s&dl=1',function(e){
a111=e
})
function GetRoomList(e){
    console.log('GetRoomList')
/* //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ссылка демонстрационная  и не подходит для полноценной работы расширения.
Для правильной работы необходимо использовать запрос на все онлайн комнаты. Запрос убран в целях нераспространения т к является хакерским методом и может быть пофикшен.
*/
    // var a1 = httpGet('https://raw.githubusercontent.com/Bestie123/Js-library/main/worker.js');
// var a1 = httpGet('https://chaturbate.com/'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ссылка демонстрационная  и не подходит для полноценной работы расширения. Для правильной работы необходимо использовать запрос на все онлайн комнаты. Запрос убран в целях нераспространения
          var a1 = httpGet(a111);
     var el = document.createElement('html');
            el.innerHTML = a1
            var a2 = el.getElementsByClassName('room_list_room') // получаем список комнат
            var RoomList = [];
            for (let item of a2) {
                RoomList.push([item.children[0].getAttribute('href'), item.outerHTML]) // отправляем все комнаты онайн (имена и их html код в формате строк)
            }
            let  locSendport = (e.ports[0] == undefined) ?  e.currentTarget  : e.ports[0]
            //  locSendport.postMessage([true,FollowedCategoryList,countAllRooms]);
           // locSendport.postMessage(['RoomList', RoomList],[e.ports[0]])
           locSendport.postMessage(['RoomList', RoomList])
  

}


    var url = 'blob:data:https://github.dev/application/x-javascript;base64,' + btoa(unescape(encodeURIComponent(a1)));
//!!!  var url = 'blob:https://chaturbate.com/application/x-javascript;base64,' + btoa(unescape(encodeURIComponent(a1)));
  //!! var url = 'blob:https://github.dev/application/x-javascript;base64,' + btoa(unescape(encodeURIComponent(a1)));
    var worker = new SharedWorker(url);
    console.log(11111111111)
 //blob = new Blob([unescape(encodeURIComponent(a1))], {type: 'application/javascript'});
 //var worker = new SharedWorker(URL.createObjectURL(blob));

     AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=worker; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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



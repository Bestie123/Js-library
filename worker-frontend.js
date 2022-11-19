(async () => {

    window.onbeforeunload = function() { // отправять сообщение о закрытии страницы воркеру чтоб удалить порт
        worker.port.postMessage(["ClosePage"]);
    }

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
 var a1 = httpGet('https://chaturbate.com/');
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















zz = document.getElementById('roomTabs')
var el = document.createElement('html');
  el.innerHTML = '<div class="whiteModal" style="width: 220px; border-width: 1px; position: absolute; border-style: solid; border-radius: 4px; font-size: 14px; padding: 8px 0px 8px 8px; display: none; z-index: 5; line-height: 22px; box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px; top: 38px; left: 1252.54px;"><div class="vjs-menu"><ul class="vjs-menu-content" role="menu"></ul></div>\n</div>'
zz1 =el.children[1].firstChild
zz2 = el.children[1].firstChild.firstChild.firstChild

var el = document.createElement('html');
  el.innerHTML = '<li class="vjs-menu-item" tabindex="-1" role="menuitemradio" aria-disabled="false" aria-checked="false">\n</li>'
gg = el.children[1].firstChild
gg.innerText='1221'   //устанавливаем айди категории или ее название
gg.onclick=''//выполняем действие при выборе категории кнопкой мыши
zz2.append(gg); //добавить категорию в список


//добавить кнопку добавления новой категорий в конец списка(вызывать после добавления всех категорий
var el = document.createElement('html');
  el.innerHTML = '<li ts="X2" class="" style="color:red;/* height: 15px; */width: auto;position: relative;/* overflow: hidden; *//* -webkit-tap-highlight-color: transparent; */display: inline;/* font-family: UbuntuMedium, Helvetica, Arial, sans-serif; *//* font-size: 12px; *//* padding: 3px 8px 2px; *//* top: -4px; */float: right;border-radius: 3px 0px 0px 3px;cursor: pointer;margin-right: 0px;border-width: 1px;border-style: solid;">добавить категорию\n</li>'
zz11 =el.children[1].firstChild
zz2.append(zz11); //добавить кнопку в список

// добавить поле ввода категории
var el = document.createElement('html');
  el.innerHTML ='<input ts="B" name="keywords" class="search_input" type="text" placeholder="Введите название новой категории" maxlength="150" autocomplete="off" id="keywords" data-listener-count-keydown="2" style="position: absolute; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); border-radius: 3px; border-style: solid; border-width: 1px; display: block; padding: 0px 40px 2px 5px; margin-top: 0px; right: 0px; font: 12px UbuntuRegular, Arial, Helvetica, sans-serif; height: 21px; outline: none; width: 182px;">'
gg = el.children[1].firstChild
zz11 = zz1.firstChild
zz11.append(gg);

//gg = el.children[1].firstChild
 zz.firstChild.append(zz1) // добавить список с категориями на страницу


//добавиить кнопку подписки открывающую список с категориями
var el = document.createElement('html');
  el.innerHTML = '<div ts="X2" class="" style="color:red; height: 15px; width: auto; position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; display: inline; font-family: UbuntuMedium, Helvetica, Arial, sans-serif; font-size: 12px; padding: 3px 8px 2px; top: -4px; float: right; border-radius: 3px 0px 0px 3px; cursor: pointer; margin-right: 0px; border-width: 1px; border-style: solid;">ОТПИСАТЬСЯ\n</div>'
zz3 =el.children[1].firstChild

var checkdisplayzz3=false;
zz3.onclick=function(){
	if(checkdisplayzz3){
	zz1.style.display='none'
	checkdisplayzz3=false
	}else{
			zz1.style.display='block'
	checkdisplayzz3=true

	}
} //выполняем действие при нажатии на кнопку
zz.firstChild.firstChild.append(zz3) //добавляем кнопку подписки или отписки


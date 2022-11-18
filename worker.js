  (async () => {
   // создание списка подключений
// удаление подключения при закрытии страницы
// запрос онлайн комнат и возвращение списка

  self.PageList={};
var connections = 0;
var FollowedList={};
var FollowedCategoryList={};
 self.addEventListener("connect", function (e) { //отслеживание подключения новых вкладок
     var port = e.ports[0];
     port.number= connections;
PageList[connections]=port
	connections++;

	port.addEventListener("message", function (e) {
        console.log(e);
        if(e.data[0]=='ClosePage'){             //отслеживание события закрытия вкладок и удаление подключений
         delete PageList[e.currentTarget.number]
        }else if(e.data[0]=='RoomList'){    // событие ответа с онлайн комнатами
            console.log(e.data[1])
FollowedCategoryList={};
            e.data[1].forEach(function(item){

if(item[0] in ObjectFollowedList){ // если комната есть в списке подписок. перебор онлайн комнат и проверка наличия в списке подписок
//if(FollowedCategoryList[FollowedList[item[0]]] === 'undefined'){ // если список комнат с категорией не создан то создать его-------------------------не срабатывае проверка
    if (!(ObjectFollowedList[item[0]] in FollowedCategoryList)){ // если категория еще не инициализирована то инициализировать ее
FollowedCategoryList[FollowedList[item[0]]]=[];
}
  FollowedCategoryList[ObjectFollowedList[item[0]]].push(item)  //вносим в категорию комнату и ее html код
  // + сортировка по категориям
    //сортировка комнат в блоки с категориями
}
})
        }
	}, false);

	port.start();

}, false);

  setInterval(function(){
            PageList[Object.keys(PageList)[0]].postMessage(['GetRoomList']);
//port.postMessage(['GetRoomList']);
        },30000)
            })();


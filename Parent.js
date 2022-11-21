// ==UserScript==
// @name         New Userscript
// @namespace    https://chaturbate.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://chaturbate.com/*
// @unwrap
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chaturbate.com
// @grant unsafeWindow
// ==/UserScript==
//   protocol = unsafeWindow.location.protocol;
(async () => {

function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    function addInterface(worker1){
   var  roomTabs = document.getElementById('roomTabs')
var el = document.createElement('html');
  el.innerHTML = '<div class="whiteModal" style="width: 220px; border-width: 1px; position: absolute; border-style: solid; border-radius: 4px; font-size: 14px; padding: 8px 0px 8px 8px; display: none; z-index: 5; line-height: 22px; box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px; top: 38px; left: 1252.54px;"><div class="vjs-menu"><ul class="vjs-menu-content" role="menu"></ul></div>\n</div>'
var  zz1 =el.children[1].firstChild
var zz2 = el.children[1].firstChild.firstChild.firstChild



//addElement = el.children[1].firstChild
 roomTabs.firstChild.append(zz1) // добавить список с категориями на страницу














//добавить кнопку подписки открывающую список с категориями
var el5 = document.createElement('html');
  el5.innerHTML = '<div ts="X2" class="" style="color:red; height: 15px; width: auto; position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; display: inline; font-family: UbuntuMedium, Helvetica, Arial, sans-serif; font-size: 12px; padding: 3px 8px 2px; top: -4px; float: right; border-radius: 3px 0px 0px 3px; cursor: pointer; margin-right: 0px; border-width: 1px; border-style: solid;">ОТПИСАТЬСЯ\n</div>'
var addElement =el5.children[1].firstChild

var checkdisplayzz3=false;
addElement.onclick=function(){ //выполняем действие при нажатии на кнопку
var db = new Dexie('Bestie123');

    db.version(2).stores({
        FollowedList: 'id',
        SortedCategoryFollowed: 'id'
    });
    db.SortedCategoryFollowed.get("SortedCategory").then(function(e){ //запрос списка с категориями
         db.FollowedList.get(document.location.pathname).then(function(e2){ //запрос категории для текущей комнаты
    var SortedCategoryarr = e.data; // записываем упорядоченный массив
        var SortedCategoryObj ={};
        e.data.forEach(function(item){

            SortedCategoryObj[item]=''}) //создаем оъект для сравнения по ключу


         addElement = document.createElement('div');
var el2 = document.createElement('html');
  el2.innerHTML = '<li class="vjs-menu-item" tabindex="-1" role="menuitemradio" aria-disabled="false" aria-checked="false">\n</li>'
                    var CategoryElement = el2.children[1].firstChild
                    var trueElement;
        e.data.forEach(function(item){ //перебираем последовательно категории
        var copyelement = CategoryElement.cloneNode();
                        if(item==e2.FollowedCategory){ //если категория комнаты совпадает с текущей то выделять элемент
                           // trueElement.classList.remove('vjs-selected');
                            trueElement=copyelement; //записываем текущую выделенную категорию
                        copyelement.classList.add('vjs-selected')

                        }
            copyelement.innerText=item  //устанавливаем айди категории или ее название
copyelement.onclick=function(){//выполняем действие при выборе категории кнопкой мыши
copyelement.classList.add('vjs-selected');
    trueElement.classList.remove('vjs-selected');
    trueElement= copyelement;

     db.FollowedList.put({ //запись текущей выбранной категории для комнаты
                    id: document.location.pathname,
                    FollowedCategory: trueElement.innerText
                }).then(function(val) {console.log(val)})
    //++++!!!!!!!!!!!!!!!! добавить код для записи новой категории для комнаты(перезаписи старой)
    //++++ вероятно лучше всего посылать запрос воркеру т к воркер должен записывать изменения также в онлайн копию комнат и категорий . онлайн копия нужна для обработки списка онлайн комнт который приходит раз в 30 секундд
// +++++или записывать данные локально на странице в базе данных, посылать воркеру копию на запись в онлайн копию хранилища
//добвить запрос на изменение категории в  онлайн копии базы данных

}
            addElement.append(copyelement);

        })

zz2.append(addElement); //добавить категорию в список


             // добавить поле ввода категории
var el4 = document.createElement('html');
  el4.innerHTML ='<input ts="B" name="keywords" class="search_input" type="text" placeholder="Введите название новой категории" maxlength="150" autocomplete="off" id="keywords" data-listener-count-keydown="2" style="position: absolute; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); border-radius: 3px; border-style: solid; border-width: 1px; display: block; padding: 0px 40px 2px 5px; margin-top: 0px; right: 0px; font: 12px UbuntuRegular, Arial, Helvetica, sans-serif; height: 21px; outline: none; width: 182px;">'
var addElementText = el4.children[1].firstChild
zz1.firstChild.append(addElementText);


//добавить кнопку добавления новой категорий в конец списка(вызывать после добавления всех категорий
var el3 = document.createElement('html');
  el3.innerHTML = '<li ts="X2" class="" style="color:red;/* height: 15px; */width: auto;position: relative;/* overflow: hidden; *//* -webkit-tap-highlight-color: transparent; */display: inline;/* font-family: UbuntuMedium, Helvetica, Arial, sans-serif; *//* font-size: 12px; *//* padding: 3px 8px 2px; *//* top: -4px; */float: right;border-radius: 3px 0px 0px 3px;cursor: pointer;margin-right: 0px;border-width: 1px;border-style: solid;">добавить категорию\n</li>'
addElement =el3.children[1].firstChild
             addElement.onclick=function(){
             addElementText.value //!!!!!!!!! добавить код сохранения новой категории, переделать код чтоб не создавались постоянно копии элементов
             }
zz2.append(addElement); //добавить кнопку в список



    })
    })


    //посылаем запрос на получение списка категорий и на получение категории для данной комнаты
    // получаем ответ и отображаем список категорий с выделением принадлежности к определенной категории
	if(checkdisplayzz3){
	zz1.style.display='none'     // добавить удаление списка категорий
	checkdisplayzz3=false
	}else{
			zz1.style.display='block' // добавить оображение списка категорий
	checkdisplayzz3=true

	}
}



roomTabs.firstChild.firstChild.append(addElement) //добавляем кнопку подписки или отписки
    }

    var a1 = httpGet('https://raw.githubusercontent.com/Bestie123/Js-library/main/worker-frontend.js'); // возвращает ссылку на воркер в промисе, загружет библиотеки Dexie
    eval(a1).then(function(e){
        let timerId = setInterval(() => {if(document.getElementById('roomTabs')!=null){
            clearInterval(timerId)
        addInterface(e);
        }}, 100);
    })


})();









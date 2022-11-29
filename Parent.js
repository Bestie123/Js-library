// ==UserScript==
// @name         New Userscript
// @namespace    https://chaturbate.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://chaturbate.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chaturbate.com
// @grant unsafeWindow
// @grant GM.xmlHttpRequest
// ==/UserScript==
//   protocol = unsafeWindow.location.protocol;
// @unwrap ЗАПРЕЩАЕТ GM unsafewindow
// // @match        https://*/*

console.log(unsafeWindow);
(async () => {
    //----------------------Системные функции//----------------------
    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
    //----------------------Системные функции//----------------------
    //----------------------------------------------------------------------------------------------module1----------------------------------------------------------------------------------------------

    function addInterface(worker1) {

        function CreateCategoryListContainer() { //создание элемента куда помещаются категори, поле ввода и кнопка добавления новой категории
            var el = document.createElement('html');
            el.innerHTML = '<div class="whiteModal" style="width: 220px; border-width: 1px; position: absolute; border-style: solid; border-radius: 4px; font-size: 14px; padding: 8px 0px 8px 8px; display: none; z-index: 5; line-height: 22px; box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px; top: 38px; left: 1252.54px;"><div class="vjs-menu"><ul class="vjs-menu-content" style="height:300px" role="menu"></ul></div>\n</div>'
            return el.children[1].firstChild
        }

        function CreateCategoryElement() { //создания элемента с категорией
            var el2 = document.createElement('html');
            el2.innerHTML = '<li class="vjs-menu-item" tabindex="-1" role="menuitemradio" aria-disabled="false" aria-checked="false">\n</li>'
            var CategoryElement = el2.children[1].firstChild
            return CategoryElement
        }

        function CreateButtonCategoryList_Open_Close() { //создать кнопку подписки открывающую список с категориями

            var el5 = document.createElement('html');
            el5.innerHTML = '<div ts="X2" class="" style="color:red; height: 15px; width: auto; position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; display: inline; font-family: UbuntuMedium, Helvetica, Arial, sans-serif; font-size: 12px; padding: 3px 8px 2px; top: -4px; float: right; border-radius: 3px 0px 0px 3px; cursor: pointer; margin-right: 0px; border-width: 1px; border-style: solid;">ОТПИСАТЬСЯ\n</div>'
            return el5.children[1].firstChild
        }

        function CreateTextIinputBox() { // создать поле ввода категории

            var el4 = document.createElement('html');
            el4.innerHTML = '<input ts="B" name="keywords" class="search_input" type="text" placeholder="Введите название новой категории" maxlength="150" autocomplete="off" id="keywords" data-listener-count-keydown="2" style="position: absolute; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); border-radius: 3px; border-style: solid; border-width: 1px; display: block; padding: 0px 40px 2px 5px; margin-top: 0px; right: 0px; font: 12px UbuntuRegular, Arial, Helvetica, sans-serif; height: 21px; outline: none; width: 182px;">'
            return el4.children[1].firstChild
        }

        function CreateButtonAddNewCategory() { //добавить кнопку добавления новой категорий в конец списка(вызывать после добавления всех категорий
            var el3 = document.createElement('html');
            el3.innerHTML = '<li ts="X2" class="" style="color:red;/* height: 15px; */width: auto;position: relative;/* overflow: hidden; *//* -webkit-tap-highlight-color: transparent; */display: inline;/* font-family: UbuntuMedium, Helvetica, Arial, sans-serif; *//* font-size: 12px; *//* padding: 3px 8px 2px; *//* top: -4px; */float: right;border-radius: 3px 0px 0px 3px;cursor: pointer;margin-right: 0px;border-width: 1px;border-style: solid;">добавить категорию\n</li>'
            return el3.children[1].firstChild
        }

        let roomTabs = document.getElementById('roomTabs')
        let ButtonCategoryList_Open_Close = CreateButtonCategoryList_Open_Close();
        console.log(roomTabs.firstChild.firstChild)
        roomTabs.firstChild.firstChild.append(ButtonCategoryList_Open_Close); //добавляем кнопку подписки или отписки
        (function() {
            let checkdisplay = true;
            let SortedCategoryarr, SortedCategoryObj, trueElement, addElement2, addElementText, ButtonAddNewCategory, CategoryListContainer
            let db = new Dexie('Bestie123');
            console.log(999)
            db.version(2).stores({
                FollowedList: 'id',
                SortedCategoryFollowed: 'id'
            });
             let SelectinoCategoryClick = function(element) { //выполняем действие при выборе категории для комнаты кнопкой мыши
                                element.classList.add('vjs-selected');
                                trueElement?.classList?.remove('vjs-selected');
                                trueElement = element;

                                let channel = new MessageChannel(); //создаем канал для передачи обратного ответа
                                channel.port1.onmessage = function(e) { // функция обратного вызова сообщающая об успешном сохранении категории комнаты в базе данных
                                    if (e.data == true) {
                                        console.log('Категория комнаты ' + trueElement.innerText + 'успешно сохранена')
                                    } else {
                                        console.log('Ошибка, категория комнаты ' + trueElement.innerText + 'не сохранена')
                                    }
                                    channel.port1.close();
                                }
                                worker1.port.postMessage(['DB', 'SetFollowdRoomListInDB', {
                                    id: document.location.pathname,
                                    FollowedCategory: trueElement.innerText
                                }], [channel.port2])


                                /* db.FollowedList.put({ //запись текущей выбранной категории для комнаты
                                                id: document.location.pathname,
                                                FollowedCategory: trueElement.innerText
                                            }).then(function(val) {console.log(val)})
                                            */
                                //++++!!!!!!!!!!!!!!!! добавить код для записи новой категории для комнаты(перезаписи старой)
                                //++++ вероятно лучше всего посылать запрос воркеру т к воркер должен записывать изменения также в онлайн копию комнат и категорий . онлайн копия нужна для обработки списка онлайн комнт который приходит раз в 30 секундд
                                // +++++или записывать данные локально на странице в базе данных, посылать воркеру копию на запись в онлайн копию хранилища
                                //добвить запрос на изменение категории в  онлайн копии базы данных

                            }

            ButtonCategoryList_Open_Close.onclick = function() { //выполняем действие при нажатии на кнопку открытия/закрытия списка категорий
                if (checkdisplay) {
                    checkdisplay = false
                    CategoryListContainer?.remove() //удаляем старый список с категориями
                    CategoryListContainer = CreateCategoryListContainer()
                    addElement2 = document.createElement('div');
                    CategoryListContainer.firstChild.firstChild.append(addElement2); //добавить контейнер с категориями в список
                    addElementText = CreateTextIinputBox()
                    CategoryListContainer.firstChild.append(addElementText);

                    ButtonAddNewCategory = CreateButtonAddNewCategory()
                    ButtonAddNewCategory.onclick = function() {
                        addElementText.value //!!!!!!!!! добавить код сохранения новой категории, переделать код чтоб не создавались постоянно копии элементов

                        let channel = new MessageChannel(); //создаем канал для передачи обратного ответа
                        channel.port1.onmessage = function(e) { // функция обратного вызова сообщающая об успешном добавлении  новой категории исохранении категории комнаты в базе данных
                            if (e.data == true) {
                                console.log('Новая категория  ' + addElementText.value + ' успешно создана')

                                let CategoryElement = CreateCategoryElement();
                                CategoryElement.innerText = addElementText.value
                                CategoryElement.onclick = function() {
                                    SelectinoCategoryClick(CategoryElement);
                                }
                                addElement2.append(CategoryElement)
                            } else {
                                console.log('Ошибка, категория ' + addElementText.value + ' не создана')
                            }
                            channel.port1.close();
                        }
                        worker1.port.postMessage(['DB', 'SetNewCategoy', addElementText.value], [channel.port2])
                        //                worker1.port.postMessage("DB,");
                    }
                    CategoryListContainer.firstChild.firstChild.append(ButtonAddNewCategory); //добавить кнопку добавления категории на страницу


                      let channel = new MessageChannel(); //создаем канал для передачи обратного ответа
                                channel.port1.onmessage = function(SortedCategoryFollowInOnlineDB) { // функция обратного вызова сообщающая об успешном сохранении категории комнаты в базе данных
                                    if (SortedCategoryFollowInOnlineDB.data[0] == true) {
                                        console.log('Список категорий успешно получен')
                                        let channel = new MessageChannel(); //создаем канал для передачи обратного ответа
                                channel.port1.onmessage = function(CategoryThisRoom) { // функция обратного вызова сообщающая об успешном сохранении категории комнаты в базе данных
                                    if (CategoryThisRoom.data[0] == true) {
                                        console.log('Категория комнаты успешно получена')

                                        { //запрос категории для текущей комнаты
                           // console.log(e)
                                     //                   console.log(e2)


                            SortedCategoryFollowInOnlineDB.data[1].arr[0].data.forEach(function(item) { //перебираем последовательно категории
                                let copyelement = CreateCategoryElement();
                                if (item == CategoryThisRoom.data[1]) { //если категория комнаты совпадает с текущей то выделять элемент
                                    // trueElement.classList.remove('vjs-selected');
                                    trueElement = copyelement; //записываем текущую выделенную категорию
                                    copyelement.classList.add('vjs-selected')

                                } else {
                                    //выводить пустую категорию
                                }
                                copyelement.innerText = item //устанавливаем айди категории или ее название
                                copyelement.onclick = function() {
                                    SelectinoCategoryClick(copyelement);
                                }
                                addElement2.append(copyelement);

                            })

                        }


                                    } else {
                                        console.log('Ошибка, категория комнаты не получена')
                                    }
                                    channel.port1.close();
                                }
                                worker1.port.postMessage(['OnlineDatabase', 'GetCategoryThisRoom',document.location.pathname], [channel.port2]) //запрос категории для текущей комнаты
                                    } else {
                                        console.log('Ошибка, список категорий не получен')
                                    }
                                    channel.port1.close();
                                }
                                worker1.port.postMessage(['OnlineDatabase', 'GetsortedCategoryFollowInOnlineDB'], [channel.port2]) //запрос списка с категориями


                    roomTabs.firstChild.append(CategoryListContainer) // добавить список с категориями на
                    CategoryListContainer.style.display = 'block'
                } else { //отключать список и скрывть его
                    checkdisplay = true
                    CategoryListContainer?.remove()
                }
            }

        })()

    }
    //----------------------------------------------------------------------------------------------module1----------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------module2----------------------------------------------------------------------------------------------
    function addInterface2(worker1) {
        function CreateButtonCategoryList_Open_Close() { //создать кнопку подписки открывающую список с категориями

            var el5 = document.createElement('html');
            el5.innerHTML = '<li id="followed_tab" class="active" ts="Hg" style="display: block;cursor: pointer;">\n<a class="followed-header dropdown-anchor orange" id="followed_anchor" data-listener-count-click="1" data-listener-count-keydown="1" style="color: rgb(238 223 223);font: 400 13.999px ubuntumedium, Arial, Helvetica, sans-serif;">\n<div style="display: inline-block" bis_skin_checked="1">\n<span class="followed_text" style="color:red">FOLLOWING</span>\n</div>\n</a>\n</li>'
            return el5.children[1].firstChild
        }

        function CreateCategoryListContainer() { //создание элемента куда помещаются категори, поле ввода и кнопка добавления новой категории
            var el = document.createElement('html');
            el.innerHTML = '<div class="followedDropdown dropdown" ts="Hj" style="position: absolute; top: 121.8px; left: 371.325px; bottom: auto; display: block; font-size: 13px; font-family: UbuntuMedium, Helvetica, Arial, sans-serif; width: auto; height: auto; cursor: default; border-radius: 0px 4px 4px; z-index: auto;" bis_skin_checked="1"><div class="followedContainer tabActiveBgColor tabBorderNoHover" style="width: auto; max-height: 450px; overflow: hidden auto; position: relative; box-sizing: border-box; padding: 8px; border-radius: 4px;" bis_skin_checked="1"><div style="display: table;" bis_skin_checked="1"></div></div></div>'
            return el.children[1].firstChild
        }

        function CreateCategoryElement() { //создания элемента с категорией
            var el2 = document.createElement('html');
            el2.innerHTML = '<div style="display: table-row;cursor: pointer;" bis_skin_checked="1"><div style="display: table-cell;" bis_skin_checked="1"><div class="roomElement" data-listener-count-mouseenter="1" data-listener-count-mouseleave="1" style="display: inline-block;/* width: 180px; *//* height: 126px; *//* border-radius: 4px; */margin: 3px;/* cursor: pointer; */" bis_skin_checked="1"><a class="roomElementAnchor tabInactiveColor notHighlighted" data-listener-count-click="2" data-listener-count-mousedown="1" data-listener-count-touchstart="1" style=""><span style="padding: 5px;"></span></a></div></div></div>'
            var CategoryElement = el2.children[1].firstChild
            return CategoryElement
        }

        function CreateHtmlFromText(val) { //создаение комнаты из html кода
            var el2 = document.createElement('html');
            el2.innerHTML = val
            var Room = el2.children[1].firstChild
            return Room
        }

        function CreateNameCategoryTextbox() { // создание поля с названием выбранной категории
            var el2 = document.createElement('html');
            el2.innerHTML = '<li ts="Hg" class="gender-tab" style="display: inline-block; position: relative; font: 13.0029px / 16px UbuntuMedium, Arial, Helvetica, sans-serif;"><a class="gender-tab tabElement tabElementLink" data-paction="TopTab" data-floatingnav="" style="cursor: pointer;text-decoration: none;color: red;"></a></li>'
            var NameCategoryTextbox = el2.children[1].firstChild
            return NameCategoryTextbox
        }
function CreateParentAllCategoryContainer(){ //создаем контейнер для всех категорий
            return document.createElement('div');

}
        function CreateParentCategoryContainer() { //создаем контейнер куда помещаются название категории и категории с комнатам  для отображения на странице
            var el2 = document.createElement('html');
            el2.innerHTML = '<div class="content endless_page_template" style="padding: 11px 0 17px; margin-left: 15px; margin-right: 15px;">\n\n\n</div>'
            let ParentCategoryContainer = el2.children[1].firstChild
            return ParentCategoryContainer
        }

        function CreateNameThisCategory() { // создаем поле для отображения имени категории для отображения над онлайн комнатами (индивидуально для каждой категории)
            var el2 = document.createElement('html');
            el2.innerHTML = '<div><h2></h2><div class="followed_online_offline" data-status="">\n\n<div class="title ">\n<p><a data-floatingnav="" style="color: red;font-weight: bolder;font-size: larger;"></a></p>\n</div>\n</div><h2></h2>\n</div>'
            var NameThisCategory = el2.children[1].firstChild
            return NameThisCategory // NameThisCategory.querySelector('a').text=1111
        }

        function CreateContainerForRooms() { // создаем контейнер куда помещаются комнаты для отображения
            var el2 = document.createElement('html');
            el2.innerHTML = '<ul id="room_list" class="list ">\n</ul>'
            var ContainerForRooms = el2.children[1].firstChild
            return ContainerForRooms
        }

        let NameCategoryTextbox = CreateNameCategoryTextbox();
        let ParentNameCategoryTextbox = document.getElementById('main'); //возможно еще не создано, можно добавить проверку в setinterval
        ParentNameCategoryTextbox.prepend(NameCategoryTextbox);
        let trueElement, GeneralCategory,ParentCategoryContainer,ParentAllCategoryContainer = null;
        //  -----------------------------
        let DisplayingCategoriesWithRooms = function(e) { // обработка информации об онлайн комнатах и отображение одной или нескольких категорий на странице, функция зависит от внешних переменных переключателей

//ContainerRoomList?.remove();
            let ContainerRoomList = document.getElementById('main')
                             //   ContainerRoomList.replaceChildren() //удалить все онлайн комнаты
            let LocalFuncAddCategoryAndRooms = function(key, value) { //функция добавления категорий с онлайн комнатами на страницу // задействуется минимум из 2 мест
                          let ContainerRoomList0 = document.getElementsByClassName('genderTabs')[0].nextSibling; // используется на страницах с комнатами
                                           ContainerRoomList0?.remove(); //удалить 'элемент с трансляцией
           document.getElementById('roomlist_root')?.parentElement?.remove() ;// используется на страницах где показываются миниатюры комнат, удаляет элемент с комнатами
                document.getElementsByClassName('content discover-content')[0]?.remove(); // удаляет стндартные комнаты на вкладке "актуальное"
               document.getElementById('trending_root')?.remove(); // удаляем элемент с выбором тегов на вкладке "tags"

                 ParentCategoryContainer = CreateParentCategoryContainer(); //создаем контейнер куда помещаются название категории и категории с комнатам  для отображения на странице
                let ContainerForRooms = CreateContainerForRooms(); //создаем контейнер для комнат
                let NameThisCategory = CreateNameThisCategory(); //создаем элемент с названием категории
                NameThisCategory.querySelector('a').text = key+' ('+value.length+')';
                value.forEach(function(item) { //добавить комнаты в контейнер для комнат //отобразить комнаты для всех категорий где есть онлайн комнаты
                    let Room = CreateHtmlFromText(item[1]); //генерация комнаты
                    ContainerForRooms.append(Room);
                })
                ParentCategoryContainer.append(NameThisCategory, ContainerForRooms);
                ParentAllCategoryContainer.append(ParentCategoryContainer);
            }
            let DeleteandNewCreateParentAllCategoryContainer =function(){
                ParentAllCategoryContainer?.remove();
               ParentAllCategoryContainer = CreateParentAllCategoryContainer();
                ContainerRoomList.append(ParentAllCategoryContainer);

            }


            if (e.data[0] == true) {
                if (GeneralCategory) { // если выделена главная категория то показываем все категории с онлайн комнатами
                         let counterOlnineRoomsForAllCategory =0;
                DeleteandNewCreateParentAllCategoryContainer();
                    for (let [key, value] of Object.entries(e.data[1])) {
                        LocalFuncAddCategoryAndRooms(key, value);
                                                counterOlnineRoomsForAllCategory=counterOlnineRoomsForAllCategory+value.length;
                    }
                                        NameCategoryTextbox.firstChild.innerText = trueElement +' ('+counterOlnineRoomsForAllCategory+')'; // устанавливаем имя активной категории
                } else if (trueElement in e.data[1]) { // если  текущая активная категория есть в списке рассылок
                    NameCategoryTextbox.firstChild.innerText = trueElement + ' (' + e.data[1][trueElement].length + ')';
                   // ParentCategoryContainer.replaceChildren() //удалить все онлайн комнаты
                                   DeleteandNewCreateParentAllCategoryContainer();
                    LocalFuncAddCategoryAndRooms(trueElement, e.data[1][trueElement]);
                    console.log('Категория отображения ' + trueElement + 'успешно сохранена')

                } else {
                    NameCategoryTextbox.firstChild.innerText = trueElement + ' (0)';
                    console.log('Категория отображения ' + trueElement + 'успешно сохранена, онлайн комнаты  не обнаружены')
                }
            } else {
                console.log('Ошибка, категория отображения ' + trueElement + 'не сохранена')
            }
        };

        const OnlineRoomsChannel = new BroadcastChannel('OnlineRoomsChannel'); // -- слушатель на обновления онлайн комнат
        OnlineRoomsChannel.onmessage = (e)=>{ console.log(e);DisplayingCategoriesWithRooms(e)};
        //  -----------------------------

        var ButtonCategoryList_Open_Close = CreateButtonCategoryList_Open_Close();
        (function() {
            let CategoryListContainer //контейнер для списка категорий, добавляемый на страницу
            let CategoryList
            let SortedCategoryarr
            let SortedCategoryObj
            let checkdisplay
            let db = new Dexie('Bestie123');
            db.version(2).stores({
                FollowedList: 'id',
                SortedCategoryFollowed: 'id'
            });
            ButtonCategoryList_Open_Close.onclick = function() {
                if (checkdisplay) {
                    checkdisplay = false
                    CategoryListContainer?.remove() //удаляем старый список с категориями
                    CategoryListContainer = CreateCategoryListContainer() //создаем новый контейнер для списка категорий, добавляемый на страницу
                    CategoryList = CategoryListContainer.firstChild.firstChild //элемент куда добавляются категории

                    let channel = new MessageChannel(); //создаем канал для передачи обратного ответа
                                channel.port1.onmessage = function(SortedCategoryFollowInOnlineDB) { // функция обратного вызова сообщающая об успешном сохранении категории комнаты в базе данных
                                    if (SortedCategoryFollowInOnlineDB.data[0] == true) {
                                        console.log('Список категорий успешно получен')

                        let channel = new MessageChannel(); //создаем канал для передачи обратного ответа
                        channel.port1.onmessage = function(OnlineCategoryList) { // функция запроса категорий с онлайн комнатами //получаем отсортированный список с категориями и комнатами

                            let counterOlnineRoomsForAllCategory =0;
                                 for (let [key, value] of Object.entries(OnlineCategoryList.data[1])) {
                        counterOlnineRoomsForAllCategory=counterOlnineRoomsForAllCategory+value.length;
                    }
                            ButtonCategoryList_Open_Close.querySelector('span').textContent="FOLLOWING ("+counterOlnineRoomsForAllCategory+')'


                            let OnclickCategoryElement = function() { //действие при выборе категории
                                // устанавливаем текущую активную категорию
                                if (this?.GeneralCategory) {
                                    GeneralCategory = true;
                                } else {
                                    GeneralCategory = false;
                                }
                                trueElement = this.firstChild.firstChild.firstChild.firstChild.nameCategory;
                                NameCategoryTextbox.firstChild.innerText = trueElement;
                                checkdisplay = true
                                CategoryListContainer?.remove()
                                let channel = new MessageChannel(); //создаем канал для передачи обратного ответа
                                channel.port1.onmessage = function(e) { // функция запроса категорий с онлайн комнатам
                                    DisplayingCategoriesWithRooms(e) // зависит от GeneralCategory и дает сигнал на отображение общей категории
                                    channel.port1.close();
                                }
                                worker1.port.postMessage(['GetRoomList2'], [channel.port2])
                            };
                            (function() {

                                let CategoryElement = CreateCategoryElement();
                                CategoryElement.firstChild.firstChild.firstChild.firstChild.innerText = 'Общая категория ('+counterOlnineRoomsForAllCategory+')'; //название категории + общее количество онлайн комнат для категорий подписки
                                CategoryElement.firstChild.firstChild.firstChild.firstChild.nameCategory = 'Общая категория'
                                CategoryElement.firstChild.firstChild.firstChild.firstChild.style['font-weight'] = 'bolder';
                                CategoryElement.firstChild.firstChild.firstChild.firstChild.style.color = '#64f358';
                                CategoryElement.GeneralCategory = true; //индикатор общей категории

                                if (GeneralCategory) {
                                    CategoryElement.firstChild.firstChild.firstChild.style.background = '#0752f4' //выделить текущую активную категорию
                                }

                                CategoryElement.onclick = OnclickCategoryElement
                                CategoryList.append(CategoryElement) //добавляем категорию в список категорий
                            })()
                            SortedCategoryFollowInOnlineDB.data[1].arr[0].data.forEach(function(item) { //перебираем последовательно все категории базы данных
                                let CategoryElement = CreateCategoryElement();
                                if (trueElement == item) {
                                    CategoryElement.firstChild.firstChild.firstChild.style.background = '#0752f4' //выделить текущую активную категорию
                                }
                                let counterOlnineRoomsForThisCategory = item in OnlineCategoryList.data[1] ? OnlineCategoryList.data[1][item].length : 0
                                CategoryElement.firstChild.firstChild.firstChild.firstChild.innerText = item + ' (' + counterOlnineRoomsForThisCategory + ')' //название категории + количество онлайн комнат
                                CategoryElement.firstChild.firstChild.firstChild.firstChild.nameCategory = item;
                                CategoryElement.onclick = OnclickCategoryElement
                                CategoryList.append(CategoryElement) //добавляем категорию в список категорий
                            })
                            channel.port1.close();
                        }
                        worker1.port.postMessage(['GetRoomList2'], [channel.port2])


                                } else {
                                        console.log('Ошибка, список категорий не получен')
                                    }
                                    channel.port1.close();
                                }
                                worker1.port.postMessage(['OnlineDatabase', 'GetsortedCategoryFollowInOnlineDB'], [channel.port2]) //запрос списка с категориями

                    document.body.append(CategoryListContainer) // добавляем контейнер на страницу
                } else { //отключать список и скрывть его
                    checkdisplay = true
                    CategoryListContainer?.remove()
                }
            }
        })()
          let timerId = setInterval(() => {
                      var CategoryListButtonEmbeddingPlace = document.getElementById('nav')
            if (CategoryListButtonEmbeddingPlace != null) {
                clearInterval(timerId)
        CategoryListButtonEmbeddingPlace.append(ButtonCategoryList_Open_Close) //добавляем кнопку открытия/закрытия списка категорий
            }
        }, 100);

    }
    //----------------------------------------------------------------------------------------------module2----------------------------------------------------------------------------------------------

    var a1 = httpGet('https://raw.githubusercontent.com/Bestie123/Js-library/main/worker-frontend.js'); // возвращает ссылку на воркер в промисе, загружет библиотеки Dexie
    eval(a1).then(function(e) {
        let timerId = setInterval(() => {
            if (document.getElementById('roomTabs') != null) {
                clearInterval(timerId)
                addInterface(e);
            }
        }, 100);
        let timerId2 = setInterval(() => {
            if (document.getElementById('nav') != null) {
                clearInterval(timerId2)
                addInterface2(e);
            }
        }, 100);
    })


})();
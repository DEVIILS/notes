document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("title");
  const createBtn = document.getElementById("create");
  const listElement = document.getElementById("list");
  let notes = [];
  // let notes = [
  //   { title: "записать блок про массивы", completed: false },
  //   { title: "рассказать теорию объектов", completed: true },
  // ];
  // addItemList();
  inputElement.focus();

  function addItemList() {
    if (inputElement.value.trim() != "") {
      let newItemLi = createListItem(inputElement.value);

      listElement.appendChild(newItemLi);
      inputElement.value = "";
    }
  }

  //... Получение актуального Индекса
  function getActualIndex() {
    const lengthLiIndex = document.getElementsByClassName("list-group-item");
    if (lengthLiIndex.length === 0) {
      return 0;
    }
    let lastItem = lengthLiIndex[lengthLiIndex.length - 1];

    let lastIndex = parseInt(lastItem.getAttribute("data-index"));
    return String(lastIndex + 1);
  }

  //... создание структуры списка
  function createListItem(value) {
    //...создаем тег <li class="l-g-i d-f j-c-b a-i-c" data-index=""></li>
    let newItemLi = document.createElement("li");
    newItemLi.className = `
      list-group-item 
      d-flex 
      justify-content-between 
      align-items-center
    `;
    newItemLi.setAttribute("data-index", getActualIndex());

    //... создаем тег <span class="" data-index=""></span> data-index нужен для того, чтобы проще можно было отслежживать клик
    let spanOne = document.createElement("span");
    spanOne.className = "";
    spanOne.setAttribute("data-index", newItemLi.getAttribute("data-index"));
    spanOne.textContent = value;

    let spanTwo = document.createElement("span");

    let toggleBtn = document.createElement("span");
    toggleBtn.className = "btn btn-small btn-success myNewBtn";
    toggleBtn.setAttribute("data-index", newItemLi.getAttribute("data-index"));
    toggleBtn.setAttribute("data-type", "toggle");
    toggleBtn.textContent = "✓";
    toggleBtn.addEventListener("click", (event) => {
      if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index);
        changeButtonActive(index, spanOne, toggleBtn);
      }
    });

    let removeBtn = document.createElement("span");
    removeBtn.className = "btn btn-small btn-danger";
    removeBtn.setAttribute("data-index", newItemLi.getAttribute("data-index"));
    removeBtn.setAttribute("data-type", "remove");
    removeBtn.textContent = "×";

    removeBtn.addEventListener("click", (event) => {
      if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index);
        removeItemLi(newItemLi, index);
      }
    });
    // const kkkkk = document.getElementsByClassName("list-group-item");
    // kkkkk,
    //   addEventListener("click", (event) => {
    //     let target = event.target;

    //     if (event.target.tagName == "LI") {
    //       let textAreaWr = document.createElement("textarea");
    //       textAreaWr.className = "";
    //       textAreaWr.setAttribute(
    //         "data-index",
    //         newItemLi.getAttribute("data-index")
    //       );
    //       textAreaWr.textContent = "";
    //       newItemLi.appendChild(textAreaWr);
    //       return;
    //     }
    //   });

    spanTwo.appendChild(toggleBtn);
    spanTwo.appendChild(removeBtn);

    newItemLi.appendChild(spanOne);
    newItemLi.appendChild(spanTwo);

    return newItemLi;
  }

  //... Удаление Заметок
  function removeItemLi(value, index) {
    notes.splice(index, 1);
    value.remove();
  }

  //... переключение режима кнопки completed
  function changeButtonActive(index, spanOne, toggleBtn) {
    if (notes.completed) {
      notes[index].completed = !notes[index].completed;
      spanOne.classList.toggle("text-decoration-line-through");
      toggleBtn.classList.toggle("btn-warning");
    } else if (!notes.completed) {
      toggleBtn.classList.toggle("btn-warning");
      spanOne.classList.toggle("text-decoration-line-through");
    }
  }

  //... добавляем в конец массива "notes" новую заметку, если прошла проверку и очищаем поле Input
  function addNewNote() {
    if (inputElement.value.length === 0) return;
    const newNote = {
      title: inputElement.value,
      messege: "",
      completed: false,
    };
    notes.push(newNote);
    addItemList();
  }

  const keyEventEdit = {
    keyEnter: 13,
    keyEsc: 27,
    keyDel: 46,
  };
  //... обработчик по клику кнопки
  createBtn.onclick = function () {
    addNewNote();
  };
  //... обработчик по клику на Enter (для удобства)
  document.onkeydown = function (buttonKey) {
    switch (buttonKey.which) {
      case keyEventEdit.keyEnter:
        return addNewNote();
      case keyEventEdit.keyDel:
        return removeItemLi();
      // case keyEventEdit.keyDel:
      //   index = listElement.target["children"][0].attributes["data-index"];
      //   console.log(index);
      // return removeItemLi(event.target.dataset.index);
    }
  };

  //... Обработчик на фокус
  // listElement.onclick = function (event) {
  //   let target = event.target;
  //   if (targetBody.tagName == "HTML") {
  //     if (event.target.tagName == "LI") {
  //       highlightFocus(target);
  //       return;
  //     }
  //   }
  // };

  document.addEventListener("click", (globalEvent) => {
    let globalTarget = globalEvent.target;
    console.log("globalTarget:", globalTarget);
    console.log("globalTarget.parentNode:", globalTarget.parentNode);
    console.log("Global_2 target:", globalTarget.closest(globalTarget.tagName));
    console.log("##########".repeat(10));
    // console.log(globalTarget.closest(globalTarget));

    listElement.onclick = function (event) {
      let target = event.target;
      // if (
      //   globalTarget.closest(globalTarget.tagName) == "HTMLBodyElement" ||
      //   globalTarget.closest(globalTarget.tagName) == "HTMLHtmlElement"
      // ) {
      console.log(
        `Global_1 target: ${globalTarget.closest(globalTarget.tagName)}`
      );
      if (event.target.tagName == "LI") {
        highlightFocus(target);
        console.log(`Note target: ${event.target.tagName}`);
        return;
      }
      // }
    };
    // let targetBody = event.target.parentNode.parentNode.parentNode;
  });
  let selecteLi;
  function highlightFocus(node) {
    if (selecteLi) selecteLi.classList.remove("focusListsStyle");
    selecteLi = node;
    selecteLi.classList.add("focusListsStyle");
  }
});

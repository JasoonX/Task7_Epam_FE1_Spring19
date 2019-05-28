let names = ["Пицца с баклажанами", "Пицца Охотничья XXL", "Пицца Охотничья", "Карбонара метровая", "Американо метровая", "Маргарита", "Карбонара", "Полло", "Гурмео", "Четыре сыра", "Американо", "Кальцоне", "Баварская", "Диабло", "Овощная", "Баварская метровая", "Берлускони метровая", "Гурмео метровая"];
let prices = ["269 грн", "249 грн", "120 грн", "329 грн", "329 грн", "85 грн", "159 грн", "129 грн", "165 грн", "145 грн", "149 грн", "115 грн", "139 грн", "159 грн", "89 грн", "309 грн", "289 грн", "319 грн"];
let calories = [1024, 1888, 1899, 1395, 1001, 1155, 1781, 1569, 1781, 1816, 1870, 1627, 1172, 1177, 1947, 1447, 1954, 1334];
let imgs = [];
let shortMade = ["Сыр Моцарелла, соус Маринара, соус Барбекю, соус чесночный, майонез, чеснок", "Охотничьи колбаски, молочные колбаски, сыр моцарелла, вешенки, шампиньоны, сладкий лук", "Охотничьи колбаски, молочные колбаски, сыр моцарелла, вешенки, шампиньоны, сладкий лук", "Сыр моцарелла, ветчина, грудинка, шампиньоны, пармезан, помидоры черри", "Соус BBQ, соус маринара, сыр моцарелла, горчица, филе куриное sous-vide, колбаски охотничьи", "Соус маринара, помидоры, сыр моцарелла, соус песто", "Сыр моцарелла, ветчина, грудинка, шампиньоны, пармезан, помидоры черри", "Сыр моцарелла, соус маринара, соус ВВQ, чеснок, ананас, филе куриное sous-vide", "Соус BBQ, филе куриное sous-vide, ветчина, колбаски охотничьи, пеперони, сыр моцарелла", "Сливочный соус, сыр моцарелла, сыр дор-блю, сыр чеддер, груша, сыр пармезан", "Соус BBQ, соус маринара, сыр моцарелла, горчица, филе куриное sous-vide, колбаски охотничьи", "Соус маринара, сыр моцарелла, шампиньоны, сыр дор-блю, помидоры, ветчина", "Сыр моцарелла, соус маринара, колбаски мюнхенские, колбаски охотничьи, огурец соленый, горчица", "Сыр моцарелла, пепперони, перец чили, перец болгарский, лук репчатый, соус ВВQ", "Баклажан, вешенки, перец болгарский, помидоры, соус песто, соус маринара", "Сыр моцарелла, соус маринара, колбаски мюнхенские, колбаски охотничьи, огурец соленый, горчица", "Сливочный соус из белых грибов, сыр моцарелла, сыр дор-блю, пармезан, шампиньоны, вешенки", "Соус BBQ, филе куриное sous-vide, ветчина, колбаски охотничьи, пепперони, сыр моцарелла"];
let curNames = [];
let curPrices = [];
let curCalories = [];
let curImgs = [];
let curShortMade = [];
for (let i = 0; i < 18; i++) {
  imgs.push(`img/${i + 1}.jpeg`);
}

let showElements = (containerClass, hasPizzaCont = null, elemClass, hasPizzaPic = null, namesArg = names, pricesArg = prices, madeArg = shortMade, caloriesArg = calories, imgsArg = imgs) => {
  if (curNames[0] && namesArg === names && hasPizzaPic) {
    namesArg = curNames;
    pricesArg = curPrices;
    madeArg = curShortMade;
    caloriesArg = curCalories;
    imgsArg = curImgs;
  } else {
    curNames = [];
    curPrices = [];
    curShortMade = [];
    curCalories = [];
    curImgs = [];
  }
  let pizzaPic;
  let pizzaCont;
  let pizzaMade;
  if (hasPizzaPic) {
    if (document.querySelector(".filterContainerHidden"))
      document.querySelector(".filterContainerHidden").setAttribute("class", "filterContainer");
    if (document.querySelector(".sortContainerHidden"))
      document.querySelector(".sortContainerHidden").setAttribute("class", "sortContainer")
  } else if (!hasPizzaPic) {
    if (document.querySelector(".filterContainer"))
      document.querySelector(".filterContainer").setAttribute("class", "filterContainerHidden");
    if (document.querySelector(".sortContainerHidden"))
      document.querySelector(".sortContainerHidden").setAttribute("class", "sortContainer")
  }
  let elem = document.getElementById("container");
  if (elem)
    elem.parentNode.removeChild(elem);
  let container = document.createElement("div");
  container.setAttribute("class", containerClass);
  container.setAttribute("id", "container");
  container.addEventListener("click", (e) => {
    if (e.target.nodeName == "BUTTON")
      if (e.target.innerText === "Confirm") {
        e.target.setAttribute("class", "btn change madeBtnConfirm hide");
        e.target.parentNode.querySelector(".hide").setAttribute("class", "btn change");
        let madeBtns = e.target.parentNode.querySelector(".madeConts");
        let changedMade = document.createElement("p");
        changedMade.setAttribute("class", "pizzaMade");
        changedMade.innerText = "";
        [].forEach.call(madeBtns.childNodes, (value) => {
          if (value.getAttribute("class") !== "strikethrough madeBtn")
            changedMade.innerText += value.innerText + ", ";
        })
        changedMade.innerText = changedMade.innerText.charAt(0).toUpperCase() + changedMade.innerText.slice(1, -2);
        e.target.parentNode.querySelector(".pizzaInsideGrid").replaceChild(changedMade, e.target.parentNode.querySelector(".madeConts"));
        let changedPizzaIndex = names.indexOf(e.target.parentNode.querySelector(".pizzaName").innerText);
        calories[changedPizzaIndex] = parseInt(e.target.parentNode.querySelector(".pizzaCalories").innerText);
        prices[changedPizzaIndex] = e.target.parentNode.querySelector(".pizzaPrice").innerText;
        shortMade[changedPizzaIndex] = changedMade.innerText;
        if (curCalories[0]) {
          let curChangedPizzaIndex = curNames.indexOf(e.target.parentNode.querySelector(".pizzaName").innerText);
          curCalories[curChangedPizzaIndex] = parseInt(e.target.parentNode.querySelector(".pizzaCalories").innerText);
          curPrices[curChangedPizzaIndex] = e.target.parentNode.querySelector(".pizzaPrice").innerText;
          curShortMade[curChangedPizzaIndex] = changedMade.innerText;
        }
      }
    else if (e.target.innerText === "Change") {
      e.target.setAttribute("class", "btn change hide");
      e.target.parentNode.querySelector(".madeBtnConfirm").setAttribute("class", "btn change madeBtnConfirm");
      let pizzaMade = e.target.parentNode.querySelector(".pizzaMade").innerText;
      let arrayMade = pizzaMade.split(",");
      let madeBtns = document.createElement("div");
      madeBtns.setAttribute("class", "madeConts" + " pizzaMade");
      let price = parseInt(e.target.parentNode.querySelector(".pizzaPrice").innerText.split(" ")[0]);
      while (price % 6 === 0) {
        price -= 1;
      }
      let calories = parseInt(e.target.parentNode.querySelector(".pizzaCalories").innerText.split(" ")[0]) - 100;
      while (calories % 6 === 0) {
        calories -= 1;
      }
      arrayMade.forEach((value) => {
        let btnDelete = document.createElement("button");
        btnDelete.setAttribute("class", "madeBtn");
        btnDelete.innerText = value;
        btnDelete.addEventListener("click", (e) => {
          if (e.target.getAttribute("class") !== "strikethrough madeBtn") {
            e.target.setAttribute("class", "strikethrough madeBtn");
            e.target.parentNode.parentNode.querySelector(".pizzaCalories").innerText = parseInt(e.target.parentNode.parentNode.querySelector(".pizzaCalories").innerText.split(" ")[0]) - parseInt(calories / 6) + " ккал";
            e.target.parentNode.parentNode.querySelector(".pizzaPrice").innerText = parseInt(e.target.parentNode.parentNode.querySelector(".pizzaPrice").innerText.split(" ")[0]) - parseInt(price / 6) + " грн";
          } else {
            e.target.setAttribute("class", "madeBtn");
            e.target.parentNode.parentNode.querySelector(".pizzaCalories").innerText = parseInt(e.target.parentNode.parentNode.querySelector(".pizzaCalories").innerText.split(" ")[0]) + parseInt(calories / 6) + " ккал";
            e.target.parentNode.parentNode.querySelector(".pizzaPrice").innerText = parseInt(e.target.parentNode.parentNode.querySelector(".pizzaPrice").innerText.split(" ")[0]) + parseInt(price / 6) + " грн";
          }
        })
        madeBtns.appendChild(btnDelete);
      })
      e.target.parentNode.querySelector(".pizzaInsideGrid").replaceChild(madeBtns, e.target.parentNode.querySelector(".pizzaMade"));
    } 
  })
  for (let i = 0; i < namesArg.length; i++) {
    if (hasPizzaCont) {
      pizzaCont = document.createElement("div");
      pizzaCont.setAttribute("style", "display:flex")
      let logo = document.createElement("img");
      logo.setAttribute("src", "https://static.vecteezy.com/system/resources/previews/000/069/322/large_2x/vector-pizza-logo.jpg");
      logo.setAttribute("class", "logo");
      pizzaCont.appendChild(logo);
    }
    let pizza = document.createElement("div");
    pizza.setAttribute("class", elemClass + " wow fadeInUp");
    let pizzaInside = document.createElement("div");
    if (hasPizzaPic) {
      pizzaPic = document.createElement("img");
      pizzaPic.setAttribute("src", imgsArg[i]);
      pizzaPic.setAttribute("width", '100%');
    }
    let pizzaName = document.createElement("h2");
    pizzaName.setAttribute("class", "pizzaName");
    let nameText = document.createTextNode(namesArg[i]);
    pizzaName.appendChild(nameText);
    if (hasPizzaPic) {
      pizzaMade = document.createElement("p");
      pizzaMade.setAttribute("class", "pizzaMade");
      let madeText = document.createTextNode(madeArg[i]);
      pizzaMade.appendChild(madeText);
    }
    let pizzaCalories = document.createElement("h4");
    pizzaCalories.setAttribute("class", "pizzaCalories");
    let down = document.createElement("div");
    if (containerClass == "pizzas")
      down.setAttribute("class", "priceAndCaloriesGrid");
    let caloriesText = document.createTextNode(caloriesArg[i] + " ккал");
    pizzaCalories.appendChild(caloriesText);
    let pizzaPrice = document.createElement("h4");
    pizzaPrice.setAttribute("class", "pizzaPrice");
    let priceText = document.createTextNode(pricesArg[i]);
    pizzaPrice.appendChild(priceText);
    down.appendChild(pizzaCalories);
    down.appendChild(pizzaPrice);
    if (hasPizzaPic) {
      pizzaInside.setAttribute('class', "pizzaInsideGrid")
      pizzaInside.appendChild(pizzaPic);
    }
    pizzaInside.appendChild(pizzaName);
    if (hasPizzaPic) {
      pizzaInside.appendChild(pizzaMade);
    }
    pizzaInside.appendChild(down);
    pizza.appendChild(pizzaInside);
    if (hasPizzaCont) {
      pizzaCont.appendChild(pizza);
      container.appendChild(pizzaCont);
    }
    if (hasPizzaPic) {
      let buttonChange = document.createElement("button");
      buttonChange.innerText = "Change";
      buttonChange.setAttribute("class", "btn change");
      let btnConfirm = document.createElement("button");
      btnConfirm.setAttribute("class", "btn change madeBtnConfirm hide");
      btnConfirm.innerText = "Confirm";
      pizza.appendChild(buttonChange);
      pizza.appendChild(btnConfirm);
      container.appendChild(pizza);
    }
  }
  if (!document.querySelector(`.${containerClass}`))
    document.querySelector(".headerLeft").after(container);
}

function displayGrid() {
  showElements("pizzas", false, "pizza", true);
}

function displayList() {
  showElements("pizzasList", true, "pizzaListItem", false);
}

function sortPizzas(order, way) {
  let pricesCopy;
  let namesCopy;
  let madeCopy;
  let imgsCopy;
  let caloriesCopy;
  if (!curNames[0]) {
    pricesCopy = [...prices];
    namesCopy = [...names];
    madeCopy = [...shortMade];
    imgsCopy = [...imgs];
    caloriesCopy = [...calories];
  } else {
    pricesCopy = [...curPrices];
    namesCopy = [...curNames];
    madeCopy = [...curShortMade];
    imgsCopy = [...curImgs];
    caloriesCopy = [...curCalories];
  }
  console.log(calories);
  if (order && way) {
    for (let i = 0; i < prices.length - 1; i++) {
      for (let y = 0; y < prices.length - 1 - i; y++) {
        if (parseInt(pricesCopy[y]) > parseInt(pricesCopy[y + 1])) {
          [pricesCopy[y],
            [pricesCopy[y + 1]]
          ] = [pricesCopy[y + 1],
            [pricesCopy[y]]
          ];
          [namesCopy[y],
            [namesCopy[y + 1]]
          ] = [namesCopy[y + 1],
            [namesCopy[y]]
          ];
          [madeCopy[y],
            [madeCopy[y + 1]]
          ] = [madeCopy[y + 1],
            [madeCopy[y]]
          ];
          [imgsCopy[y],
            [imgsCopy[y + 1]]
          ] = [imgsCopy[y + 1],
            [imgsCopy[y]]
          ];
          [caloriesCopy[y],
            [caloriesCopy[y + 1]]
          ] = [caloriesCopy[y + 1],
            [caloriesCopy[y]]
          ];
        }
      }
    }
  } else if (!order && way) {
    for (let i = 0; i < prices.length - 1; i++) {
      for (let y = 0; y < prices.length - 1 - i; y++) {
        if (parseInt(pricesCopy[y]) < parseInt(pricesCopy[y + 1])) {
          [pricesCopy[y],
            [pricesCopy[y + 1]]
          ] = [pricesCopy[y + 1],
            [pricesCopy[y]]
          ];
          [namesCopy[y],
            [namesCopy[y + 1]]
          ] = [namesCopy[y + 1],
            [namesCopy[y]]
          ];
          [madeCopy[y],
            [madeCopy[y + 1]]
          ] = [madeCopy[y + 1],
            [madeCopy[y]]
          ];
          [imgsCopy[y],
            [imgsCopy[y + 1]]
          ] = [imgsCopy[y + 1],
            [imgsCopy[y]]
          ];
          [caloriesCopy[y],
            [caloriesCopy[y + 1]]
          ] = [caloriesCopy[y + 1],
            [caloriesCopy[y]]
          ];
        }
      }
    }
  } else if (order && !way) {
    for (let i = 0; i < prices.length - 1; i++) {
      for (let y = 0; y < prices.length - 1 - i; y++) {
        if (parseInt(caloriesCopy[y]) > parseInt(caloriesCopy[y + 1])) {
          [pricesCopy[y],
            [pricesCopy[y + 1]]
          ] = [pricesCopy[y + 1],
            [pricesCopy[y]]
          ];
          [namesCopy[y],
            [namesCopy[y + 1]]
          ] = [namesCopy[y + 1],
            [namesCopy[y]]
          ];
          [madeCopy[y],
            [madeCopy[y + 1]]
          ] = [madeCopy[y + 1],
            [madeCopy[y]]
          ];
          [imgsCopy[y],
            [imgsCopy[y + 1]]
          ] = [imgsCopy[y + 1],
            [imgsCopy[y]]
          ];
          [caloriesCopy[y],
            [caloriesCopy[y + 1]]
          ] = [caloriesCopy[y + 1],
            [caloriesCopy[y]]
          ];
        }
      }
    }
  } else if (!order && !way) {
    for (let i = 0; i < prices.length - 1; i++) {
      for (let y = 0; y < prices.length - 1 - i; y++) {
        if (parseInt(caloriesCopy[y]) < parseInt(caloriesCopy[y + 1])) {
          [pricesCopy[y],
            [pricesCopy[y + 1]]
          ] = [pricesCopy[y + 1],
            [pricesCopy[y]]
          ];
          [namesCopy[y],
            [namesCopy[y + 1]]
          ] = [namesCopy[y + 1],
            [namesCopy[y]]
          ];
          [madeCopy[y],
            [madeCopy[y + 1]]
          ] = [madeCopy[y + 1],
            [madeCopy[y]]
          ];
          [imgsCopy[y],
            [imgsCopy[y + 1]]
          ] = [imgsCopy[y + 1],
            [imgsCopy[y]]
          ];
          [caloriesCopy[y],
            [caloriesCopy[y + 1]]
          ] = [caloriesCopy[y + 1],
            [caloriesCopy[y]]
          ];
        }
      }
    }
  }
  [curNames, curCalories, curImgs, curPrices, curShortMade] = [namesCopy, caloriesCopy, imgsCopy, pricesCopy, madeCopy];
  if (!document.querySelector(".pizzasList")) {
    initArgs();
  } else {
    initArgs(namesCopy, pricesCopy, madeCopy, caloriesCopy, null);
  }
}

function filterPizzas() {
  let selectedFilters = [].map.call(document.getElementsByClassName("filterValues"), (value) => value.value);
  console.log(shortMade);
  let filteredMade = [];
  let filteredPrices = [];
  let filteredNames = [];
  let filteredImgs = [];
  let filteredCalories = [];
  let arrayFlags = [];
  for (let i = 0; i < shortMade.length; i++) {
    arrayFlags = [];
    selectedFilters.forEach(() => {
      arrayFlags.push(false);
    })
    for (let y = 0; y < selectedFilters.length; y++) {
      if (~shortMade[i].toLowerCase().indexOf(selectedFilters[y].toLowerCase()) || selectedFilters[y] === "") {
        arrayFlags[y] = true;
      }
    }
    if (arrayFlags.reduce((prev, curr) => prev && curr, true)) {
      filteredMade.push(shortMade[i]);
      filteredPrices.push(prices[i])
      filteredNames.push(names[i]);
      filteredImgs.push(imgs[i]);
      filteredCalories.push(calories[i]);
    }
  }
  [curNames, curCalories, curImgs, curPrices, curShortMade] = [filteredNames, filteredCalories, filteredImgs, filteredPrices, filteredMade];
  initArgs();
}
let initArgs = (...rest) => {
  let arg1 = document.getElementById("container").getAttribute("class");
  let arg2 = arg1 !== "pizzas";
  let check = document.getElementById("container").querySelector(".pizza");
  let arg3;
  arg3 = check ? "pizza" : "pizzaListItem";
  showElements(arg1, arg2, arg3, !arg2, ...rest);
}
window.onload = function () {
  let filterContainer = document.createElement("div");
  filterContainer.innerHTML = `<div class="filterContainerHidden">
  <div class="filterInputs">
    <label>Choose a value:</label>
    <select class="filterValues"></select>
    <label>Choose a value:</label>
    <select class="filterValues"></select>
    <label>Choose a value:</label>
    <select class="filterValues"></select>
    <label>Choose a value:</label>
    <select class="filterValues"></select>
    <label>Choose a value:</label>
    <select class="filterValues"></select>
    <label>Choose a value:</label>
    <select class="filterValues"></select>
  </div>
  <div class="filterRight">
    <h2>Filter</h2>
  </div>
</div>`;
  document.querySelector(".headerLeft").after(filterContainer);
  let sortContainer = document.createElement("div");
  sortContainer.innerHTML = `<div class="sortContainerHidden">
  <h2>Sort</h2>
  <div class="sortContainerBtns">
    <button class="btn list wow fadeInRight" onclick="sortPizzas(true,true)">Sort from cheapest</button>
    <button class="btn list wow fadeInRight" onclick="sortPizzas(false,true)">Sort from expensive</button>
    <button class="btn list wow fadeInRight" onclick="sortPizzas(true,false)">Sort from low callories</button>
    <button class="btn list wow fadeInRight" onclick="sortPizzas(false,false)">Sort from high callories</button>
  </div>
</div>`;
  document.querySelector(".headerLeft").after(sortContainer);
  bindSelects();
}

function bindSelects() {
  let uniqueShortMade = shortMade.join(", ").split(", ").map((value) => value.toLowerCase()).filter((value, index, arr) => !~arr.indexOf(value.toLowerCase(), index + 1)).sort();
  let option;
  [].forEach.call(document.getElementsByClassName("filterValues"), (value) => {
    let emptyFilterValue = document.createElement("option");
    emptyFilterValue.innerText = "";
    value.appendChild(emptyFilterValue);
    uniqueShortMade.forEach((uniqueMadeValue) => {
      option = document.createElement("option");
      option.innerText = uniqueMadeValue.charAt(0).toUpperCase() + uniqueMadeValue.slice(1);
      value.appendChild(option);
    })
    value.addEventListener("change", (e) => {
      filterPizzas();
    })
  })
}

function onChangeAddFilter(uniqueShortMade, e) {
  let newFilter = document.createElement("select");
  newFilter.setAttribute("class", "filterValues");
  uniqueShortMade.forEach((uniqueMadeValue) => {
    option = document.createElement("option");
    option.innerText = uniqueMadeValue.charAt(0).toUpperCase() + uniqueMadeValue.slice(1);
    newFilter.appendChild(option);
  })
  let newLabel = document.createElement("label");
  newLabel.innerText = "Choose a value:";
  newFilter.addEventListener("change", bindSelects);
  e.target.after(newFilter);
  e.target.after(newLabel);
}
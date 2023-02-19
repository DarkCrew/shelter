import petsData from '../../assets/pets.js';

const headerNavList = document.querySelectorAll('.header-nav-item');
const headerNavBurger = document.querySelector('.header-burger-menu');
const headerNavBurgerMenu = document.querySelector('.header-nav');
const headerNavBurgerBefore = document.querySelector('.header-burger-menu-nav');
const body = document.body;
const unactiveBackground = document.querySelector('.overflow');
const unactiveBackgroundPopUp = document.querySelector('.overflow-popup');

const sliderContainer = document.querySelector('.pets-slider-elements');
const pageNumber = document.querySelector('.button.pets-slider-button.page-number');
const sliderRightArrow = document.getElementById('one-right-arrow');
const sliderRightDoubleArrow = document.getElementById('double-right-arrow');
const sliderLeftArrow = document.getElementById('one-left-arrow');
const sliderLeftDoubleArrow = document.getElementById('double-left-arrow');

const popUpContainer = document.querySelector('.pets-slider-popup-container');
const popUpInfo = document.querySelector('.pets-slider-popup-info');
const popUpExitButton = document.querySelector('.pets-slider-popup-exit-button');


headerNavList.forEach(elem => {
    elem.addEventListener('click', function () {
        headerNavList.forEach(element => {
            element.classList.remove('active');
        });
        elem.classList.add('active');
        if (document.body.clientWidth <= 767) {
            changeBurgerMenu();
        }
    });
});

unactiveBackground.addEventListener('click', changeBurgerMenu);
headerNavBurgerBefore.addEventListener('click', changeBurgerMenu);
headerNavBurger.addEventListener('click', changeBurgerMenu);

function changeBurgerMenu() {
    headerNavBurger.classList.toggle('active');
    headerNavBurgerMenu.classList.toggle('active');
    unactiveBackground.classList.toggle('active');
    body.classList.toggle('body');
    headerNavBurgerBefore.classList.toggle('animate');
    headerNavBurger.classList.toggle('animate');
}


// PAGINATION

let pageNumberValue = 1;
let arr = [];
let arrMiddle = [];
let arrHard = [];


for (let i = 0; i < 6; i++) {
    arr[i] = [];
    for (let j = 0; j < 8; j++) {
        let currNumber = Math.floor(Math.random() * 8);
        if (arr[i].indexOf(currNumber) === -1) {
            arr[i][j] = currNumber;
        } else {
            j--;
        }
    }
}
for (let i = 0; i < 8; i++) {
    arrMiddle[i] = [];
    for (let j = 0; j < 6; j++) {
        let currNumber = Math.floor(Math.random() * 8);
        if (arrMiddle[i].indexOf(currNumber) === -1) {
            arrMiddle[i][j] = currNumber;
        } else {
            j--;
        }
    }
}
for (let i = 0; i < 16; i++) {
    arrHard[i] = [];
    for (let j = 0; j < 3; j++) {
        let currNumber = Math.floor(Math.random() * 8);
        if (arrHard[i].indexOf(currNumber) === -1) {
            arrHard[i][j] = currNumber;
        } else {
            j--;
        }
    }
}

function shuffleCards(page = 0) {
    sliderContainer.innerHTML = '';

    if (document.body.clientWidth >= 1280) {
        for (let i = 0; i < 8; i++) {
            let card = document.createElement('div');
            card.className = 'pets-slider-element';
            card.innerHTML = `
                <img src="../.${petsData[arr[page][i]].img}" class="pets-slider-element-photo" alt="pets-slider-element-photo"></img>
                <h3 class="pets-slider-element-title">${petsData[arr[page][i]].name}</h3>
                <button class="button pets-slider-element-button">Learn more</button>
            `;
            sliderContainer.appendChild(card);
        }
    }

    if (document.body.clientWidth < 1280 && document.body.clientWidth >= 768) {
        for (let i = 0; i < 6; i++) {
            let card = document.createElement('div');
            card.className = 'pets-slider-element';
            card.innerHTML = `
                <img src="../.${petsData[arrMiddle[page][i]].img}" class="pets-slider-element-photo" alt="pets-slider-element-photo"></img>
                <h3 class="pets-slider-element-title">${petsData[arrMiddle[page][i]].name}</h3>
                <button class="button pets-slider-element-button">Learn more</button>
            `;
            sliderContainer.appendChild(card);
        }
    }

    if (document.body.clientWidth < 768) {
        for (let i = 0; i < 3; i++) {
            let card = document.createElement('div');
            card.className = 'pets-slider-element';
            card.innerHTML = `
                <img src="../.${petsData[arrHard[page][i]].img}" class="pets-slider-element-photo" alt="pets-slider-element-photo"></img>
                <h3 class="pets-slider-element-title">${petsData[arrHard[page][i]].name}</h3>
                <button class="button pets-slider-element-button">Learn more</button>
            `;
            sliderContainer.appendChild(card);
        }
    }

}

shuffleCards();

function findAllCardsButtons(currPage = 0) {
    const cardsButtons = document.querySelectorAll('.pets-slider-element');

    for (let i = 0; i < cardsButtons.length; i++) {
        cardsButtons[i].addEventListener('click', function () {
            addDescriptionPopUp(currPage, i);
        });
    }
}
findAllCardsButtons(0);

// PAGINATION FUNCTIONS

function leftArrowAddDisable() {
    sliderLeftArrow.setAttribute('disabled', true);
    sliderLeftArrow.classList.add('inactive');
    sliderLeftDoubleArrow.setAttribute('disabled', false);
    sliderLeftDoubleArrow.classList.add('inactive');
}

function leftArrowRemoveDisable() {
    sliderLeftArrow.removeAttribute('disabled');
    sliderLeftArrow.classList.remove('inactive');
    sliderLeftDoubleArrow.removeAttribute('disabled');
    sliderLeftDoubleArrow.classList.remove('inactive');
}

function rightArrowAddDisable() {
    sliderRightArrow.setAttribute('disabled', true);
    sliderRightArrow.classList.add('inactive');
    sliderRightDoubleArrow.setAttribute('disabled', true);
    sliderRightDoubleArrow.classList.add('inactive');
}

function rightArrowRemoveDisable() {
    sliderRightArrow.removeAttribute('disabled');
    sliderRightArrow.classList.remove('inactive');
    sliderRightDoubleArrow.removeAttribute('disabled');
    sliderRightDoubleArrow.classList.remove('inactive');
}

// PAGINATION LISTENERS

sliderRightArrow.addEventListener('click', function () {
    pageNumberValue++;

    if (document.body.clientWidth >= 1280) {
        if (pageNumberValue > 1) {
            leftArrowRemoveDisable();
        }
        if (pageNumberValue >= 6) {
            rightArrowAddDisable();
        }
    }

    if (document.body.clientWidth < 1280 && document.body.clientWidth >= 768) {
        if (pageNumberValue > 1) {
            leftArrowRemoveDisable();
        }
        if (pageNumberValue >= 8) {
            rightArrowAddDisable();
        }
    }

    if (document.body.clientWidth < 768) {
        if (pageNumberValue > 1) {
            leftArrowRemoveDisable();
        }
        if (pageNumberValue >= 16) {
            rightArrowAddDisable();
        }
    }


    shuffleCards(pageNumberValue - 1);
    pageNumber.innerHTML = `${pageNumberValue}`;
    findAllCardsButtons(pageNumberValue - 1);
});

sliderLeftArrow.addEventListener('click', function () {
    pageNumberValue--;

    if (document.body.clientWidth >= 1280) {
        if (pageNumberValue === 1) {
            leftArrowAddDisable();
        }
        if (pageNumberValue < 6) {
            rightArrowRemoveDisable();
        }
    }

    if (document.body.clientWidth < 1280 && document.body.clientWidth >= 768) {
        if (pageNumberValue === 1) {
            leftArrowAddDisable();
        }
        if (pageNumberValue < 8) {
            rightArrowRemoveDisable();
        }
    }

    if (document.body.clientWidth < 768) {
        if (pageNumberValue === 1) {
            leftArrowAddDisable();
        }
        if (pageNumberValue < 16) {
            rightArrowRemoveDisable();
        }
    }


    shuffleCards(pageNumberValue - 1);
    pageNumber.innerHTML = `${pageNumberValue}`;
    findAllCardsButtons(pageNumberValue - 1);
});

sliderLeftDoubleArrow.addEventListener('click', function () {
    pageNumberValue = 1;
    sliderLeftArrow.setAttribute('disabled', true);
    sliderLeftArrow.classList.add('inactive');
    sliderLeftDoubleArrow.setAttribute('disabled', false);
    sliderLeftDoubleArrow.classList.add('inactive');

    sliderRightArrow.removeAttribute('disabled');
    sliderRightArrow.classList.remove('inactive');
    sliderRightDoubleArrow.removeAttribute('disabled');
    sliderRightDoubleArrow.classList.remove('inactive');

    shuffleCards(pageNumberValue - 1);
    pageNumber.innerHTML = `${pageNumberValue}`;
    findAllCardsButtons(pageNumberValue - 1);
});

sliderRightDoubleArrow.addEventListener('click', function () {

    if (document.body.clientWidth >= 1280) {
        pageNumberValue = 6;
    }

    if (document.body.clientWidth < 1280 && document.body.clientWidth >= 768) {
        pageNumberValue = 8;
    }

    if (document.body.clientWidth < 768) {
        pageNumberValue = 16;
    }

    sliderRightArrow.setAttribute('disabled', true);
    sliderRightArrow.classList.add('inactive');
    sliderRightDoubleArrow.setAttribute('disabled', true);
    sliderRightDoubleArrow.classList.add('inactive');

    sliderLeftArrow.removeAttribute('disabled');
    sliderLeftArrow.classList.remove('inactive');
    sliderLeftDoubleArrow.removeAttribute('disabled');
    sliderLeftDoubleArrow.classList.remove('inactive');

    shuffleCards(pageNumberValue - 1);
    pageNumber.innerHTML = `${pageNumberValue}`;
    findAllCardsButtons(pageNumberValue - 1);
});


// ADD POPUP TO BUTTONS

unactiveBackgroundPopUp.addEventListener('click', function () {
    document.documentElement.classList.remove('hidden');
    unactiveBackgroundPopUp.classList.remove('active');
    popUpContainer.classList.remove('active');
})

popUpExitButton.addEventListener('click', function () {
    document.documentElement.classList.remove('hidden');
    unactiveBackgroundPopUp.classList.remove('active');
    popUpContainer.classList.remove('active');
})

function addDescriptionPopUp(currPage = 0, number) {
    popUpInfo.innerHTML = '';
    let popUp = document.createElement('div');
    popUp.className = 'pets-slider-popup-info';

    if (document.body.clientWidth >= 1280) {
        popUp.innerHTML = `
            <img class="pets-slider-popup-image" src="../.${petsData[arr[currPage][number]].img}" alt="pets-poup-image">
            <div class="pets-slider-popup-description-container">
                <div class="pets-slider-popup-description">
                    <h2 class="pets-popup-title">${petsData[arr[currPage][number]].name}</h2>
                    <h3 class="pets-popup-subtitle">${petsData[arr[currPage][number]].type} - ${petsData[arr[currPage][number]].breed}</h3>
                    <p class="pets-popup-desc">
                        ${petsData[arr[currPage][number]].description}
                    </p>
                    <ul class="pets-poup-more-info">
                        <li class="pets-popup-age">
                            <span><b class="pets-popup-li-bold">Age: </b>${petsData[arr[currPage][number]].age}</span>
                        </li>
                        <li class="pets-popup-inoculations">
                            <span><b class="pets-popup-li-bold">Inoculations: </b>${petsData[arr[currPage][number]].inoculations}</span>
                        </li>
                        <li class="pets-popup-diseases">
                            <span><b class="pets-popup-li-bold">Diseases: </b>${petsData[arr[currPage][number]].diseases}</span>
                        </li>
                        <li class="pets-popup-parasites">
                            <span><b class="pets-popup-li-bold">Parasites: </b>${petsData[arr[currPage][number]].parasites}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }

    if (document.body.clientWidth < 1280 && document.body.clientWidth >= 768) {
        popUp.innerHTML = `
            <img class="pets-slider-popup-image" src="../.${petsData[arrMiddle[currPage][number]].img}" alt="pets-poup-image">
            <div class="pets-slider-popup-description-container">
                <div class="pets-slider-popup-description">
                    <h2 class="pets-popup-title">${petsData[arrMiddle[currPage][number]].name}</h2>
                    <h3 class="pets-popup-subtitle">${petsData[arrMiddle[currPage][number]].type} - ${petsData[arrMiddle[currPage][number]].breed}</h3>
                    <p class="pets-popup-desc">
                        ${petsData[arrMiddle[currPage][number]].description}
                    </p>
                    <ul class="pets-poup-more-info">
                        <li class="pets-popup-age">
                            <span><b class="pets-popup-li-bold">Age: </b>${petsData[arrMiddle[currPage][number]].age}</span>
                        </li>
                        <li class="pets-popup-inoculations">
                            <span><b class="pets-popup-li-bold">Inoculations: </b>${petsData[arrMiddle[currPage][number]].inoculations}</span>
                        </li>
                        <li class="pets-popup-diseases">
                            <span><b class="pets-popup-li-bold">Diseases: </b>${petsData[arrMiddle[currPage][number]].diseases}</span>
                        </li>
                        <li class="pets-popup-parasites">
                            <span><b class="pets-popup-li-bold">Parasites: </b>${petsData[arrMiddle[currPage][number]].parasites}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }

    if (document.body.clientWidth < 768) {
        popUp.innerHTML = `
            <img class="pets-slider-popup-image" src="../.${petsData[arrHard[currPage][number]].img}" alt="pets-poup-image">
            <div class="pets-slider-popup-description-container">
                <div class="pets-slider-popup-description">
                    <h2 class="pets-popup-title">${petsData[arrHard[currPage][number]].name}</h2>
                    <h3 class="pets-popup-subtitle">${petsData[arrHard[currPage][number]].type} - ${petsData[arrHard[currPage][number]].breed}</h3>
                    <p class="pets-popup-desc">
                        ${petsData[arrHard[currPage][number]].description}
                    </p>
                    <ul class="pets-poup-more-info">
                        <li class="pets-popup-age">
                            <span><b class="pets-popup-li-bold">Age: </b>${petsData[arrHard[currPage][number]].age}</span>
                        </li>
                        <li class="pets-popup-inoculations">
                            <span><b class="pets-popup-li-bold">Inoculations: </b>${petsData[arrHard[currPage][number]].inoculations}</span>
                        </li>
                        <li class="pets-popup-diseases">
                            <span><b class="pets-popup-li-bold">Diseases: </b>${petsData[arrHard[currPage][number]].diseases}</span>
                        </li>
                        <li class="pets-popup-parasites">
                            <span><b class="pets-popup-li-bold">Parasites: </b>${petsData[arrHard[currPage][number]].parasites}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }

    
    popUpInfo.appendChild(popUp);


    document.documentElement.classList.add('hidden');
    unactiveBackgroundPopUp.classList.add('active');
    popUpContainer.classList.add('active');

    // Add hover effect to button
    const popUpBackground = document.querySelector('.overflow-popup.active');
    popUpBackground.addEventListener('mouseover', function () {
        popUpExitButton.classList.add('active');
    });
    popUpBackground.addEventListener('mouseout', function () {
        popUpExitButton.classList.remove('active');
    });
}

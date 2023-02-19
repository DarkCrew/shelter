import petsData from './assets/pets.js';

const headerNavList = document.querySelectorAll('.header-nav-item');
const headerNavBurger = document.querySelector('.header-burger-menu');
const headerNavBurgerMenu = document.querySelector('.header-nav');
const headerNavBurgerBefore = document.querySelector('.header-burger-menu-nav');
const body = document.body;
const unactiveBackground = document.querySelector('.overflow');
const unactiveBackgroundPopUp = document.querySelector('.overflow-popup');

const popUpContainer = document.querySelector('.pets-slider-popup-container');
const popUpInfo = document.querySelector('.pets-slider-popup-info');
const popUpExitButton = document.querySelector('.pets-slider-popup-exit-button');
const sliderContainer = document.querySelector('.pets-slider-elements-container');
const sliderLeftElements = document.querySelector('.pets-slider-elem-left');
const sliderRightElements = document.querySelector('.pets-slider-elem-right');
const sliderActiveElements = document.querySelector('.pets-slider-elem-active');
const leftSliderButton = document.querySelector('.pets-slider-button.left');
const rightSliderButton = document.querySelector('.pets-slider-button.right');



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


/* SLIDER */

let arr = [0, 1, 2, 3, 4, 5, 6, 7];
let arrActive = [];
let arrFilter = [];
let leftArr = [];
let rightArr = [];

const moveLeft = () => {
    sliderContainer.classList.add('transition-left');
    removeListenerSliderButtons();
}

const moveRight = () => {
    sliderContainer.classList.add('transition-right');
    removeListenerSliderButtons();
}

function removeListenerSliderButtons() {
    leftSliderButton.removeEventListener('click', moveLeft);
    rightSliderButton.removeEventListener('click', moveRight);
};

leftSliderButton.addEventListener('click', moveLeft);
rightSliderButton.addEventListener('click', moveRight);

function getUniqueActiveNumbers() {
    for (let i = 0; i < 3; i++) {
        let currNumber = arr[Math.floor(Math.random() * arr.length)];
        if (arrActive.indexOf(currNumber) === -1) {
            arrActive.push(currNumber);
        } else {
            i--;
        }
    }
}
getUniqueActiveNumbers();

function getUniqueNumbers() {
    arrFilter = [];
    for (let i = 0; i < arr.length; i++) {
        if (arrActive.indexOf(arr[i]) === -1) {
            arrFilter.push(arr[i]);
        }
    }
}

function generateNumbersLeftCards() {
    leftArr = [];
    for (let i = 0; i < 3; i++) {
        let currNumber = arrFilter[Math.floor(Math.random() * arrFilter.length)];
        if (leftArr.indexOf(currNumber) === -1) {
            leftArr.push(currNumber);
        } else {
            i--;
        }
    }
}

function generateNumbersRightCards() {
    rightArr = [];
    for (let i = 0; i < 3; i++) {
        let currRightNumber = arrFilter[Math.floor(Math.random() * arrFilter.length)];
        if (rightArr.indexOf(currRightNumber) === -1) {
            rightArr.push(currRightNumber);
        } else {
            i--;
        }
    }
}

function generateLeftCards() {
    sliderLeftElements.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        let card = document.createElement('div');
        card.className = 'pets-slider-element';
        card.innerHTML = `
            <img src="${petsData[leftArr[i]].img}" class="pets-slider-element-photo" alt="pets-slider-element-photo"></img>
            <h3 class="pets-slider-element-title">${petsData[leftArr[i]].name}</h3>
            <div class="pets-slider-button-container">
                <button class="button pets-slider-element-button">Learn more</button>
            </div>
        `;
        sliderLeftElements.appendChild(card);
    }
}

function generateActiveCards() {
    sliderActiveElements.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        let card = document.createElement('div');
        card.className = 'pets-slider-element';
        card.innerHTML = `
            <img src="${petsData[arrActive[i]].img}" class="pets-slider-element-photo" alt="pets-slider-element-photo"></img>
            <h3 class="pets-slider-element-title">${petsData[arrActive[i]].name}</h3>
            <div class="pets-slider-button-container">
                <button class="button pets-slider-element-button">Learn more</button>
            </div>
        `;
        sliderActiveElements.appendChild(card);
    }
}

function generateRightCards() {
    sliderRightElements.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        let card = document.createElement('div');
        card.className = 'pets-slider-element';
        card.innerHTML = `
            <img src="${petsData[rightArr[i]].img}" class="pets-slider-element-photo" alt="pets-slider-element-photo"></img>
            <h3 class="pets-slider-element-title">${petsData[rightArr[i]].name}</h3>
            <div class="pets-slider-button-container">
                <button class="button pets-slider-element-button">Learn more</button>
            </div>
        `;
        sliderRightElements.appendChild(card);
    }
}


function startSlider() {
    getUniqueNumbers();
    generateNumbersLeftCards();
    generateNumbersRightCards();


    generateActiveCards();
    generateLeftCards();
    generateRightCards();

    addEventListenersToButtons();
}

startSlider();


sliderContainer.addEventListener('animationend', (AnimationName) => {
    if (AnimationName.animationName === 'move-left') {
        sliderContainer.classList.remove('transition-left');
        sliderRightElements.innerHTML = sliderActiveElements.innerHTML;
        sliderActiveElements.innerHTML = sliderLeftElements.innerHTML;
        rightArr = [...arrActive];
        arrActive = [...leftArr];
        getUniqueNumbers();
        generateNumbersLeftCards();
        generateLeftCards();
    } else {
        sliderContainer.classList.remove('transition-right');
        sliderLeftElements.innerHTML = sliderActiveElements.innerHTML;
        sliderActiveElements.innerHTML = sliderRightElements.innerHTML;
        leftArr = [...arrActive];
        arrActive = [...rightArr];
        getUniqueNumbers();
        generateNumbersRightCards();
        generateRightCards();
    }
    addEventListenersToButtons();
    leftSliderButton.addEventListener('click', moveLeft);
    rightSliderButton.addEventListener('click', moveRight);
});

function addEventListenersToButtons() {
    const cardButtons = document.querySelectorAll('.pets-slider-element');

    cardButtons[3].addEventListener('click', function () {
        addDescriptionPopUp(0);
    });

    cardButtons[4].addEventListener('click', function () {
        addDescriptionPopUp(1);
    });

    cardButtons[5].addEventListener('click', function () {
        addDescriptionPopUp(2);
    })
}

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


function addDescriptionPopUp(number) {
    popUpInfo.innerHTML = '';
        let popUp = document.createElement('div');
        popUp.className = 'pets-slider-popup-info';
        popUp.innerHTML = `
            <img class="pets-slider-popup-image" src="${petsData[arrActive[number]].img}" alt="pets-poup-image">
            <div class="pets-slider-popup-description-container">
                <div class="pets-slider-popup-description">
                    <h2 class="pets-popup-title">${petsData[arrActive[number]].name}</h2>
                    <h3 class="pets-popup-subtitle">${petsData[arrActive[number]].type} - ${petsData[arrActive[number]].breed}</h3>
                    <p class="pets-popup-desc">
                        ${petsData[arrActive[number]].description}
                    </p>
                    <ul class="pets-poup-more-info">
                        <li class="pets-popup-age">
                            <span><b class="pets-popup-li-bold">Age: </b>${petsData[arrActive[number]].age}</span>
                        </li>
                        <li class="pets-popup-inoculations">
                            <span><b class="pets-popup-li-bold">Inoculations: </b>${petsData[arrActive[number]].inoculations}</span>
                        </li>
                        <li class="pets-popup-diseases">
                            <span><b class="pets-popup-li-bold">Diseases: </b>${petsData[arrActive[number]].diseases}</span>
                        </li>
                        <li class="pets-popup-parasites">
                            <span><b class="pets-popup-li-bold">Parasites: </b>${petsData[arrActive[number]].parasites}</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        popUpInfo.appendChild(popUp);


        document.documentElement.classList.add('hidden');
        unactiveBackgroundPopUp.classList.add('active');
        popUpContainer.classList.add('active');
        
        // Add hover effect to button
        const popUpBackground = document.querySelector('.overflow-popup.active');
        popUpBackground.addEventListener('mouseover', function(){
            popUpExitButton.classList.add('active');
        });
        popUpBackground.addEventListener('mouseout', function(){
            popUpExitButton.classList.remove('active');
        });
}


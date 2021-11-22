/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
movies: [
    "Беспринципные",
    "Южный парк",
    "Одержимость",
    "Гнев человеческий",
    "История игрушек",
    "Ледяное сердце"
    ]
};

const adv = document.querySelector('.promo__adv'),
      genre = document.querySelector('.promo__genre'),
      poster = document.querySelector('.promo__bg'),
      listFilms = document.querySelector('.promo__interactive-list'),
      form = document.querySelector('.add'),
      input = document.querySelector('.adding__input'),
      trash = document.getElementsByClassName('delete'),
      checkbox = document.querySelector('#checkbox');

adv.remove();

genre.textContent = 'ДРАМА';

poster.style.backgroundImage = 'url("img/bg.jpg")';

///////////////////

let sortMovies, newFilm,
    filmInList = [],
    checkIn = false;

function addFilms() {
    listFilms.innerHTML = '';
    filmInList = [];
    sortMovies = movieDB.movies.sort();

    for (let i = 0; i < sortMovies.length; i++) {        
        filmInList.push(`
            <li class="promo__interactive-item">
               ${i + 1}. ${sortMovies[i]}
            <div class="delete"></div>
        `);
    }        
    listFilms.innerHTML = filmInList.join('');
}
addFilms();

input.addEventListener('input', () => {
    newFilm = input.value;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    movieDB.movies.push(newFilm);
    addFilms();

    if (checkIn) {
        console.log("Добавляем любимый фильм");
    }
});

console.log(sortMovies);

function deleteFilm(i) {
    console.log(i);
    try {
        filmInList.splice(i, 1);
        listFilms.innerHTML = filmInList.join('');
    } catch(e) {
        console.log(e.stack);
    } finally {
        console.log(`длина массива стала ${filmInList.length} элементов`);
    }
}

try {
    for (let i = 0; i < trash.length; i++) {
        trash[i].addEventListener('click', () => {
            deleteFilm(i);
        });
    }
} catch(e) {
    console.log(e.stack);
}


/*
function nameOfFilm() {
    for (let i = 0; i < sortMovies.length; i++) {
        if (sortMovies[i].length > 10) {
            sortMovies[i] = sortMovies[i].slice(10, 10);
        }
    }

    // sortMovies.forEach(item => {
    //     if (item.length > 10) {
    //         item = item.replace(10,'');
    //     }
    // });    
}
*/

checkbox.addEventListener('click', () => {
    if (checkbox.getAttribute('checked')) {
        checkbox.removeAttribute('checked');
        checkIn = false;
    } else {
        checkbox.setAttribute('checked', 'checked');
        checkIn = true;
    }
    // console.log(checkIn);
});
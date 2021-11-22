/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
movies: [
    "Беспринципные",
    "Южный парк",
    "Щит и меч",
    "Одержимость",
    "Гнев человеческий",
    "История игрушек",
    "Ледяное сердце"
    ]
};

const adv = document.querySelector('.promo__adv'),
      genre = document.querySelector('.promo__genre'),
      poster = document.querySelector('.promo__bg'),
      listFilms = document.querySelector('.promo__interactive-list');

// adv.style.display = 'none'; // можно либо скрыть, либо удалить блок
adv.remove();

genre.textContent = 'ДРАМА';

poster.style.backgroundImage = 'url("img/bg.jpg")';

///////////////////
const sortMovies = movieDB.movies.sort(),
      filmInList = [];

console.log(sortMovies);

listFilms.innerHTML = '';

for (let i = 0; i < sortMovies.length; i++) {        
    filmInList.push(`
        <li class="promo__interactive-item">
           ${i + 1}. ${sortMovies[i]}
        <div class="delete"></div>
    `);
}
    
listFilms.innerHTML = filmInList.join('');
///////////////////
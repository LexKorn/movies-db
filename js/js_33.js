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

document.addEventListener('DOMContentLoaded', () => {

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
          movieList = document.querySelector('.promo__interactive-list'),
          form = document.querySelector('.add'),
          input = document.querySelector('.adding__input'),
          checkbox = document.querySelector('[type="checkbox"]');
    
    adv.remove();
    
    genre.textContent = 'ДРАМА';
    
    poster.style.backgroundImage = 'url("img/bg.jpg")';

        
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = input.value,
            favorit = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 10) {
                newFilm = `${newFilm.substring(0, 10)}...`;
            }

            if (favorit) {
                console.log('Добавляем любимый фильм');
            }

            movieDB.movies.push(newFilm);
            movieDB.movies.sort();
            createMovieList(movieDB.movies, movieList);
        }
        e.target.reset();
    });

    function createMovieList(films, parent) {        
        parent.innerHTML = [];
        films.sort();

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film}
                    <div class="delete"></div>
                </li>
            `;            
        });

        document.querySelectorAll('.delete').forEach((trash, i) => {
            trash.addEventListener('click', () => {
                trash.parentElement.remove();
                films.splice(i, 1);
                createMovieList(films, parent);
            });
        });                 
    }
    createMovieList(movieDB.movies, movieList);
});
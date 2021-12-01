/* Задания на урок:

1) При установке галочки "Сделать любимым" - фильм выделить жирным зелёным;

2) При кликание на Сериалы, Мультфильмы, Клипы - меняется постер и описание;
*/

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
    
    poster.style.backgroundImage = 'url("img/serials.jpg")';

    let favoritFilm;

        
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = input.value,
            favorit = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 10) {
                newFilm = `${newFilm.substring(0, 10)}...`;
            }

            if (favorit) {
                favoritFilm = newFilm;
            }

            movieDB.movies.push(newFilm);
            createMovieList(movieDB.movies, movieList);
        }
        e.target.reset();
    });

    function createMovieList(films, parent) {        
        parent.innerHTML = [];
        films.sort();

        films.forEach((film, i) => {
            if (film === favoritFilm) {
                parent.innerHTML += `
                    <li class="promo__interactive-item favorit">${i + 1}. ${film}
                        <div class="delete"></div>
                    </li>
                `; 
            } else {
                parent.innerHTML += `
                    <li class="promo__interactive-item">${i + 1}. ${film}
                        <div class="delete"></div>
                    </li>
                `;            
            }         
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
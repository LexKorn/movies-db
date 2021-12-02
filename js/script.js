/* Задания на урок:

1) При установке галочки "Сделать любимым" - фильм выделить жирным зелёным;

2) При кликание на Сериалы, Мультфильмы, Клипы - меняется постер и описание;

3) Поиск среди просмотренных фильмов по 3 символам из строки поиска.
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
          title = document.querySelector('.promo__title'),
          genre = document.querySelector('.promo__genre'),
          descrab = document.querySelector('.promo__descr'),
          poster = document.querySelector('.promo__bg'),
          movieList = document.querySelector('.promo__interactive-list'),
          form = document.querySelector('.add'),
          input = document.querySelector('.adding__input'),
          checkbox = document.querySelector('[type="checkbox"]'),
          tabs = document.querySelectorAll('.promo__menu-item');
    
    let favoritFilm;

    adv.remove();
  
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let newFilm = input.value,
            favorit = checkbox.checked;

        if (newFilm) {
            if (newFilm.length > 20) {
                newFilm = `${newFilm.substring(0, 20)}...`;
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

/////////////////

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            tabs.forEach(tab => {
                tab.classList.remove('promo__menu-item_active');
            });            
            tab.classList.add('promo__menu-item_active');
            changeTab(i); 
        });
    });


    function changeTab(index) {
        switch (index) {
            case 0: 
                    title.textContent = 'МАРСИАНИН';
                    genre.textContent = 'ДРАМА';
                    descrab.textContent = 'ИСТОРИЯ ЧЕЛОВЕКА, ВЫЖИВШЕГО НА ЧУЖОЙ ПЛАНЕТЕ В ОДИНОЧКУ';
                    poster.style.backgroundImage = 'url("img/bg.jpg")';
                    break;
            case 1: 
                    title.textContent = 'ИНТЕРНЫ';
                    genre.textContent = 'КОМЕДИЯ';
                    descrab.textContent = 'Интерны, проходящие практику у неординарного заведующего отделением';
                    poster.style.backgroundImage = 'url("img/serials.jpg")';
                    break;
            case 2: 
                    title.textContent = 'ЛЕДНИКОВЫЙ ПЕРИОД';
                    genre.textContent = 'КОМЕДИЯ';
                    descrab.textContent = 'Приключения мамонта, льва, ленивца и других обитателей ледникового периода';
                    poster.style.backgroundImage = 'url("img/cartoons.jpg")';
                    break;
            case 3: 
                    title.textContent = 'КОРОЛЬ И ШУТ';
                    genre.textContent = 'ПАНК-РОК';
                    descrab.textContent = 'САМАЯ КРУТАЯ ГРУППА ОТЕЧЕСТВЕННОГО ПАНК-РОКА';
                    poster.style.backgroundImage = 'url("img/clips.jpg")';
                    break;
        }        
    }
    changeTab(0);    

    ////////////////
    
    const searchForm = document.querySelector('.search'),
          searchInput = document.querySelector('.searchInput');

    let searchText;

    searchInput.addEventListener('input', () => {
        searchText = searchInput.value;
    });
        
    searchForm.addEventListener('submit', () => {
        let searchRes = [];

        movieDB.movies = movieDB.movies.map(item => item.toUpperCase());
        searchText = searchText.toUpperCase();

        if (searchText.length >= 3) {
            for (let i = 0; i < movieDB.movies.length; i++) {
                if (movieDB.movies[i].includes(searchText)) {
                    searchRes.push(movieDB.movies[i]);
                } else {
                    continue;
                }
            }
            alert(searchRes);
        }
    });
        
});
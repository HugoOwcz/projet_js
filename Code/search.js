
const tmdbReadApiKey = `Rentrez votre 'Jeton d'accès en lecture à l'API' TheMovieDataBase`

function searchbar(){
    const barre_de_recherche = document.getElementById('searchbar')
    barre_de_recherche.addEventListener('keyup', async recherche => {
        let valeur = barre_de_recherche.value
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${tmdbReadApiKey}`
            }
        };
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${valeur}&include_adult=false&language=en-US&page=1`, options)
        const responseJson = await response.json()
        const listFilm = await responseJson.results
        const section = document.getElementById('movie-list')
        const film = document.getElementsByClassName('film')
        for (let i = 0; i < film.length; i++){
            section.removeChild(film[i])
        }
        for (let i = 0; i < listFilm.length; i++){
            const affiche = document.createElement('section')
            affiche.className = 'film'
            const titre = document.createElement('h2')
            titre.textContent = listFilm[i].title
            affiche.appendChild(titre)
            const date = document.createElement('h3')
            date.textContent = listFilm[i].release_date
            affiche.appendChild(date)
            const img = document.createElement('img')
            img.src = `https://image.tmdb.org/t/p/w500${listFilm[i].poster_path}`
            img.alt = `Affiche du film ${listFilm[i].title}`
            affiche.appendChild(img)
            const a = document.createElement('a')
            a.href = 'film.html'
            const button = document.createElement('button')
            button.textContent = 'en savoir plus'
            button.id = listFilm[i].id
            button.addEventListener("click", redirect => {
                sessionStorage.setItem("id", button.id)
            })
            a.appendChild(button)
            affiche.appendChild(a)
            section.appendChild(affiche)
        }
    })

}

searchbar()
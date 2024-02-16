
const tmdbReadApiKey = `Rentrez votre 'Jeton d'accès en lecture à l'API' TheMovieDataBase`
let page = 1

async function creationPage(){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbReadApiKey}`
                }
    };
    const response = await fetch(`https://api.themoviedb.org/3//discover/movie?sort_by=popularity.desc&&page=${page}`, options)
    const responseJson = await response.json()
    const listFilm = await responseJson.results
    for (let i = 0; i < listFilm.length; i++){
        const section = document.getElementById('movie-list')
        const affiche = document.createElement('section')
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
        button.id = listFilm[i].id
        button.addEventListener("click", redirect => {
            sessionStorage.setItem("id", button.id)
        })
        const p = document.createElement('p')
        p.textContent = 'En savoir plus'
        button.appendChild(p)
        a.appendChild(button)
        affiche.appendChild(a)
        section.appendChild(affiche)
    }
}

creationPage()
page += 1

function plusFilm(){
    const boutton = document.getElementById("plus")
    boutton.addEventListener('click', ajoutFilm => {
        creationPage()
        page += 1
    })
}
plusFilm()

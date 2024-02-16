
const tmdbReadApiKey = `Rentrez votre 'Jeton d'accès en lecture à l'API' TheMovieDataBase`

async function creationPage(){
    const id = sessionStorage.getItem("id")
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbReadApiKey}`
        }
    };
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
    const film = await response.json()
    const section = document.getElementById('film')
    const titre = document.createElement('h2')
    titre.textContent = film.title
    section.appendChild(titre)
    const img = document.createElement('img')
    img.src = `https://image.tmdb.org/t/p/w500${film.poster_path}`
    img.alt = `Affiche du film ${film.title}`
    section.appendChild(img)
    const p = document.createElement('p')
    p.textContent = film.overview
    section.appendChild(p)
    const response_com = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews`, options)
    const responseJson = await response_com.json()
    const commentaire = responseJson.results
    if (commentaire.length > 0){
        for (let i= 0; i < commentaire.length; i++){
            const h3 = document.createElement('h3')
            h3.textContent = commentaire[i].author
            section.appendChild(h3)
            const date = document.createElement('h4')
            date.textContent = commentaire[i].updated_at
            section.appendChild(date)
            const p = document.createElement('p')
            p.textContent = commentaire[i].content
            section.appendChild(p)
        }
    }
    if (localStorage.getItem(id+'text')){
        const h3 = document.createElement('h3')
            h3.textContent = localStorage.getItem(id+'nom')
            section.appendChild(h3)
            const p = document.createElement('p')
            p.textContent = localStorage.getItem(id+'text')
            section.appendChild(p)
    }
}

creationPage()
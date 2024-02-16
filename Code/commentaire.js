
const tmdbReadApiKey = `Rentrez votre 'Jeton d'accès en lecture à l'API' TheMovieDataBase`

async function commentaire(){
    if (localStorage.getItem('tmdbSessionId')){
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbReadApiKey}`
            }
        };
        const cle = sessionStorage.getItem('id')
        const response = await fetch('https://api.themoviedb.org/3/account/20941381', options)
        const responseJson = await response.json()
        const name = responseJson.username
        const button = document.getElementById('retour')
        button.addEventListener('click', send => {
            const text = document.getElementById('commentaire').value
            localStorage.setItem(cle+'nom', name)
            localStorage.setItem(cle+'text', text)
        })
    }
}

commentaire()

const tmdbReadApiKeySso = `Rentrez votre 'Jeton d'accès en lecture à l'API' TheMovieDataBase`
let lien = window.location.href

window.onload = async () => {
    if (!location.search.includes('request_token=')){
        return
    }
    let cle = location.search.split('request_token=')[1]?.split('&')?.[0]
    lien = location.search.split('request_token=')[0]
    if (cle){
        newSession(cle)
            .then(sessionData => {
                localStorage.setItem('tmdbSessionId', sessionData.session_id)
                localStorage.setItem('tmbdAccessToken', cle)
                location.href = lien
            })
            .catch(err => {
                console.error(err);
            })
    }
}

async function sso(){
    let tokenData = await TMDBToken()
    if (!tokenData.success){
        return alert('Une erreur est survenu et je ne peux pas vous identifier')
    }
    location.href = `https://www.themoviedb.org/authenticate/${tokenData.request_token}?redirect_to=${lien}`
}

function connection(){
    let button = document.getElementsByClassName("sso")
    button = button[0]
    const nav = document.getElementById('nav')
    if (button.id == 'connection' && localStorage.getItem('tmdbSessionId')){
        nav.removeChild(button)
        button = document.createElement('button')
        button.className = 'sso'
        button.id = 'deconnection'
        button.textContent = 'Déconnection'
        button.addEventListener('click', deconnection => {
            localStorage.setItem('tmdbSessionId', null)
            localStorage.setItem('tmbdAccessToken', null)
            connection()
        })
        nav.appendChild(button)
    } else {
        nav.removeChild(button)
        button = document.createElement('button')
        button.className ='sso'
        button.id = 'connection'
        button.textContent = 'Connection'
        button.addEventListener('click', redirect => {
            sso()
        })
        nav.appendChild(button)
    }
}

connection()

async function TMDBToken(){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbReadApiKeySso}`
        }
    };
    let demande = await fetch('https://api.themoviedb.org/3/authentication/token/new', options).catch(err => console.error('erreur:' + err))
    if (!demande){return}
    let demandeJson = await demande.json()
    return demandeJson
}

async function newSession(cle){
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${tmdbReadApiKeySso}`
        },
        body: JSON.stringify({request_token: cle})
    };
    let demande = await fetch('https://api.themoviedb.org/3/authentication/session/new', options).catch(err => console.error('erreur:' + err))
    if (!demande){return}
    let demandeJson = await demande.json()
    return demandeJson
}
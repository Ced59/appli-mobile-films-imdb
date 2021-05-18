const API_TOKEN = "d9f3e64a71289b0ce3eb8e272b1836d6";

export function getFilmsFromApiWithText(text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+ API_TOKEN + '&language=fr&query=' + text + '&include_adult=true';

    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error));
}

export function getImageFromAPi(name){
    return "https://image.tmdb.org/t/p/w500/" + name;
}

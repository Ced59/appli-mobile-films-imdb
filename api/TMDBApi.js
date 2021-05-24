const API_TOKEN = "d9f3e64a71289b0ce3eb8e272b1836d6";

export function getFilmsFromApiWithText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text+'&page='+page;
  return fetch( url )
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w500"+name;
}

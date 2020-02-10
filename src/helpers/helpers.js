export const getTopTen = async genreId => {
  const key = `${process.env.REACT_APP_MOVIE_API_KEY}`
  const year = new Date().getFullYear() - 1
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}&primary_release_year=${year}&page=1`
  const response = await fetch(url)
  const data = await response.json()
  const slice = data.results.slice(0, 10)
  return slice
}

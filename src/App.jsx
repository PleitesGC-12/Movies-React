import { useEffect, useState } from 'react'
import './App.css'
import Search from "./components/Search"
import Spinner from "./components/Spinner"

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  
  // state that holds the what the user has typed
  const [searchTerm, setSearchTerm] = useState('');
  
  // state for errors
  const [errorMessage, setErrorMessage] = useState('');

  // usestate to replicate a box where we can store the movies we fetch
  const [movieList, setMovieList] = useState([]);

  // loading state to show a spinner when the data is being fecthed
  const [isLoading, setIsLoading] = useState(false);

  // to call the api
  const fetchMovies = async () => {
    
    try {
      // while the data is being fetched we can show the loading spinner
      setIsLoading(true);
      setErrorMessage('');
      
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      // we populate the array of movies with the results
      // or with an empty array
      setMovieList(data.results || []);

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later');

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  } , [])

  return (
    <main>
      
      <div className="wrapper">
        
        <header>
          <img src="./hero.png" alt="Hero Banner"/>
          
          <h1>
            Find <span className="text-gradient">Movies </span> 
            You'll Enjoy Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map( (movie) => <p key={movie.id} className="text-white">{movie.title}</p>)}
            </ul>
          )}
        </section>

      </div>
    </main>
   
  )
}

export default App

import axios from 'axios';
import { useState } from 'react';
import './App.css';

// input field + button === search
// Movie not found

// Detail - Title, Year it released + plot
// Display genres as a list

const OMDB_API_BASE_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&`

function App() {
  const [searchString, setSearchString] = useState('');
  const [movieDetailData, setMovieDetailData] = useState(null);
  const [movieNotFound, setMovieNotFound] = useState(false);


  const onSearchStringChange = (e) => {
    setSearchString(e.target.value);
  }

  const onSearch = async () => {
    setSearchString('');
    try {
      const searchResult = await axios.get(`${OMDB_API_BASE_URL}t=${searchString}`);
      if (searchResult.data.Error) {
        setMovieNotFound(true);
      }
      const {Title, Year, Plot, Genre} = searchResult.data;
      setMovieDetailData({
        title: Title,
        year: Year,
        plot: Plot,
        genres: Genre,
      })
      if (movieNotFound) {
        setMovieNotFound(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <input type="text" value={searchString} onChange={onSearchStringChange} />
      <button onClick={onSearch} >Search</button>

      <MovieDetail movieDetailData={movieDetailData} movieNotFound={movieNotFound}/>
    </>
  );
}

const MovieDetail = ({
  movieDetailData,
  movieNotFound,
}) => {
  if (movieNotFound) {
    return <div>Movie not found</div>
  }

  if (!movieDetailData ) {
    return null;
  }

  const { title,
    year,
    plot,
    genres, } = movieDetailData;

  return (
    <>
      <div>
        Title: {title}
      </div>
      <div>
        Year: {year}
      </div>
      <div>
        Plot: {plot}
      </div>
      <div>
        Genres
        <ul>
          {genres.split(', ').map(genre => {
            return <li key={genre} >{genre}</li>
          })}
        </ul>
      </div>
    </>
  )
}

export default App;

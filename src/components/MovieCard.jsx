// -------- This a presentaional component, it does not handle any logic, it only receives props -----

// we can destructure more properties we want to use to avoid repeating the prefix movie
const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
    return (
        <div className="movie-card">
            <img 
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}
                alt={title}
            />

            <div className="mt-4">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="Star Icon"/>
                        {/* render the vote average if exists */}
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    <p className="lang">{original_language}</p>

                    <p className="year">
                        {release_date ? release_date.split('-')[0] : 'N/A'}
                    </p>
                </div>

            </div>
        </div>

    
    )
}

export default MovieCard
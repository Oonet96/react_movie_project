import './MovieInfoListBox.css';
import { Link } from 'react-router-dom';

function MovieInfoListBox(props){
    return(
        <li className='movie'>
            <Link to={`/detail?id=${props.movieData.id}`}>
            <img src={props.movieData.imageAddr} alt={props.movieData.title} />
            <div className='movie_data'>
                <h3 className='movie_title'>{props.movieData.title}</h3>
                <h5 className='movie_year'>{props.movieData.relYear}</h5>
                <p className='movie_summery'>{props.movieData.summary.slice(0,180)}...</p>
                <ul className='movie_genres'>
                {
                    props.movieData.genreList.map(
                        (genre,index)=>(
                            <li key={index} className='movie_genre'>{genre}</li>
                        )
                    )
                }
                </ul>
            </div>
            </Link>
        </li>
    );
}

export default MovieInfoListBox;
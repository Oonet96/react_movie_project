import './Detail.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Detail(){
    const [bLoaded,setLoaded]= useState(false);
    const [movieInfo,setMovieInfo] = useState(null);
    const location = useLocation();

    useEffect(
        ()=>{
            fetchMovieData();

            return ()=>{

            }
        },
    []);

    async function fetchMovieData(){
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');

        const res = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        setMovieInfo(res.data.data.movie);
        setLoaded(true);
    }


    return(
        <div className='detail'>
            {bLoaded?(
                <>
                    <img src={movieInfo.medium_cover_image} alt="" />
                    <h2>{movieInfo.title}({movieInfo.year})</h2>
                    <p>{movieInfo.description_full}</p>
                    <ul>
                        {
                            movieInfo.genres.map(
                                (item,index)=>{
                                    return(
                                        <li key={index}>{item}</li>
                                    )
                                }
                            )
                        }
                    </ul>
                </>
            ):(
                <div className='loader'>
                    <span className='loader_text'>Loading...</span>
                </div>
            )}
        </div>
    );
}

export default Detail;
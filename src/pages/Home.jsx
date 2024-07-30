import { useState, useEffect } from "react";
import {Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import './Home.css';
import MovieInfoListBox from "../components/MovieInfoListBox";
import MovieDataList from "../data/MovieData";
import left_btn from '../images/ic_left_btn.png';
import rigth_btn from '../images/ic_right_btn.png';
// 목록주소
// https://yts.mx/api/v2/list_movies.json
// https://yts-proxy.now.sh/list_movies.json
// 상세보기주소
// https://yts.mx/api/v2/movie_details.json?movie_id=11
// https://yts-proxy.now.sh/movie_detail.json?movie_id=11
let MovieCount = 0;

function Home(){
    const [bLoaded,setLoaded] = useState(false);
    const [movieDataList,setDataList] = useState(null);
    const [curListNumber,setListNumber] = useState(1);
    const [curPageNumber,setPageNumber] = useState(1);
    // const [listBtn,setListBtn] = useState(null);

    useEffect(
        ()=>{
            setPageNumberButton();

            return ()=>{
                // setDataList(null);
            };
        },[]);

    useEffect(
        ()=>{
            setPageNumber(curListNumber*10-9);
        },
    [curListNumber])

    useEffect(
        ()=>{
            fetchMoviesData();

        },
    [curPageNumber]);

    async function fetchMoviesData(){
        const res = await axios.get(`https://yts-proxy.now.sh/list_movies.json?sort_by=rating&page=${curPageNumber}`);
        MovieCount=res.data.data.movie_count;
        setDataList(new MovieDataList(res.data.data));
        setLoaded(true);
    }

    function setPageNumberButton(){
        let lstButton = new Array();
        for(let i = (curListNumber*10-10); i<curListNumber*10; i++){
            lstButton.push(<li><button id={i+1} onClick={e=>onClickMovePage(e)}>{i+1}</button></li>);
        }
        // setListBtn(lstButton);
        return lstButton;
    }

    function onClickMovePage(e){
        if(e.target.id !== curPageNumber)
            setPageNumber(e.target.id);
    }

    function onClickMovePageList(bDirection){
        console.log("onClickMovePageList");
        console.log(curListNumber);
        bDirection ? setListNumber(curListNumber>1 ? curListNumber-1 : 1) : setListNumber(parseInt(MovieCount/2000)>curListNumber ? curListNumber+1 : curListNumber);
        setPageNumberButton();
    }


    return(
       <>
        {bLoaded ?
            <div>
                <h1>Movie List(Home)</h1>
                <ul className='movies'>
                    {movieDataList ?
                    movieDataList.lstMovieData.map(item=>(
                        <MovieInfoListBox key={item.id} movieData={item}/>
                    )) : console.log('error!')}
                </ul>
                <div id='page_list_button_container'>
                    <img src={left_btn} width={20} height={40} onClick={e=>onClickMovePageList(true)}/>
                    <ul id='page_list_button_box'>
                        {/* {listBtn} */}
                        {setPageNumberButton()}
                    </ul>
                    {parseInt(MovieCount/2000)>curListNumber && <img src={rigth_btn} width={20} height={40} onClick={e=>onClickMovePageList(false)}/>}
                </div>
            </div>
            : <p>loading...</p>}
       </>
    );
}

export default Home;
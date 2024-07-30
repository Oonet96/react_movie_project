// id , title, year, rating, runtime, summary, genres[] ,medium_cover_image
class MovieData{
    id;
    title;
    relYear;
    rating;
    runtime;
    summary;
    genreList;
    imageAddr;

    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.relYear = data.year;
        this.rating = data.rating;
        this.runtime = data.runtime;
        this.summary = data.summary;
        this.genreList = data.genres;
        this.imageAddr = data.medium_cover_image;
    }
}

class MovieDataList{
    pageNumber=0;
    lstCount = 0;
    lstMovieData = new Array();

    constructor(data){
        this.pageNumber = data.page_number;
        this.lstCount = data.limit;
        for(let i= 0; i<data.movies.length;i++){
            this.lstMovieData.push(new MovieData(data.movies[i]));
        }
    }
}

export default MovieDataList;
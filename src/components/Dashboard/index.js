import React, { Component } from 'react';
import Image from '../Image';
import './dashboard.css';

export default class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      page: 1,
      totalPages: null,
      scrolling: false,
      isLoading: false,
    }
  }

  componentDidMount(){
    this.getMovies();
    this.scrollListener = window.addEventListener('scroll', e => this.handleScroll(e))
  }


  getMovies = () => {
    const { page, movies } = this.state;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=1336424bdd2cae85cdd6731e1b99df87&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
    this.setState({isLoading: true});
    fetch(url)
    .then(res => res.json())
    .then(data => this.setState({ 
      movies : [...movies,...data.results],
      scrolling: false,
      totalPages: data.total_pages,
      isLoading: false,
    }))
  }

  loadMoreMovies = () => {
    this.setState({
      page: this.state.page + 1,
      scrolling: true
    }, this.getMovies)
  }

  handleScroll = () => {
    const { scrolling, totalPages, page } = this.state;
    if(scrolling) return;
    if(totalPages <= page) return;
    const lastImg = document.querySelector('.images-wrap > img:last-child');
    const lastImgOffset = lastImg.offsetTop + lastImg.clientHeight;
    const pageOffSet = window.pageYOffset + window.innerHeight;
    let bottomOffset = 100;
    if(pageOffSet > lastImgOffset - bottomOffset) this.loadMoreMovies();
  }

  render() {
    return (
      <div className="images-wrap">
        {
          this.state.movies.map(movie => {
          const imgsrc = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
          return <Image key={movie.id} src={imgsrc}/>
          }) 
        }
      </div>
    )
  }
}
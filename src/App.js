import React, { Component } from "react";
import "./App.css";
import MovieRow from './MovieRow';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchBarEmpty: true }
    this.searchChangeHandler = this.searchChangeHandler.bind(this)
    //this.performSearch("Marvel")
    this.getNowPlaying();
  }

  getNowPlaying() {
    console.log("getInTheaters");
    const urlString = "https://api.themoviedb.org/3/movie/now_playing?api_key=5e55161893d5f96ea5d0eb94907d2d44&language=en-US&page=1";

    $.ajax({
      url: urlString,
      success: (nowPlaying) => {
        console.log(`Fetched getNowPlaying Successfully`, nowPlaying);
        const results = nowPlaying.results;
        var movieRows = []

        results.forEach(movie => {
          // console.log(movie.title);
          const movieRow = <MovieRow key={movie.id} movie={movie} />
          movieRows.push(movieRow);
        });
        this.setState({ rows: movieRows })

      },
      error: (xhr, status, err) => {
        console.log("failed to fetch Now Playing", err);
      }
    })
  }
  performSearch(searchTerm) {
    console.log("perform search in moviedb");

    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=5e55161893d5f96ea5d0eb94907d2d44&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("fetched data successfully", searchResults);
        const results = searchResults.results

        var movieRows = []

        results.forEach(movie => {
          // console.log(movie.title);
          const movieRow = <MovieRow key={movie.id} movie={movie} />
          movieRows.push(movieRow);
        });

        this.setState({ rows: movieRows })

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data", err);
      }


    })
  }

  searchChangeHandler(e) {
    console.log(e.target.value);
    const searchTerm = e.target.value;
    window.scrollTo(0, 0);
    if (searchTerm === "") {
      this.setState({ searchBarEmpty: true })
      console.log(this.state.searchBarEmpty);
      this.getNowPlaying()
    } else {
      this.setState({ searchBarEmpty: false });
      console.log(this.state.searchBarEmpty);
      this.performSearch(searchTerm)
    }

  }

  render() {
    return (
      <div className="App">
        <div className="stickyTop">
          <header>
            <img src="CA-Logo.png" alt="App Icon" />
            <div className="title"><h3>MoviesDB Search</h3></div>
          </header>
          <input className="searchInput" onChange={this.searchChangeHandler} type="text" placeholder="Enter Movie Title" />
        </div>

        <div className="Body">
          {this.state.searchBarEmpty && <h3 className="nowPlaying"> In Theaters Now </h3>}

          <div className="Results">
            {this.state.rows}
          </div>

        </div>



      </div >


    );
  }
}

export default App;

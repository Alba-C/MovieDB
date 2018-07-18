import React from 'react'

class MovieRow extends React.Component {

  viewMovie() {
    console.log(this.props.movie.title);
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
    window.open(url, "_blank");
  }
  render() {
    const posterURl = "https://image.tmdb.org/t/p/w400/"
    return (
      <div className="ResultRow">
        <div className="posterImg" width="150px">
          <img width="150px" src={posterURl + this.props.movie.poster_path} alt="poster" />
        </div>
        <div className="movieDetails">
          <h3>{this.props.movie.title}</h3>
          <p>{this.props.movie.overview}</p>
          <input className="btnView" type="button"
            // onMouseOver={this.styles.button.color = "red"}
            onClick={this.viewMovie.bind(this)} target="_blank" value="View" />
        </div>

      </div>
    )
  }
}

export default MovieRow
import React, { Component } from 'react';
import '../css/SearchBar.css';


class SearchBar extends Component {
    render() {
        return(
            <div className="barContainer">
                <input 
                    className="searchBar"
                    placeholder={"Search for a Song, Lyrics and More | 노래 제목, 가사 검색"}
                />
                <i className="fas fa-search"></i>
            </div>
        )
    }
}

export default SearchBar
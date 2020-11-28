import React, { Component } from 'react';
import '../css/Logo.css';
import WallPaper from '../../assets/home_wallpaper.jpg'

class Logo extends Component {
    render() {
        return(
            <div className="main"> 
                <h1 className="titleText">LYRICAL</h1>
                <img src={WallPaper}>
                     {/* <h1 className="main">Lyrical</h1> */}
                </img>
            </div>
        )
    }
}

export default Logo
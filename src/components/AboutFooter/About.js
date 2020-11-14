import React, { Component } from 'react';
import '../css/About.css';

class About extends Component {
    render() {
        return(
            <div className="aboutContainer"> 
                <div className="aboutTextContainer">
                    <h1 className="aboutText">LYRICAL</h1>
                    <p className="aboutTextSub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    <br/>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    <br/>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
                <div className="miscTextContainer">
                    <p className="miscText">
                        <span style={{fontWeight: 'bold'}}>Contact:</span> jooyoung@lyrical.com
                    </p>
                    <p className="termsText">© 2020 Lyrical Inc.</p>
                </div>
                <div className="iconsContainer">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-youtube"></i>
                </div>
            </div>
        )
    }
}

export default About
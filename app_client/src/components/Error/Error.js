import React, {Component} from "react";
import './Error.css'
class Error extends Component {

    render() {
        return (
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>4<span></span>4</h1>
                        </div>
                        <h2>Oops! Page Not Be Found</h2>
                        <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is
                            temporarily unavailable</p>
                        <a href="/">Back to homepage</a>
                    </div>
                </div>
        );
    }
}

export default Error;
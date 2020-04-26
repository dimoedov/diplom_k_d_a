import React, {Component} from "react";
import './Error.css'
class Error extends Component {

    render() {
        return (
            <div className="er_404">
                <div className="content">
                    <a href="/">Перейти к главной странице</a>
                </div>
            </div>
        );
    }
}

export default Error;
import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class Signout extends Component {
    constructor(props) {
        super(props);
        this.state= {
            serverOtvet: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        fetch('/api/signout').then(res => res.json())
            .then(data => this.setState({serverOtvet: data}))
            .catch(err => console.log("err: =" + err));
    };

    render() {
        if (this.state.serverOtvet.success) {
            localStorage.clear();
            window.location.assign('http://localhost:3000/');
        }
        if (get_cookie('Authorized') === null){
            return <Redirect to="/" />;
        }else {
                return (
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <h1 className='text-danger'>Вы уверены что хотете выйти?</h1>
                    <div className='row'>
                        <div className='col-lg-5'>
                           <button type="button " className="flex-column btn btn-primary btn-danger text-white btn-lg btn-block" onSubmit={this.handleSubmit}>Да</button>
                        </div>
                        <div className='col-lg-5'>
                            <Link  to='/'><button type="button " className="flex-column btn btn-primary btn-success text-white btn-lg btn-block">Нет</button></Link>
                        </div>
                    </div>
                    </form>
                )
            }
        }

}
export default Signout;
import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

const get_cookie = ( cookie_name ) =>
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class Add_users extends Component{
    constructor(props) {
        super(props);
        this.state= {
            last_name: '',
            name: '',
            middle_name: '',
            username: '',
            password: '',
            position: '',
            serverOtvet: ''
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };
    handleSubmit = (e) =>{
        e.preventDefault();
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({serverOtvet: data}))
            .catch(err => console.log("err: =" + err));
    };
    render() {
        if (get_cookie('Authorized') === null){
            return <Redirect to="/404" />;
        }else
        if (this.state.serverOtvet.success){
            return (<Redirect to="/Users"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1  className='text-center text-dark'>Добавление пользователя</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="last_name" className='col-sm-3'>Фамилия</label>
                                <input type="text" required className="form-control col-sm-8" name="last_name"
                                       placeholder="Фамилия"
                                       value={this.state.last_name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="name" className='col-sm-3'>Имя </label>
                                <input type="text" required className="form-control col-sm-8" name="name"
                                       placeholder="Имя"
                                       value={this.state.name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="middle_name" className='col-sm-3'>Отчество</label>
                                <input type="text" required className="form-control col-sm-8" name="middle_name"
                                       placeholder="Отчество"
                                       value={this.state.middle_name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="username" className='col-sm-3'>Имя пользователя</label>
                                <input type="text" required className="form-control col-sm-8" name="username"
                                       placeholder="username"
                                       value={this.state.username}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="password" className='col-sm-3'>Пароль</label>
                                <input type="password" required className="form-control col-sm-8" name="password"
                                       placeholder="Пароль"
                                       value={this.state.password}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="position" className='col-sm-3'>Должность</label>
                                <input type="text" required className="form-control col-sm-8" name="position"
                                       placeholder="Должность"
                                       value={this.state.position}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <input type="submit" className="btn btn-primary btn-dark" onSubmit={this.handleSubmit}
                                   value='Отправить'/>
                        </form>
                    </div>
                </div>

            );
        }
    }

}
export default Add_users;

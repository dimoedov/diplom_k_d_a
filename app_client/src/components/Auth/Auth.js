import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Auth extends Component{
    constructor(props) {
        super(props);
        this.state= {
            username: '',
            password: '',
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
        fetch('/api/signin/', {
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
        if (this.state.serverOtvet.success){
            return window.location.assign('http://localhost:3000/Personal/');
            // return (
            //     <div data-testid={'greeting-text'}>
            //         ваш токен {this.state.serverOtvet}
            //     </div>
            // )
        }else {
            return (
                <div>
                    <div>
                        <h1 className='text-center text-dark'>Вход</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group`}>
                                <label htmlFor="username">Username:</label>
                                <input type="username" data-testid={'username'}  required className="form-control" name="username"
                                       placeholder="username"
                                       value={this.state.username}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group`}>
                                <label htmlFor="password">Password:</label>
                                <input type="password" data-testid={'password'} required className="form-control" name="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <input type="submit" className="btn btn-primary btn-dark" onSubmit={this.handleSubmit}
                                   value='Отправить'/>
                        </form>
                    </div>
                    <div className='text-center'>
                        <Link to='/Register'> Нет аккаунта? Зарегистрируйтесь :)</Link>
                    </div>
                </div>

            );
        }
    }
}

export default Auth;
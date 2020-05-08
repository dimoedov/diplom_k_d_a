import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class Add_price extends Component{
    constructor(props) {
        super(props);
        this.state= {
            name: '',
            price: '',
            dostyp: true,
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
        fetch('/api/service', {
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
            return <Redirect to="/" />;
        }else
        if (this.state.serverOtvet.success){
            return (<Redirect to="/Price"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1  className='text-center text-dark'>Добавление услуги</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group input-group`}>
                                <label htmlFor="name" className='col-sm-3'>Наименование услуги </label>
                                <input type="text" required className="form-control col-sm-8" name="name"
                                       placeholder="Услуга"
                                       value={this.state.name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="price" className='col-sm-3'>Цена</label>
                                <input type="number" required className="form-control col-sm-8" name="price"
                                       placeholder="Цена услуги"
                                       value={this.state.price}
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
export default Add_price;

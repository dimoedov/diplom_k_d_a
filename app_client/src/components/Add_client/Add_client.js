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

class Add_client extends Component{
    constructor(props) {
        super(props);
        this.state= {
            name: '',
            type: 'Физическое лицо',
            contacts: '',

            serverOtvet: ''
        }
    }
    handleChange = (e) => {
        this.setState({type: e.target.value});
    };
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
        fetch('/api/clients', {
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
            return (<Redirect to="/Clients"/>);
        }else {
            if ((localStorage.getItem('position') !== 'Администратор') && (localStorage.getItem('position') !== 'Директор')){
                return (<Redirect to="/Clients"/>);
            }else
            return (
                <div>
                    <div>
                        <h1  className='text-center text-dark'>Добавление клиента</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group input-group row`}>
                                <label htmlFor="type" className='col-sm-3'>Тип</label>
                                <select className="form-control col-sm-8" defaultValue={this.state.kind_of_work} onChange={this.handleChange}>
                                    <option value="Физическое лицо">Физическое лицо</option>
                                    <option value="Компания">Компания</option>
                                </select>
                            </div>
                            <div className={`form-group input-group row`}>
                                <label htmlFor="name" className='col-sm-3'>ФИО / Название компании </label>
                                <input type="text" required className="form-control col-sm-8" name="name"
                                       placeholder="ФИО / Название компании"
                                       value={this.state.name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group row`}>
                                <label htmlFor="contacts" className='col-sm-3'>Контактные данные</label>
                                <input type="text" required className="form-control col-sm-8" name="contacts"
                                       placeholder="Контакты"
                                       value={this.state.contacts}
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
export default Add_client;

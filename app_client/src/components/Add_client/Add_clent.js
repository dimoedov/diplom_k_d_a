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

class Add_clent extends Component{
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
                        <h1  className='text-center text-dark'>Добавление услуги</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group input-group`}>
                                <label htmlFor="type">Тип</label><pre>            </pre>
                                <select className="form-control" defaultValue={this.state.kind_of_work} onChange={this.handleChange}>
                                    <option value="Физическое лицо">Физическое лицо</option>
                                    <option value="Компания">Компания</option>
                                </select>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="name">ФИО / Название компании </label><pre>   </pre>
                                <input type="text" required className="form-control" name="name"
                                       placeholder="ФИО / Название компании"
                                       value={this.state.name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="contacts">Контактные данные</label><pre>              </pre>
                                <input type="text" required className="form-control" name="contacts"
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
export default Add_clent;

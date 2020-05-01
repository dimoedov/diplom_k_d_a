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

class Personal extends Component{
    constructor(props) {
        super(props);
        this.state= {
            kind_of_work: 'Диагностика',
            service: '',
            engineer: '',
            customer: '',
            price: '',
            serverOtvet: ''
        }
    }
    handleChange = (e) => {
        this.setState({kind_of_work: e.target.value});
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
        fetch('/api/carfix', {
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
            return (<Redirect to="/FormList"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1  className='text-center text-dark'>Добавление услуги</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group input-group`}>
                                <label htmlFor="kind_of_work">Вид работы</label><pre>            </pre>
                                <select className="form-control" defaultValue={this.state.kind_of_work} onChange={this.handleChange}>
                                    <option value="Диагностика">Диагностика</option>
                                    <option value="Слесарный ремонт">Слесарный ремонт</option>
                                    <option value="Кузовной ремонт">Кузовной ремонт</option>
                                    <option value="Шиномонтаж">Шиномонтаж</option>
                                    <option value="Автомойка">Автомойка</option>
                                    <option value="Запчасти">Запчасти</option>
                                </select>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="service">Наименование услуги </label><pre>   </pre>
                                <input type="text" required className="form-control" name="service"
                                       placeholder="Услуга"
                                       value={this.state.service}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="engineer">Работник</label><pre>              </pre>
                                <input type="text" required className="form-control" name="engineer"
                                       placeholder="ФИО работника"
                                       value={this.state.engineer}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="price">Цена</label><pre>                  </pre>
                                <input type="number" required className="form-control" name="price"
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
export default Personal;

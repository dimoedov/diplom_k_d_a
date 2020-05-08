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

class Add_object extends Component{
    constructor(props) {
        super(props);
        this.state= {
            name: '',
            date_start: '',
            engineer: '',
            company: '',
            project: '',
            call: '',
            etc: '',
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
        fetch('/api/objects', {
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
            return (<Redirect to="/Objects"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1  className='text-center text-dark'>Добавление Объекта обслуживания</h1>
                    </div>
                    <div>
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="name" className='col-sm-3'>Наименование</label>
                                <input type="text" required className="form-control col-sm-8" name="name"
                                       placeholder="Наименование"
                                       value={this.state.name}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="date_start" className='col-sm-3'>Дата постройки</label>
                                <input type="date" required className="form-control col-sm-8" name="date_start"
                                       value={this.state.date_start}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="company" className='col-sm-3'>Компания</label>
                                <input type="text" required className="form-control col-sm-8" name="company"
                                       placeholder="Компания"
                                       value={this.state.company}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="project" className='col-sm-3'>Проект</label>
                                <input type="text" required className="form-control col-sm-8" name="project"
                                       placeholder="Проект"
                                       value={this.state.project}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="call" className='col-sm-3'>Позывной</label>
                                <input type="text" required className="form-control col-sm-8" name="call"
                                       placeholder="Позывной"
                                       value={this.state.call}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group row input-group`}>
                                <label htmlFor="etc" className='col-sm-3'>Примечание</label>
                                <input type="text" className="form-control col-sm-8" name="etc"
                                       placeholder="примечание"
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
export default Add_object;

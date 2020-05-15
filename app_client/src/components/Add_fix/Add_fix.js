import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import { saveAs } from 'file-saver';
const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};
const d = new Date();
const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

class Add_fix extends Component{
    constructor(props) {
        super(props);
        this.state= {
            service: '',
            object: '',
            client: '',
            dateStart: `${ye}-${mo}-${da}`,
            dateCirca: '',
            dateEnd: '',
            status: 'В обработке',
            etc: '',
            price: '',
            objects_list: null,
            clients_list: null,
            services_list: null,
            selectedOption_objects: null,
            selectedOption_clients: null,
            selectedOption_services: null,
            serverOtvet: ''
        }
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };
    handleChange_objects = selectedOption_objects => {
        this.setState({ selectedOption_objects });
        let formBody=[];
        for (let prop in selectedOption_objects){
            if (prop === 'value')
                formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_objects[prop]));
        }
        formBody = formBody.join("&");
        fetch('/api/objects/list', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({object: data}))
            .catch(err => console.log("err: =" + err));
    };
    handleChange_clients = selectedOption_clients => {
        this.setState({ selectedOption_clients });
        let formBody=[];
        for (let prop in selectedOption_clients){
            if (prop === 'value')
            formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_clients[prop]));
        }
        formBody = formBody.join("&");
        fetch('/api/clients/list', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({client: data}))
            .catch(err => console.log("err: =" + err));
    };
    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    };
    handleChange_services = selectedOption_services => {
        this.setState({ selectedOption_services });
        let formBody=[];
        let formPrice=[];
        for (let prop in selectedOption_services){
            formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_services[prop]['value']));
        }
        formBody = formBody.join("&");
        fetch('/api/service/list', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(res => res.json())
                .then(data => this.setState({service: data}))
                .then(db => {
                    for (let prop in this.state.service){
                        formPrice.push(encodeURIComponent('_id') + "=" + encodeURIComponent(this.state.service[prop]));
                    }
                    formPrice = formPrice.join("&");
                        fetch('/api/fix/price', {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: formPrice
                        }).then(res => res.json())
                            .then(data => this.setState({price: data}))
                }
                )
                .catch(err => console.log("err: =" + err));

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
        fetch('/api/fix', {
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
        const { selectedOption_objects } = this.state;
        const { selectedOption_clients } = this.state;
        const { selectedOption_services } = this.state;
        if (this.state.objects_list === null){
            fetch('/api/objects/list').then(res => res.json())
                .then(data => this.setState({objects_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (this.state.clients_list === null){
            fetch('/api/clients/list').then(res => res.json())
                .then(data => this.setState({clients_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (this.state.services_list === null){
            fetch('/api/service/list').then(res => res.json())
                .then(data => this.setState({services_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (get_cookie('Authorized') === null){
            return <Redirect to="/" />;
        }else
        if (this.state.serverOtvet.success){
            localStorage.setItem('fix_id',this.state.serverOtvet._id);
            return (<Redirect to="/Get_check"/>);
        }else {
            return (
                <div>
                    <div>
                        <h1  className='text-center text-dark'>Добавление услуги</h1>
                    </div>
                    <div>
                        <form id='divToPrint' className="form-horizontal" onSubmit={this.handleSubmit}>
                            <div className={`form-group input-group`}>
                                <label htmlFor="service" className='col-sm-3'>Вид услуги </label>
                                <Select
                                    className='col-sm-8'
                                    placeholder="Выберете услуги"
                                    value={selectedOption_services}
                                    onChange={this.handleChange_services}
                                    options={this.state.services_list}
                                    isMulti={true}
                                />
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="object" className='col-sm-3'>Объект обслуживания </label>
                                   <Select
                                        className='col-sm-8'
                                        placeholder="Выберите объект"
                                        value={selectedOption_objects}
                                        onChange={this.handleChange_objects}
                                        options={this.state.objects_list}
                                    />
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="client" className='col-sm-3'>Клиент </label>
                                   <Select
                                        className='col-sm-8'
                                        placeholder="Выберите клиента"
                                        value={selectedOption_clients}
                                        onChange={this.handleChange_clients}
                                        options={this.state.clients_list}
                                    />
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="dateStart" className='col-sm-3'>Дата начала работ</label>
                                <input type="date" required className="form-control col-sm-8" name="dateStart"
                                       value={this.state.dateStart}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="dateEnd" className='col-sm-3'>Примерное время выполнения работ</label>
                                <input type="text" required className="form-control col-sm-8" name="dateCirca"
                                       placeholder="Пример 1 месяц(день, час, год)"
                                       value={this.state.dateCirca}
                                       onChange={this.handleUserInput}/>
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="price" className='col-sm-3'>Цена</label>
                                <input type="number" required className="form-control col-sm-8" name="price"
                                       placeholder="price"
                                       value={this.state.price}
                                       disabled
                                       />
                            </div>
                            <div className={`form-group input-group`}>
                                <label htmlFor="etc" className='col-sm-3'>Примечание</label>
                                <input type="text" className="form-control col-sm-8" name="etc"
                                       placeholder="Примечание"
                                       value={this.state.etc}
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
export default Add_fix;

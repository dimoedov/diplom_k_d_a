import React, {Component} from 'react';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Type} from "react-bootstrap-table2-editor"
import Select from "react-select";
import './Fix_all.css'

const regExpStatus =/(^[А-ЯA-Z]{1} [а-яa-z]{1,}$)|(^[А-ЯA-Z]{1} [А-ЯA-Z]{1}[а-яa-z]{1,}$)|(^[А-ЯA-Z]{1}[а-яa-z]{1,} [А-ЯA-Z]{1}[а-яa-z]{1,}$)|(^[А-ЯA-Z]{1}[а-яa-z]{1,} [а-яa-z]{1,}$)/;
const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class MYSELECT_SERVICES extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            _id: '',
            service: '',
            price: '',
            status: '',
            services_list: null,
            selectedOption_services: [],
            serverOtvet: ''
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/fix/upgrade', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data =>  window.location.assign('http://localhost:3000/All_fix/'))
            .catch(err => console.log("err: =" + err));
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

    render() {
        let data_services = this.props.value.split("\n");
        const {selectedOption_services} = this.state;
        if (this.state.services_list === null) {
            fetch('/api/service/list').then(res => res.json())
                .then(data => this.setState({services_list: data}))
                .catch(err => console.log("err: =" + err));
            let formBody=[];
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
                .then(di => this.setState({_id: this.props._id}))
                .catch(err => console.log("err: =" + err));
        }
        if (this.state.selectedOption_services.length === 0) {
            for (let i in data_services) {
                this.state.selectedOption_services.push({
                    value: data_services[i],
                    label: data_services[i]
                })
            }
        }
        return (
            <div>
                <Select
                    placeholder="Выберете услуги"
                    value={selectedOption_services}
                    onChange={this.handleChange_services}
                    options={this.state.services_list}
                    isMulti={true}
                />
                <button onClick={this.handleSubmit}>Изменить</button>
            </div>

        )
    }

}

class MYSELECT_OBJECTS extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            _id: '',
            object: '',
            status: '',
            objects_list: null,
            selectedOption_objects: [],
            serverOtvet: ''
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/fix/upgrade', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data =>  window.location.assign('http://localhost:3000/All_fix/'))
            .catch(err => console.log("err: =" + err));
    };

    handleChange_objects = selectedOption_objects => {
        this.setState({ selectedOption_objects });
        console.log(selectedOption_objects);
        let formBody=[];
        for (let prop in selectedOption_objects){
            formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_objects[prop]['value']));
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

    render() {
        let data_objects = this.props.value.split("\n");
        const {selectedOption_objects} = this.state;
        if (this.state.objects_list === null) {
            fetch('/api/objects/list').then(res => res.json())
                .then(data => this.setState({objects_list: data}))
                .catch(err => console.log("err: =" + err));
            let formBody=[];
            for (let prop in selectedOption_objects){
                formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_objects[prop]['value']));
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
                .then(di => this.setState({_id: this.props._id}))
                .catch(err => console.log("err: =" + err));
        }
        if (this.state.selectedOption_objects.length === 0) {
            for (let i in data_objects) {
                this.state.selectedOption_objects.push({
                    value: data_objects[i],
                    label: data_objects[i]
                })
            }
        }
        return (
            <div>
                <Select
                    placeholder="Выберете объект"
                    value={selectedOption_objects}
                    onChange={this.handleChange_objects}
                    options={this.state.objects_list}
                    isMulti={false}
                />
                <button onClick={this.handleSubmit}>Изменить</button>
            </div>

        )
    }
}

class MYSELECT_CLIENTS extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            _id: '',
            client: '',
            status: '',
            clients_list: null,
            selectedOption_clients: [],
            serverOtvet: ''
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/fix/upgrade', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data =>  window.location.assign('http://localhost:3000/All_fix/'))
            .catch(err => console.log("err: =" + err));
    };

    handleChange_clients = selectedOption_clients => {
        this.setState({ selectedOption_clients });
        console.log(selectedOption_clients);
        let formBody=[];
        for (let prop in selectedOption_clients){
            formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_clients[prop]['value']));
        }
        formBody = formBody.join("&");
        fetch('/api/clients/list', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({object: data}))
            .catch(err => console.log("err: =" + err));
    };

    render() {
        let data_clients = this.props.value.split("\n");
        const {selectedOption_clients} = this.state;
        if (this.state.clients_list === null) {
            fetch('/api/clients/list').then(res => res.json())
                .then(data => this.setState({clients_list: data}))
                .catch(err => console.log("err: =" + err));
            let formBody=[];
            for (let prop in selectedOption_clients){
                formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_clients[prop]['value']));
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
                .then(di => this.setState({_id: this.props._id}))
                .catch(err => console.log("err: =" + err));
        }
        if (this.state.selectedOption_clients.length === 0) {
            for (let i in data_clients) {
                this.state.selectedOption_clients.push({
                    value: data_clients[i],
                    label: data_clients[i]
                })
            }
        }
        return (
            <div>
                <Select
                    placeholder="Выберете объект"
                    value={selectedOption_clients}
                    onChange={this.handleChange_clients}
                    options={this.state.clients_list}
                    isMulti={false}
                />
                <button onClick={this.handleSubmit}>Изменить</button>
            </div>

        )
    }
}

let formBody = [];
class Fix_all extends Component{
    state = {

        serverOtvet: '',
        products: [],
        columns: [
            {
                dataField: '_id',
                isKey: true,
                hidden: true
            },
            {
                dataField: 'master',
                text: 'ФИО мастера',
                editable: false,
                sort: true,
                selected: false,
            },
            {
                dataField: 'service',
                text: 'Вид услуги',
                sort: true,
                selected: false,
                editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                    <MYSELECT_SERVICES value={value} _id = {row._id}/>
                )
            },
            {
                dataField: 'object',
                text: 'Объект обслуживания',
                sort: true,
                selected: false,
                editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                    <MYSELECT_OBJECTS value = {value} _id = {row._id}/>
                )
            },
            {
                dataField: 'client',
                text: 'Клиент',
                sort: true,
                selected: false,
                editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
                    <MYSELECT_CLIENTS value = {value} _id = {row._id}/>
                )
            },
            {
                dataField: 'dateStart',
                text: 'Дата начала',
                sort: true,
                selected: false,
                editor: {
                    type: Type.DATE,
                },
                validator: (newValue, row, column) => {
                    formBody = [];
                    for (let prop in row) {
                        if (prop === 'dateStart'){
                            if (prop === column.dataField){
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(newValue);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }else {
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(row[prop]);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }
                        }
                        if (prop === '_id'){
                            if (prop === column.dataField){
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(newValue);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }else {
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(row[prop]);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }
                        }

                    }
                    formBody = formBody.join("&");
                    fetch('/api/fix/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/all_fix/'))
                        .catch(err => console.log("err: =" + err));

                },
            },
            {
                dataField: 'dateCirca',
                text: 'Примерная дата выполнения',
                sort: true,
                selected: false,
                editable: false
            },
            {
                dataField: 'dateEnd',
                text: 'Дата окончания',
                sort: true,
                selected: false,
                editor: {
                    type: Type.DATE,
                },
                validator: (newValue, row, column) => {
                    formBody = [];
                    for (let prop in row) {
                        if (prop === 'dateEnd'){
                            if (prop === column.dataField){
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(newValue);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }else {
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(row[prop]);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }
                        }
                        if (prop === '_id'){
                            if (prop === column.dataField){
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(newValue);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }else {
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(row[prop]);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }
                        }

                    }
                    formBody = formBody.join("&");
                    fetch('/api/fix/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/all_fix/'))
                        .catch(err => console.log("err: =" + err));

                },
            },
            {
                dataField: 'price',
                text: 'Цена',
                editable: false,
                sort: true,
                selected: false,
            },
            {
                dataField: 'status',
                text: 'Статус услуги',
                sort: true,
                selected: false,
                validator: (newValue, row, column) => {
                    if (!regExpStatus.test(newValue)) {
                        return {
                            valid: false,
                            message: 'Не правильно введён статус'
                        };
                    }
                    formBody = [];
                    for (let prop in row) {
                        if (prop === 'status'){
                            if (prop === column.dataField){
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(newValue);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }else {
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(row[prop]);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }
                        }
                        if (prop === '_id'){
                            if (prop === column.dataField){
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(newValue);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }else {
                                let encodedKey = encodeURIComponent(prop);
                                let encodedValue = encodeURIComponent(row[prop]);
                                formBody.push(encodedKey + "=" + encodedValue);
                            }
                        }

                    }
                    formBody = formBody.join("&");
                    fetch('/api/fix/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/all_fix/'))
                        .catch(err => console.log("err: =" + err));
                    return true;
                },
            },
            {
                dataField: 'etc',
                text: 'Примечание',
                editable: false,
                sort: true,
                selected: false,
            },

        ],
        selected: []
    };
    componentDidMount() {
        fetch('/api/fix/all').then(res => res.json())
            .then(data => this.setState({products: data}))
    };
    render() {

        if (this.state.clients_list === null){
            fetch('/api/clients/list').then(res => res.json())
                .then(data => this.setState({clients_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        if (get_cookie('Authorized') !== null) {
            if (localStorage.getItem('position') === 'Администратор'){
                return (
                    <div className="container" style={{marginTop: 50}}>
                        <div>
                            <ToolkitProvider
                                keyField={'_id'}
                                data={this.state.products}
                                columns={this.state.columns}
                            >
                                {
                                    props => (
                                        <div>
                                            <hr/>
                                            <BootstrapTable
                                                onDataSizeChange={this.handleDataChange}
                                                keyField={'_id'}
                                                data={this.state.products}
                                                columns={this.state.columns}
                                                filter={filterFactory()}
                                                cellEdit={
                                                    cellEditFactory({
                                                        mode: 'dbclick',
                                                        blurToSave: true,
                                                    })
                                                }
                                                pagination={paginationFactory()}
                                                hover
                                                tabIndexCell
                                                bordered={false}
                                                noDataIndication="Нет услуг"

                                                {...props.baseProps}
                                            />
                                        </div>
                                    )
                                }
                            </ToolkitProvider>
                        </div>


                    </div>
                );
            }else{
                return (
                    <div className="container" style={{marginTop: 50}}>
                        <div>
                            <ToolkitProvider
                                keyField={'_id'}
                                data={this.state.products}
                                columns={this.state.columns}
                            >
                                {
                                    props => (
                                        <div>
                                            <hr/>
                                            <BootstrapTable
                                                onDataSizeChange={this.handleDataChange}
                                                keyField={'_id'}
                                                data={this.state.products}
                                                columns={this.state.columns}
                                                filter={filterFactory()}
                                                pagination={paginationFactory()}
                                                hover
                                                tabIndexCell
                                                bordered={false}
                                                noDataIndication="Нет услуг"

                                                {...props.baseProps}
                                            />

                                        </div>
                                    )
                                }
                            </ToolkitProvider>
                        </div>


                    </div>
                );
            }

        }
    }
}

export default  Fix_all
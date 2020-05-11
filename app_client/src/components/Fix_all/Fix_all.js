import React, {Component} from 'react';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Type} from "react-bootstrap-table2-editor"
import Select from "react-select";
import './Fix_all.css'

const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class MySelect_services extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            _id: '',
            service: '',
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
        console.log(selectedOption_services);
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

class MySelect_objects extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            service: '',
            object: '',
            client: '',
            dateEnd: '',
            status: '',
            objects_list: null,
            clients_list: null,
            services_list: null,
            selectedOption_objects: null,
            selectedOption_clients: null,
            selectedOption_services: null,
            serverOtvet: ''
        }
    }

    handleChange_services = selectedOption_services => {
        this.setState({ selectedOption_services });
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
            .catch(err => console.log("err: =" + err));
    };
    render(){
        const { selectedOption_services } = this.state;
        if (this.state.services_list === null){
            fetch('/api/service/list').then(res => res.json())
                .then(data => this.setState({services_list: data}))
                .catch(err => console.log("err: =" + err));
        }

        return (
            <Select
                className='col-sm-8'
                placeholder="Выберете услуги"
                value={selectedOption_services}
                onChange={this.handleChange_services}
                options={this.state.services_list}
                isMulti={true}
            />
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
                        <MySelect_services value = {value} _id = {row._id}/>
                        )
            },
            {
                dataField: 'object',
                text: 'Объект обслуживания',
                sort: true,
                selected: false,
            },
            {
                dataField: 'client',
                text: 'Клиент',
                sort: true,
                selected: false,
            },
            {
                dataField: 'dateStart',
                text: 'Дата начала',
                sort: true,
                selected: false,
                editor: {
                    type: Type.DATE,
                }
            },
            {
                dataField: 'dateEnd',
                text: 'Дата окончания',
                sort: true,
                selected: false,
                editor: {
                    type: Type.DATE,
                }
            },
            {
                dataField: 'status',
                text: 'Статус услуги',
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
    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
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
                                            <h5>Row Count:<span className="badge">{this.state.rowCount}</span></h5>
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
                                            <h5>Row Count:<span className="badge">{this.state.rowCount}</span></h5>
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
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";

// eslint-disable-next-line
const regExpContact = /(^[\w-\.]+@[\w-]+\.[a-z]{2,4}$)|(^\d[\d\(\)\ -]{4,14}\d$)/i;

const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};
const MyExportCSV = (props) => {
    const handleClick = () => {
        props.onExport();
    };
    return (
        <div>
            <button className="btn btn-success btn-group" onClick={ handleClick }>Export to CSV</button>
        </div>
    );
};

let formBody = [];
class Client extends Component{

    state = {
        serverOtvet: '',
        products: [],
        NonSelectable: [],
        columns: [
            {
                dataField: '_id',
                isKey: true,
                text: 'Номер услуги',
                hidden: true
            },
            {
                dataField: 'current_master_id',
                hidden: true
            },
            {
                dataField: 'name',
                text: 'Название / ФИО',
                sort: true,
                selected: false,
                editor: {
                    type: Type.TEXTAREA,
                },
                validator: (newValue, row, column) => {
                    if (localStorage.getItem('position') !== 'Администратор'){
                        if (row.current_master_id !== get_cookie('id').split('"')[1]){
                            return {
                                valid: false,
                                message: 'У вас нет прав на изменение данной строки'
                            }
                        }
                    }
                    formBody = [];
                    for (let prop in row) {
                        if (prop === 'name'){
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
                    fetch('/api/clients/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/clients'))
                        .catch(err => this.setState({serverOtvet: err}));
                    return true;
                }
            },
            {
                dataField: 'type',
                text: 'Тип',
                sort: true,
                selected: false,
                editor:{
                    type: Type.SELECT,
                    options: [{
                        value: 'Физическое лицо',
                        label: 'Физическое лицо'
                    }, {
                        value: 'Компания',
                        label: 'Компания'
                    }]
                },
                validator: (newValue, row, column) => {
                    if (localStorage.getItem('position') !== 'Администратор'){
                        if (row.current_master_id !== get_cookie('id').split('"')[1]){
                            return {
                                valid: false,
                                message: 'У вас нет прав на изменение данной строки'
                            }
                        }
                    }
                    formBody = [];
                    for (let prop in row) {
                        if (prop === 'type'){
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
                    fetch('/api/clients/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/clients'))
                        .catch(err => this.setState({serverOtvet: err}));
                    return true;
                }
            },
            {
                dataField: 'contacts',
                text: 'Контакные данные',
                sort: true,
                selected: false,
                validator: (newValue, row, column) => {
                    if (localStorage.getItem('position') !== 'Администратор'){
                        if (row.current_master_id !== get_cookie('id').split('"')[1]){
                            return {
                                valid: false,
                                message: 'У вас нет прав на изменение данной строки'
                            }
                        }
                    }
                    if (!regExpContact.test(newValue)) {
                        return {
                            valid: false,
                            message: 'Поле принимает только номер телефона или почту'
                        };
                    }
                    formBody = [];
                    for (let prop in row) {
                        if (prop === 'contacts'){
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
                    fetch('/api/clients/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/clients'))
                        .catch(err => this.setState({serverOtvet: err}));
                    return true;
                }
            }],
        selected: []
    };
    componentDidMount() {
        fetch('/api/clients').then(res => res.json())
            .then(data => this.setState({products: data}))
            .then(db => {
                if (localStorage.getItem('position') !== 'Администратор'){
                    let non_select = [];
                    for (let prop in this.state.products){
                        if (this.state.products[prop].current_master_id !== get_cookie('id').split('"')[1]){
                            non_select.push(this.state.products[prop]._id)
                        }
                    }
                    this.setState({NonSelectable : non_select})
                }
            })
            .catch(err => console.log("err: =" + err));
    };
    handleGetSelectedData = () => {
        if (window.confirm('Вы действительно хотите удалить?')){
            let formBody = [];
            for (let prop in this.state) {
                let encodedKey = encodeURIComponent(prop);
                let encodedValue = encodeURIComponent(this.state[prop]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch('/api/clients/delete/'+this.state.selected, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .catch(err => console.log("err: =" + err))
                .then(del =>  window.location.assign('http://localhost:3000/clients'));
        }

    };
    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    };
    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row._id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row._id)
            }));
        }
    };

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r._id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids
            }));
        } else {
            this.setState(() => ({
                selected: [0,]
            }));
        }
    };
    render() {
        const selectRow = {
            mode: 'checkbox',
            clickToSelect: false,
            bgColor: '#8f0008',
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            nonSelectable: this.state.NonSelectable,
            onSelectAll: this.handleOnSelectAll,
            headerColumnStyle: (status) => {
                if (status === 'checked') {
                    return {
                        backgroundColor: '#8f0008'
                    };
                } else if (status === 'indeterminate') {
                    return {
                        backgroundColor: 'yellow'
                    };
                } else if (status === 'unchecked') {
                    return {
                        backgroundColor: '#0069d9'
                    };
                }
                return {};
            }
        };
        if (get_cookie('Authorized') === null){
            return (
                <div className="container" style={{ marginTop: 50 }}>
                    <div>
                        <ToolkitProvider
                            keyField={'_id'}
                            data={ this.state.products }
                            columns={ this.state.columns }
                            exportCSV={ {
                                fileName: 'Price_list.csv',
                                separator: "    ",
                                noAutoBOM: false,
                                blobType: 'text/csv; charset = utf-8'
                            } }
                        >
                            {
                                props => (
                                    <div>
                                        <div className='btn-group'>
                                            <MyExportCSV  { ...props.csvProps }>Export</MyExportCSV >
                                        </div>
                                        <hr />
                                        <BootstrapTable
                                            onDataSizeChange={ this.handleDataChange }
                                            keyField={'_id'}
                                            data={ this.state.products }
                                            columns={ this.state.columns }
                                            filter={ filterFactory() }
                                            pagination={ paginationFactory() }
                                            hover
                                            tabIndexCell
                                            bordered={ false }
                                            noDataIndication="Таблица не заполнена, просьба обратиться в контакный центр"

                                            { ...props.baseProps }
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </div>


                </div>
            );
        }else
            return (
                <div className="container" style={{ marginTop: 50 }}>
                    <div>
                        <ToolkitProvider
                            keyField={'_id'}
                            data={ this.state.products }
                            columns={ this.state.columns }
                            exportCSV={ {
                                fileName: 'Price_list.csv',
                                separator: "    ",
                                noAutoBOM: false,
                                blobType: 'text/csv; charset = utf-8'
                            } }
                        >
                            {
                                props => (
                                    <div>
                                        <div className='btn-group'>
                                            <Link to='/add-client'><button className="btn btn-primary btn-group">Добавить</button></Link>
                                            <MyExportCSV  { ...props.csvProps }>Export</MyExportCSV >
                                            <button className="btn btn-secondary btn-group" onClick={ this.handleGetSelectedData }>Удалить отмеченные</button>
                                        </div>
                                        <hr />
                                        <BootstrapTable
                                            onDataSizeChange={ this.handleDataChange }
                                            keyField={'_id'}
                                            data={ this.state.products }
                                            columns={ this.state.columns }
                                            filter={ filterFactory() }
                                            cellEdit={
                                                cellEditFactory({
                                                    mode: 'dbclick',
                                                    blurToSave: true,
                                                })
                                            }
                                            pagination={ paginationFactory() }
                                            selectRow={ selectRow }
                                            hover
                                            tabIndexCell
                                            bordered={ false }
                                            noDataIndication="Клиентов не существует"

                                            { ...props.baseProps }
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

export default  Client
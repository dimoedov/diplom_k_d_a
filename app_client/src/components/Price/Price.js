import React from 'react';
import {Link} from "react-router-dom";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";

const regExpPrice = /^\d+$/;
const regExpName = /(^[А-ЯA-Z]{1}[а-яa-z]{1,14} [А-ЯA-Z]{1}[а-яa-z]{1,14}$)|(^[А-ЯA-Z]{1}[а-яa-z]{1,14} [а-яa-z]{1,14}$)/;

const get_cookie = ( cookie_name ) => {
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
class Price extends React.Component{
    state = {
        serverOtvet: '',
        products: [],
        columns: [
            {
                dataField: '_id',
                isKey: true,
                text: 'Номер услуги',
                sort: true,
                hidden: true,
                selected: false,
            },
            {
                dataField: 'current_master_id',
                hidden: true
            },
            {
                dataField: 'name',
                text: 'Наименование',
                sort: true,
                selected: false,
                validator: (newValue, row, column) => {
                    if ((localStorage.getItem('position') !== 'Администратор') && (get_cookie('Authorized') !== null)){
                        if (row.current_master_id !== get_cookie('id').split('"')[1]){
                            return {
                                valid: false,
                                message: 'У вас нет прав на изменение данной строки'
                            }
                        }
                    }
                    if (!regExpName.test(newValue)) {
                        return {
                            valid: false,
                            message: 'Допускаются только буквы, если слов несколько тогда через пробел'
                        };
                    }
                    formBody = [];
                    for (let prop in row) {
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
                    formBody = formBody.join("&");
                    fetch('/api/service/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/price/'))
                        .catch(err => this.setState({serverOtvet: err}));
                    return true;
                }
            },
            {
                dataField: 'price',
                text: 'цена',
                sort: true,
                selected: false,
                editor:{
                    Type: Type.Number
                },
                validator: (newValue, row, column) => {
                    if ((localStorage.getItem('position') !== 'Администратор') && (get_cookie('Authorized') !== null)){
                        if (row.current_master_id !== get_cookie('id').split('"')[1]){
                            return {
                                valid: false,
                                message: 'У вас нет прав на изменение данной строки'
                            }
                        }
                    }
                    if (!regExpPrice.test(newValue)) {
                        return {
                            valid: false,
                            message: 'Цена должна быть числовой'
                        };
                    }
                    if (newValue < 100) {
                        return {
                            valid: false,
                            message: 'Цена должна быть больше 100'
                        };
                    }
                    formBody = [];
                    for (let prop in row) {
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
                    formBody = formBody.join("&");
                    fetch('/api/service/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/price'))
                        .catch(err => this.setState({serverOtvet: err}));
                    return true;
                }
            },
            {
                dataField: 'dostyp',
                text: 'Доступность',
                sort: true,
                selected: false,
                formatter: (cellContent, row) => {
                    if ((localStorage.getItem('position') !== 'Администратор') && (get_cookie('Authorized') !== null)){
                        if (row.current_master_id !== get_cookie('id').split('"')[1]){
                            return {
                                valid: false,
                                message: 'У вас нет прав на изменение данной строки'
                            }
                        }
                    }
                    if (row.dostyp) {
                        return (
                            <h5>
                                <span className="label label-success"> Доступно</span>
                            </h5>
                        );
                    }
                    return (
                        <h5>
                            <span className="label label-danger"> Нет возможности</span>
                        </h5>
                    );
                },
                editor:{
                    type: Type.SELECT,
                    options: [{
                            value: 'true',
                            label: 'true'
                        }, {
                            value: 'false',
                            label: 'false'
                        }]
                },
                validator: (newValue, row, column) => {
                    formBody = [];
                    for (let prop in row) {
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
                    formBody = formBody.join("&");
                    fetch('/api/service/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/price'))
                        .catch(err => this.setState({serverOtvet: err}));
                    return true;
                }
            }],
        selected: [],
        NonSelectable : []
    };
    componentDidMount() {
        fetch('/api/service').then(res => res.json())
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
            .catch(err => this.setState({serverOtvet: err}));
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
            fetch('/api/service/delete/'+this.state.selected, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .catch(err => this.setState({serverOtvet: err}))
                .then(del =>  window.location.assign('http://localhost:3000/price'));

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
        }else{
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
                                            <Link to='/add-price'><button className="btn btn-primary btn-group">Добавить</button></Link>
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
                                            noDataIndication="Прайс-лис не заполнен"

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
}

export default  Price
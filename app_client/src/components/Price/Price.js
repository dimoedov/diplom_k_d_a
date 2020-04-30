import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";

const regExpPrice = /^\d+$/;
const regExpName = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}\040[\x27а-яa-z]))\040?$/;

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
class Price extends Component{

    state = {
        serverOtvet: '',
        products: [],
        columns: [
            {
                dataField: '_id',
                isKey: true,
                text: 'Номер услуги',
                sort: true,
                selected: false,
            },
            {
                dataField: 'name',
                text: 'Наименование',
                sort: true,
                selected: false,
                validator: (newValue, row, column) => {
                    if (!regExpName.test(newValue)) {
                        return {
                            valid: false,
                            message: 'Услуга вводится без цифр'
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
                        .then(db =>  window.location.assign('http://localhost:3000/Price/'))
                        .catch(err => console.log("err: =" + err));
                    return true;
                }
            },
            {
                dataField: 'price',
                text: 'цена',
                sort: true,
                selected: false,
                validator: (newValue, row, column) => {
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
                        .then(db =>  window.location.assign('http://localhost:3000/Price'))
                        .catch(err => console.log("err: =" + err));
                    return true;
                }
            },
            {
                dataField: 'dostyp',
                text: 'Доступность',
                sort: true,
                selected: false,
                type: Type.CHECKBOX,
                editor:{
                    type: Type.CHECKBOX
                }
            }],
        selected: []
    };
    componentDidMount() {
        fetch('/api/service').then(res => res.json())
            .then(data => this.setState({products: data}))
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
            fetch('/api/service/delete/'+this.state.selected, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .catch(err => console.log("err: =" + err))
                .then(del =>  window.location.assign('http://localhost:3000/Price'));

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
                                        <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
                                        <BootstrapTable
                                            onDataSizeChange={ this.handleDataChange }
                                            keyField={'_id'}
                                            data={ this.state.products }
                                            columns={ this.state.columns }
                                            filter={ filterFactory() }
                                            pagination={ paginationFactory() }
                                            hover
                                            tabIndexCell
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
                                            <Link to='/Personal'><button className="btn btn-primary btn-group">Добавить</button></Link>
                                            <MyExportCSV  { ...props.csvProps }>Export</MyExportCSV >
                                            <button className="btn btn-secondary btn-group" onClick={ this.handleGetSelectedData }>Удалить отмеченные</button>
                                        </div>
                                        <hr />
                                        <h5>Row Count:<span className="badge">{ this.state.rowCount }</span></h5>
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
                                            noDataIndication="Услуг не существует"

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

export default  Price
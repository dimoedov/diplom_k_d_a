import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory  from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Type } from 'react-bootstrap-table2-editor';
import { Link, Redirect } from 'react-router-dom';

const regExpFIO = /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/;
const regExpYsl = /^([a-zа-яё]+)$/i;
const regExpPrice = /^\d+$/;
let formBody = [];
const MyExportCSV = (props) => {
    const handleClick = () => {
        props.onExport();
    };
    return (
        <div>
            <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
        </div>
    );
};

const get_cookie = ( cookie_name ) =>
{
    let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
};

class FormList extends Component {
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
                footer: ''
            },
            {
                dataField: 'kind_of_work',
                text: 'Вид работы',
                editor: {
                    type: Type.SELECT,
                    options: [{
                        value: 'Диагностика',
                        label: 'Диагностика'
                    }, {
                        value: 'Слесарный ремонт',
                        label: 'Слесарный ремонт'
                    }, {
                        value: 'Кузовной ремонт',
                        label: 'Кузовной ремонт'
                    }, {
                        value: 'Шиномонтаж',
                        label: 'Шиномонтаж'
                    }, {
                        value: 'Автомойка',
                        label: 'Автомойка'
                    }, {
                        value: 'Запчасти',
                        label: 'Запчасти'
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
                    fetch('/api/carfix/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        // .then(db =>  window.location.assign('http://localhost:3000/FormList/'))
                        .catch(err => console.log("err: =" + err));

                },
                sort: true,
                selected: false,
                footer: '',


            }, {
                dataField: 'service',
                text: 'Услуга',
                sort: true,
                selected: false,
                validator: (newValue, row, column) => {
                    if (!regExpYsl.test(newValue)) {
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
                    fetch('/api/carfix/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/FormList/'))
                        .catch(err => console.log("err: =" + err));
                    return true;
                },
                footer: ''
            }, {
                dataField: 'engineer',
                text: 'Работник',
                sort: true,
                selected: false,
                validator: (newValue, row, column) => {
                    if (!regExpFIO.test(newValue)) {
                        return {
                            valid: false,
                            message: 'ФИО вводится через пробел без цифр'
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
                    fetch('/api/carfix/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/FormList/'))
                        .catch(err => console.log("err: =" + err));
                    return true;
                },
                footer: 'Общая цена:'
            }, {
                dataField: 'price',
                text: 'Цена услуги',
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
                    fetch('/api/carfix/upgrade', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:formBody
                    }).then(res => res.json())
                        .then(data => this.setState({serverOtvet: data}))
                        .then(db =>  window.location.assign('http://localhost:3000/FormList/'))
                        .catch(err => console.log("err: =" + err));
                    return true;
                },
                footer: columnData => columnData.reduce((acc, item) => parseInt(acc) + parseInt(item), 0)
            }],
        selected: []
    };

    componentDidMount() {
        fetch('/api/carfix').then(res => res.json())
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
            fetch('/api/carfix/delete/'+this.state.selected, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:formBody
            }).then(res => res.json())
                .then(data => this.setState({serverOtvet: data}))
                .catch(err => console.log("err: =" + err))
                .then(del =>  window.location.assign('http://localhost:3000/FormList'));

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
            return <Redirect to="/" />;
        }else
        return (
            <div className="container" style={{ marginTop: 50 }}>
                <div>
                    <ToolkitProvider
                        keyField={'_id'}
                        data={ this.state.products }
                        columns={ this.state.columns }
                        exportCSV={ {
                            fileName: Date()+'.csv',
                            separator: "    ",
                            ignoreFooter: false,
                            noAutoBOM: false,
                            blobType: 'text/csv; charset = utf-8'
                        } }
                    >
                        {
                            props => (
                                <div>
                                    <div className='btn-group'>
                                        <Link to='/Personal'><button className="btn btn-primary">Добавить</button></Link>
                                        <MyExportCSV  { ...props.csvProps }>Export</MyExportCSV >
                                        <button className="btn btn-secondary" onClick={ this.handleGetSelectedData }>Удалить отмеченные</button>
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
                                                // beforeSaveCell,
                                                blurToSave: true,
                                            })
                                        }
                                        pagination={ paginationFactory() }
                                        selectRow={ selectRow }
                                        hover
                                        tabIndexCell
                                        noDataIndication="Table is Empty"

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
//https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Basic%20Table&selectedStory=Indication%20For%20Empty%20Table&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
export default FormList;

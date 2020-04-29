import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";

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
            <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
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
                footer: ''
            },
            {
                dataField: 'kind_of_work',
                text: 'Вид работы',
                sort: true,
            }, {
                dataField: 'service',
                text: 'Услуга',
                sort: true,
            }, {
                dataField: 'engineer',
                text: 'Работник',
                sort: true,
            }, {
                dataField: 'price',
                text: 'Цена услуги',
                sort: true,
                }],
    };

    render() {
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
                                            <Link to='/Personal'><button className="btn btn-primary">Добавить</button></Link>
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

export default  Price
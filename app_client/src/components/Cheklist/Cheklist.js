import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf-with-html2canvas';
import './pdf.css'
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
function priceFormatter(cell, row) {
    return (
        <span>{ cell } Руб.</span>
    );
}
const today = new Date();
class Cheklist extends Component{
    constructor(props) {
        super(props);
        this.state= {
            master: localStorage.getItem('fio'),
            id_new_fix: localStorage.getItem('fix_id'),
            products: [],
            columns: [
                {
                    dataField: '_id',
                    isKey: true,
                    hidden: true
                },
                {
                    dataField: 'name',
                    text: 'Услуга',
                    footer: 'Итого:'
                },
                {
                    dataField: 'price',
                    text: 'Цена',
                    formatter: priceFormatter,
                    footer: columnData => columnData.reduce((acc, item) => acc + item, 0)+' Руб.',
                },
            ]
        }
    }
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("download.pdf");
                // localStorage.removeItem('fix_id');
                window.location.assign('http://localhost:3000/My_fix/');
            })
        ;
    }

    handleRedirect() {
        window.location.assign('http://localhost:3000/My_fix/');
    }
    componentDidMount() {
        let formBody = [];
        for (let prop in this.state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(this.state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/check', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({products: data}))
    };

    render() {
        return (
            <div>
                <div className="mb5">
                    <button onClick={this.printDocument} className='btn-outline-primary'>Сохранить чек</button>
                    <button onClick={this.handleRedirect} className='btn-outline-danger'>Не сохранять чек</button>
                </div>
                <div id="divToPrint" className="mt4">
                    <div>
                        <div className="invoice-box">
                            <table cellPadding="0" cellSpacing="0">
                                <tr className="top">
                                    <td colSpan="2">
                                        <table>
                                            <tr>
                                                <td>
                                                    Дата: {`${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}.`}
                                                </td>
                                                <td>
                                                    Компания: OOO "БКОФ" / BKOF Udp.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr className="information">
                                    <td colSpan="2">
                                        <table>
                                            <tr>
                                                <td>
                                                    Исполнитель: {this.state.master}
                                                </td>
                                                <td>
                                                    Номер: {this.state.id_new_fix}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    заказчик:
                                                </td>
                                                <td>
                                                    Объект:
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div>
                        <ToolkitProvider
                            keyField={'_id'}
                            data={ this.state.products }
                            columns={ this.state.columns }
                        >
                            {
                                props => (
                                    <div>
                                        <BootstrapTable
                                            onDataSizeChange={ this.handleDataChange }
                                            keyField={'_id'}
                                            data={ this.state.products }
                                            columns={ this.state.columns }
                                            filter={ filterFactory() }
                                            tabIndexCell
                                            bordered={ false }

                                            { ...props.baseProps }
                                        />
                                    </div>
                                )
                            }
                        </ToolkitProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cheklist;


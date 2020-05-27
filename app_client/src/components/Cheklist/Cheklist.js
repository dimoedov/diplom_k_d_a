import React, {Component} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf-with-html2canvas';
import './pdf.css'
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
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
            client: '',
            object: '',
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
                localStorage.removeItem('fix_id');
                window.location.assign('http://localhost:3000/my-fix/');
            })
        ;
    }

    handleRedirect() {
        localStorage.removeItem('fix_id');
        window.location.assign('http://localhost:3000/my-fix/');
    }
    componentDidMount() {
        if (this.state.id_new_fix === null){
            window.location.assign('http://localhost:3000/');
        }
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
            .then(data => this.setState({products: data}));
        fetch('/api/check/names', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => {
                this.setState({client: data[1]});
                this.setState({object: data[0]})
            })

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
                                                    Заказчик: {this.state.client}
                                                </td>
                                                <td>
                                                    Объект: {this.state.object}
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


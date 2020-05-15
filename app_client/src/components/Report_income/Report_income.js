import React, {Component} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf-with-html2canvas';
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

const today = new Date();

function priceFormatter(cell, row) {
    return (
        <span>{ cell } Руб.</span>
    );
}

class Report_income extends Component{
    constructor(props) {
        super(props);
        this.state= {
            dateMin:'',
            dateMax:'',
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
                    footer: ''
                },
                {
                    dataField: 'service',
                    text: 'Вид услуги',
                    footer: ''
                },
                {
                    dataField: 'object',
                    text: 'Объект обслуживания',
                    footer: ''
                },
                {
                    dataField: 'client',
                    text: 'Клиент',
                    footer: 'Итого:'
                },
                {
                    dataField: 'price',
                    text: 'Цена',
                    formatter: priceFormatter,
                    footer: columnData => columnData.reduce((acc, item) => acc + item, 0)+' Руб.',
                }
            ]
        }
    }
    printDocument() {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'landscape'
                });
                pdf.addImage(imgData, 'JPEG', -2, -2);
                pdf.save("Report_income.pdf");
            })
        ;
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };
    handleSubmit = (e) =>{
        e.preventDefault();
        let formBody = [];
        let state = this.state;
        for (let prop in state) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(state[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('/api/report_income', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({products: data}));
    };

    render() {
        return (
            <div>
                <div className="mb5">
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tr>
                                <td>
                                    <label htmlFor="dateMin" >Минимальная дата:</label>
                                </td>
                                <td>
                                    <input type="date" required name="dateMin"
                                           value={this.state.dateMin}
                                           onChange={this.handleUserInput}/>
                                </td>
                                <td>
                                    <label htmlFor="dateMax">Максимальная дата:</label>
                                </td>
                                <td>
                                    <input type="date" required name="dateMax"
                                           value={this.state.dateMax}
                                           onChange={this.handleUserInput}/>
                                </td>
                                <td>

                                </td>
                                <td>
                                    <button type='submit' className='btn-outline-primary'>Сформировать отчёт</button>
                                    <button onClick={this.printDocument} className='btn-outline-danger'>Сохранить Отчёт</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div id="divToPrint" className="mt-5 mt3">
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
                            </table>
                            <h1 className='text-lg-center'>Отчёт о выручке компании</h1>
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

export default Report_income;


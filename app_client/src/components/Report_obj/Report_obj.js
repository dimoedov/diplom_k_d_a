import React, {Component} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf-with-html2canvas';
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Select from "react-select";

const today = new Date();

class Report_obj extends Component{
    constructor(props) {
        super(props);
        this.state= {
            dateMin:'',
            dateMax:'',
            object: '',
            objects_list: null,
            selectedOption_objects: null,
            products: [],
            columns: [
                {
                    dataField: '_id',
                    isKey: true,
                    hidden: true
                },
                {
                    dataField: 'master',
                    text: 'ФИО мастера'
                },
                {
                    dataField: 'service',
                    text: 'Вид услуги'
                },
                {
                    dataField: 'object',
                    text: 'Объект обслуживания'
                },
                {
                    dataField: 'client',
                    text: 'Клиент'
                },
                {
                    dataField: 'price',
                    text: 'Цена',
                },
                {
                    dataField: 'status',
                    text: 'Статус услуги',
                    footer: ''
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
                pdf.save("Report_obj.pdf");
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
        fetch('/api/report_obj', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(res => res.json())
            .then(data => this.setState({products: data}));
    };
    handleChange_objects = selectedOption_objects => {
        this.setState({ selectedOption_objects });
        let formBody=[];
        for (let prop in selectedOption_objects){
            if (prop === 'value')
                formBody.push(encodeURIComponent('name') + "=" + encodeURIComponent(selectedOption_objects[prop]));
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
        const { selectedOption_objects } = this.state;
        if (this.state.objects_list === null){
            fetch('/api/objects/list').then(res => res.json())
                .then(data => this.setState({objects_list: data}))
                .catch(err => console.log("err: =" + err));
        }
        return (
            <div>
                <div className="mb5">
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tr>
                                <td>
                                    <label htmlFor="object">Объект обслуживания </label>
                                </td>
                                <td>
                                        <Select
                                            placeholder="Выберите объект"
                                            value={selectedOption_objects}
                                            onChange={this.handleChange_objects}
                                            options={this.state.objects_list}
                                        />
                                </td>
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
                            <h1 className='text-lg-center'>Отчёт об объекте обслуживания</h1>
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

export default Report_obj;


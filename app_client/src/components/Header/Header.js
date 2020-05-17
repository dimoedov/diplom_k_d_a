import React, {Component} from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

class Header extends Component {
    get_cookie ( cookie_name )
    {
        let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }
        render() {
            if (this.get_cookie('Authorized') !== null){
                return (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Link to='/'><Navbar.Brand>OOO"БКОФ" / "BKOF" udp.</Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/Price'> Прайс лист </Link> </Nav.Link>
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/All_fix'> Услуги </Link> </Nav.Link>
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/Users'> Работники </Link> </Nav.Link>
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/Clients'> Клиенты </Link> </Nav.Link>
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/Objects'> Объекты </Link> </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link><Link className="nav-link text-white-50 text-decoration-none" to='/Help'>Помощь</Link></Nav.Link>
                                <NavDropdown title='Отчёты' id="collasible-nav-dropdown">
                                    <NavDropdown.Item> <Link className="nav-link text-black-50 text-decoration-none" to='/Report_obj'>Объект обслуживания</Link> </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item> <Link className="nav-link text-black-50 text-decoration-none" to='/Report_income'>Выручка</Link> </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title={localStorage.getItem('fio')} id="collasible-nav-dropdown">
                                    <NavDropdown.Item> <Link className="nav-link text-black-50 text-decoration-none" to='/My_fix'>Мои услуги</Link> </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item> <Link className="nav-link text-black-50 text-decoration-none" to='/Signout'>Выйти</Link> </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                );

            }else{
                return (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Link to='/'><Navbar.Brand>OOO"БКОФ" / "BKOF" udp.</Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/'> О нас </Link> </Nav.Link>
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/Price'> Цены </Link> </Nav.Link>
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/Users'> Работники </Link> </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link><Link className="nav-link text-white-50 text-decoration-none" to='/Help'>Помощь</Link></Nav.Link>
                                <Nav.Link> <Link className="nav-link text-white-50 text-decoration-none" to='/Auth'> Войти </Link> </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                );
            }
        }

}
export default Header;
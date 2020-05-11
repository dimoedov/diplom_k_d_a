import React, {Component} from 'react';
import {Switch} from 'react-router-dom'
import './Header.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Route } from 'react-router-dom';

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
                    <header className='header bg-secondary text-white'>
                        <div className="container">
                            <div className="row" >
                                <div className="col-lg-2">
                                    <div className="header__tel">
                                        OOO"БКОФ" / "BKOF" udp.
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <nav className="topnav">
                                        <Switch>
                                            <Route exact path='/Add_price'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white"  to='/Price'> Прайс лист</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/All_fix'>Услуги</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Users'>Работники</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/Users'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white"  to='/Price'> Прайс лист</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/All_fix'>Услуги</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white active" to='/Users'>Работники</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/All_fix'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white"  to='/Price'> Прайс лист</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link active text-white" to='/All_fix'>Услуги</Link>
                                                    </li>
                                                     <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Users'>Работники</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/register'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white"  to='/Price'> Прайс лист</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/All_fix'>Услуги</Link>
                                                    </li>
                                                     <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Users'>Работники</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/auth'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white"  to='/Price'> Прайс лист</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/All_fix'>Услуги</Link>
                                                    </li>
                                                     <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Users'>Работники</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/price'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white active"  to='/Price'> Прайс лист</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/All_fix'>Услуги</Link>
                                                    </li>
                                                     <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Users'>Работники</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/My_fix'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white active"  to='/Price'> Прайс лист</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/All_fix'>Услуги</Link>
                                                    </li>
                                                     <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Users'>Работники</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                        </Switch>
                                    </nav>
                                </div>
                                <div className="butn_nav_bar col-lg-3">
                                    <button type="button" className="butn_nav_bar flex-column btn btn-primary btn-dark text-white btn-lg btn-block">{localStorage.getItem('fio')}</button>
                                    <ul className="submenu">
                                        <Link  to='/My_fix'><button type="button " className="flex-column btn btn-primary btn-secondary text-white btn-lg btn-block">Мои услуги</button></Link>
                                        <Link  to='/Signout'><button type="button " className="flex-column btn btn-primary btn-secondary text-white btn-lg btn-block">Выйти</button></Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </header>
                );

            }else{
                return (
                    <header className='header bg-secondary text-white'>
                        <div className="container">
                            <div className="row" >
                                <div className="col-lg-2">
                                    <div className="header__tel">
                                        OOO"БКОФ"  <br/> "BKOF" udp.
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <nav className="topnav">
                                        <ul className="nav nav-pills">
                                            <li className="nav-item">
                                                <Link className="nav-link text-white active" to='/'>О нас</Link>
                                            </li>
                                        </ul>
                                        <ul className="nav nav-pills">
                                            <li className="nav-item">
                                                <Link className="nav-link text-white active" to='/Price'>Цены</Link>
                                            </li>
                                        </ul>
                                        <ul className="nav nav-pills">
                                            <li className="nav-item">
                                                <Link className="nav-link text-white active" to='/Users'>Работники</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-lg-2">
                                    <Link  to='/Auth'><button type="button " className="flex-column btn btn-primary btn-dark text-white btn-lg btn-block">Войти</button></Link>
                                </div>
                            </div>
                        </div>
                    </header>
                );
            }
        }

}
export default Header;
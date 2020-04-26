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
                                        Курсовой проект сделал: Кузнецов Д.А.
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <nav className="topnav">
                                        <Switch>
                                            <Route exact path='/'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white active" to='/' >О нас</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Personal'>Добавление услуги</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/FormList'>Услуги</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/Personal'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white"  to='/'> О нас</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white active" to='/Personal'>Добавление услуги</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/FormList'>Услуги</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/FormList'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/'> О нас</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Personal'>Добавление услуги</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link active text-white" to='/FormList'>Услуги</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/register'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/'> О нас</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Personal'>Добавление услуги</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/FormList'>Услуги</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                            <Route exact path='/auth'>
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/'> О нас</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/Personal'>Добавление услуги</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white" to='/FormList'>Услуги</Link>
                                                    </li>
                                                </ul>
                                            </Route>
                                        </Switch>
                                    </nav>
                                </div>
                                <div className="col-lg-2">
                                    <Link  to='/Signout'><button type="button " className="flex-column btn btn-primary btn-dark text-white btn-lg btn-block">Выйти</button></Link>
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
                                        Курсовой проект сделал: Кузнецов Д.А.
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <nav className="topnav">
                                                <ul className="nav nav-pills">
                                                    <li className="nav-item">
                                                        <Link className="nav-link text-white active" to='/'>О нас</Link>
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
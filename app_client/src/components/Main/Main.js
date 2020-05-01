import {Switch, Route} from 'react-router-dom'
import React, {Suspense} from 'react';
import Home from '../Home/Home'
import Personal from '../Personal/Personal'
import Auth from '../Auth/Auth'
import Register from '../Register/Register'
import Signout from "../Signout/Signout";
import FormList from "../FormList/FormList";
import Error from "../Error/Error";
import Price from "../Price/Price";
import Users from "../Users/users";
import Add_clent from "../Add_client/Add_clent";
import Object from "../Object/Object";
import Client from "../Client/Client";

function Main() {
    return (
        <main>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/Auth' component={Auth}/>
                        <Route path='/Register' component={Register}/>
                        <Route path='/Personal' component={Personal}/>
                        <Route path='/Signout' component={Signout}/>
                        <Route path='/FormList' component={FormList}/>
                        <Route path='/Price' component={Price}/>
                        <Route path='/Users' component={Users}/>
                        <Route path='/Objects' component={Object}/>
                        <Route path='/Clients' component={Client}/>
                        <Route path='/Add_clent' component={Add_clent}/>
                        {/*<Route path='/Add_clent' component={Add_ob}/>*/}
                        {/*<Route path='/Add_clent' component={Add_clent}/>*/}
                        {/*<Route path='/Add_clent' component={Add_clent}/>*/}
                        <Route path="*" component={Error} status={404}/>
                    </Switch>
                </Suspense>
        </main>
    );
}
export default Main;
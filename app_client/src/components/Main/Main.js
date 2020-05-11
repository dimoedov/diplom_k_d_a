import {Switch, Route} from 'react-router-dom'
import React, {Suspense} from 'react';
import Home from '../Home/Home'
import Auth from '../Auth/Auth'
import Register from '../Register/Register'
import Signout from "../Signout/Signout";
import Services from "../Services/Services";
import Error from "../Error/Error";
import Price from "../Price/Price";
import Users from "../Users/users";
import Add_client from "../Add_client/Add_client";
import Object_table from "../Object/Object";
import Client from "../Client/Client";
import Add_users from "../Add_users/Add_users";
import Add_object from "../Add_object/Add_object";
import Add_price from "../Add_price/Add_price";
import Add_fix from "../Add_fix/Add_fix";
import Fix_all from "../Fix_all/Fix_all";
import My_fix from "../Fix/Fix";

function Main() {
    return (
        <main>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/Auth' component={Auth}/>
                        <Route path='/Register' component={Register}/>
                        <Route path='/Signout' component={Signout}/>
                        <Route path='/Services' component={Services}/>
                        <Route path='/Price' component={Price}/>
                        <Route path='/Users' component={Users}/>
                        <Route path='/Objects' component={Object_table}/>
                        <Route path='/Clients' component={Client}/>
                        <Route path='/Add_client' component={Add_client}/>
                        <Route path='/Add_users' component={Add_users}/>
                        <Route path='/Add_object' component={Add_object}/>
                        <Route path='/Add_price' component={Add_price}/>
                        <Route path='/Add_fix' component={Add_fix}/>
                        <Route path='/My_fix' component={My_fix}/>
                        <Route path='/All_fix' component={Fix_all}/>
                        <Route path="*" component={Error} status={404}/>
                    </Switch>
                </Suspense>
        </main>
    );
}
export default Main;
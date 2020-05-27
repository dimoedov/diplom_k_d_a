import {Switch, Route} from 'react-router-dom'
import React from 'react';
import Home from '../Home/Home'
import Auth from '../Auth/Auth'
import Register from '../Register/Register'
import Signout from "../Signout/Signout";
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
import Cheklist from "../Cheklist/Cheklist";
import Report_obj from "../Report_obj/Report_obj";
import Report_income from "../Report_income/Report_income";
import Help from "../Help/Help";

function Main() {
    return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/auth' component={Auth}/>
                <Route path='/register' component={Register}/>
                <Route path='/signout' component={Signout}/>
                <Route path='/price' component={Price}/>
                <Route path='/users' component={Users}/>
                <Route path='/objects' component={Object_table}/>
                <Route path='/clients' component={Client}/>
                <Route path='/add-client' component={Add_client}/>
                <Route path='/add-users' component={Add_users}/>
                <Route path='/add-object' component={Add_object}/>
                <Route path='/add-price' component={Add_price}/>
                <Route path='/add-fix' component={Add_fix}/>
                <Route path='/my-fix' component={My_fix}/>
                <Route path='/all-fix' component={Fix_all}/>
                <Route path='/get-check' component={Cheklist}/>
                <Route path='/report-obj' component={Report_obj}/>
                <Route path='/report-income' component={Report_income}/>
                <Route path='/help' component={Help}/>
                <Route path="*" component={Error} status={404}/>
            </Switch>
    );
}
export default Main;
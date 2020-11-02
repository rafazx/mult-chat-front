import React from 'react';

import { 
    BrowserRouter, 
    Redirect, 
    Route, 
    RouteProps, 
    Switch } from 'react-router-dom';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Rooms from '../pages/Rooms';

interface PrivateRouteProps extends RouteProps {
    component: any;
}


const PrivateChatRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    const nickName = localStorage.getItem('nickName');
    const roomName = localStorage.getItem('roomName');

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                nickName &&
                roomName ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};


const PrivateLoginRoute = (props: PrivateRouteProps) => {
    const { component: Component, ...rest } = props;
    const nickName = localStorage.getItem('nickName');
    const roomName = localStorage.getItem('roomName');

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                nickName && 
                ! roomName ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/rooms',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

const PrivateRoute = (props: PrivateRouteProps) => {
    const nickName = localStorage.getItem('nickName');
    const { component: Component, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                nickName ? (
                    <Component {...routeProps} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: routeProps.location }
                            }}
                        />
                    )
            }
        />
    );
};

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <PrivateChatRoute exact path="/chat" component={Chat}/>
            <PrivateRoute exact path="/rooms" component={Rooms}/>
            <PrivateLoginRoute path="/" component={Login}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;

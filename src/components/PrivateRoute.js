import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <div>
        <Route {...rest} isAuthed={rest.isAuthed} render={(props) => (
            rest.isAuthed
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    </div>
)

export default PrivateRoute;
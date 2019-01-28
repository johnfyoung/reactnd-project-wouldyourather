import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <div>
        {console.log('rest outside', rest)}
        <Route {...rest} isAuthed={rest.isAuthed} render={(props) => (
            rest.isAuthed
                ? (<div><Component {...props} />{console.log('rest', rest)}</div>)
                : <Redirect to='/login' />
        )} />
    </div>
)

export default PrivateRoute;
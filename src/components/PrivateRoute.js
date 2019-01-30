import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuthorization } from '../helpers/authorize';

class PrivateRoute extends React.Component {
    render() {
        const { component: Component, ...rest } = this.props;

        const isAuthed = getAuthorization() !== null;
        return (
            <div>
                <Route {...rest} render={(props) => (
                    isAuthed
                        ? <Component {...props} />
                        : <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                )} />
            </div>
        )
    }
}
/*
const PrivateRoute = ({ component: Component, ...rest }) => (
    <div>
        <Route {...rest} isAuthed={rest.isAuthed} render={(props) => (
            rest.isAuthed
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
        )} />
    </div>
)
*/

export default PrivateRoute;
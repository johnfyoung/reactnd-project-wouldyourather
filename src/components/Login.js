import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

class Login extends Component {

    render() {
        const { isAuthed } = this.props;
        return (
            <div>
                {isAuthed
                    ? <Redirect to={'/'} />
                    : (
                        <LoginForm />
                    )}
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return ({
        isAuthed: authedUser !== null
    })
};

export default connect(mapStateToProps)(Login);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
    state = {
        redirectToReferrer: false,
        user: ''
    }

    handleOnChange = (e) => {
        this.setState({
            user: e.target.value
        });
    };

    handleOnSubmit = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;

        dispatch(setAuthedUser(this.state.user));
        this.setState({
            redirectToReferrer: true
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state
        const { users } = this.props;
        const { user } = this.state;

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className='card'>
                            <div className='card-header bg-primary text-white text-center'>
                                <h1 className="card-title">Who are you?</h1>
                            </div>
                            <div className="card-body">
                                <Form onSubmit={this.handleOnSubmit}>
                                    <FormGroup>
                                        <Label for='userSelect'>Choose your name:</Label>
                                        <Input type='select' name='userSelect' id='userSelect' value={user} onChange={this.handleOnChange}>
                                            <option key={0} value=''>--</option>
                                            {Object.keys(users).map((u) => (
                                                <option key={u} value={u}>{users[u].name}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <Button color='primary' type='submit' disabled={user === ''}>Log in</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return ({
        isAuthed: authedUser !== null,
        users
    })
};

export default connect(mapStateToProps)(Login);
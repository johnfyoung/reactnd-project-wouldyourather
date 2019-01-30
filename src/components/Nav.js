import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav as NavStrap,
    NavItem,
    Button
} from 'reactstrap';


class Nav extends Component {
    state = {
        isOpen: false
    }

    handleToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        dispatch(setAuthedUser(null));
        this.props.history.push(`/login`);
    };

    render() {
        const { isAuthed, users, authedUser } = this.props;
        const user = users[authedUser];
        return (
            <div className='container'>
                <Navbar color="primary" dark className='bg-primary justify-content-between' expand="lg">
                    <NavLink to='/' exact activeClassName='active' className='navbar-brand'>
                        <img className='navbar-logo' src='/img/wouldyourather_sm.png' alt='Would you rather?' />
                    </NavLink>
                    {isAuthed &&
                        <NavbarToggler onClick={this.handleToggle} />
                    }
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {isAuthed
                            && (
                                <Fragment>
                                    <NavStrap className="mr-auto" navbar>
                                        <NavItem>
                                            <NavLink to='/' exact activeClassName='active' className='nav-item nav-link'>Home</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to='/leaderboard' activeClassName='active' className='nav-item nav-link'>Leaderboard</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to='/add' activeClassName='active' className='nav-item nav-link'>New Question</NavLink>
                                        </NavItem>
                                    </NavStrap>
                                    <div className='nav-identity'>
                                        <span className='nav-item text-light'>Hello {user.name}! </span>
                                        <img className='avatar-nav' src={user.avatarURL} alt={`Avatar for ${user.name}`} />
                                        <Button color='light' onClick={this.handleLogout}>Log out</Button>
                                    </div>
                                </Fragment>
                            )
                        }
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return ({
        isAuthed: authedUser !== null,
        users,
        authedUser
    });
}

export default withRouter(connect(mapStateToProps)(Nav));
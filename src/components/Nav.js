import React, { Component, Fragment } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Button } from 'reactstrap';

class Nav extends Component {
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
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark justify-content-between'>
                    <NavLink to='/' exact activeClassName='active' className='navbar-brand'>
                        <img className='navbar-logo' src='/img/wouldyourather_sm.png' alt='Would you rather?' />
                    </NavLink>
                    <div className='collapse navbar-collapse'>
                        {isAuthed
                            && (
                                <Fragment>
                                    <div className='navbar-nav mr-auto'>
                                        <NavLink to='/' exact activeClassName='active' className='nav-item nav-link'>Home</NavLink>
                                        <NavLink to='/leaderboard' activeClassName='active' className='nav-item nav-link'>Leaderboard</NavLink>
                                        <NavLink to='/new' activeClassName='active' className='nav-item nav-link'>New Question</NavLink>
                                    </div>
                                    <div className='float-right'>
                                        <span className='nav-item text-light'>Hello {user.name}! </span>
                                        <img className='avatar-nav' src={user.avatarURL} alt={`Avatar for ${user.name}`} />
                                        <Button color='secondary' onClick={this.handleLogout}>Log out</Button>
                                    </div>
                                </Fragment>
                            )
                        }
                    </div>
                </nav>
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
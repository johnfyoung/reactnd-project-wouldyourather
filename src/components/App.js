import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Questions from './Questions';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import PrivateRoute from './PrivateRoute';
import LoadingBar from 'react-redux-loading';
import Nav from './Nav';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import QuestionPage from './QuestionPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { isAuthed } = this.props;

    console.log('App props', this.props);

    return (
      <Fragment>

        <Router>
          <div className="app">
            <header className="app__header bg-dark">
              <Nav />
              <LoadingBar />
            </header>
            <div className='app__body pt-5'>
              <PrivateRoute path='/' exact component={Questions} isAuthed={isAuthed} />
              <PrivateRoute path='/new' exact component={NewQuestion} isAuthed={isAuthed} />
              <PrivateRoute path='/leaderboard' exact component={LeaderBoard} isAuthed={isAuthed} />
              <PrivateRoute path='/question/:id' exact component={QuestionPage} isAuthed={isAuthed} />
              <Route path='/login' exact component={Login} />
            </div>
          </div>
        </Router>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    isAuthed: authedUser !== null,
    authedUser
  };
}

export default connect(mapStateToProps)(App);

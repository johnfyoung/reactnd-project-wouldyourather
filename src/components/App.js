import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Questions from './Questions';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import PrivateRoute from './PrivateRoute';
import LoadingBar from 'react-redux-loading-bar';
import Nav from './Nav';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import QuestionPage from './QuestionPage';
import NotFound from './NotFound';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Fragment>
        <Router>
          <div className="app">
            <header className="app__header bg-primary">
              <Nav />
              <LoadingBar className='bg-dark' style={{ height: '5px' }} />
            </header>
            <div className='app__body pt-5'>
              <Switch>
                <PrivateRoute path='/' exact component={Questions} />
                <PrivateRoute path='/add' exact component={NewQuestion} />
                <PrivateRoute path='/leaderboard' exact component={LeaderBoard} />
                <PrivateRoute path='/question/:id' exact component={QuestionPage} />
                <Route path='/login' exact component={Login} />
                <Route component={NotFound} />
              </Switch>
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

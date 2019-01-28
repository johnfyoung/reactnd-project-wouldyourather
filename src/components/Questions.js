import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Link } from 'react-router-dom';

class Questions extends Component {
    state = {
        tab: 'unanswered'
    }

    handleTabClick = (label) => {
        this.setState({
            tab: label
        });
    };

    render() {
        const { questionIds, answeredQIds } = this.props;
        const unansweredQIds = questionIds.filter((qid) => answeredQIds.indexOf(qid) === -1);
        const { tab } = this.state;

        return (
            <div className='container'>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button className={`nav-item nav-link ${tab === 'unanswered' ? 'active' : ''}`} onClick={(e) => this.handleTabClick('unanswered')}>Unanswered Questions</button>
                        <button className={`nav-item nav-link ${tab === 'answered' ? 'active' : ''}`} onClick={(e) => this.handleTabClick('answered')}>Answered Questions</button>
                    </div>
                </nav>
                <div className='questions tab-content' id='nav-tabContent'>
                    <div className={`tab-pane pt-3 fade ${tab === 'unanswered' ? 'show active' : ''}`} id='nav-unanswered' role='tabpanel' aria-labelledby='nav-unanswered-tab'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                {unansweredQIds.length > 0
                                    ? (
                                        <ul className='col-md-8'>
                                            {unansweredQIds.map((qid) => (
                                                <li key={qid}><Question id={qid} isSolo={false} /></li>
                                            ))}
                                        </ul>
                                    )
                                    : (
                                        <div className='col-md-8 no-questions-notice'>
                                            <h3 >You've answered all the questions!</h3>
                                            <p>Go ahead and <Link to={'/new'}>create</Link> some new ones of your own!</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane pt-3 fade ${tab === 'answered' ? 'show active' : ''}`} id='nav-answered' role='tabpanel' aria-labelledby='nav-answered-tab'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                {answeredQIds.length > 0
                                    ? (
                                        <ul className='col-md-8'>
                                            {answeredQIds.map((qid) => (
                                                <li key={qid}><Question id={qid} isSolo={false} /></li>
                                            ))}
                                        </ul>
                                    )
                                    : (
                                        <div className='col-md-8 no-questions-notice'>
                                            <h3 >You haven't answered any questions!</h3>
                                            <p>Go ahead and answer some questions. You will feel better about yourself.</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

function mapStateToProps({ questions, authedUser, users }) {
    const sortedQuestionIds = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp);
    const answeredQIds = authedUser !== null ? Object.keys(users[authedUser].answers) : [];
    const sortedAnsweredQIds = sortedQuestionIds.filter((id) => answeredQIds.indexOf(id) !== -1);
    return ({
        questionIds: sortedQuestionIds,
        answeredQIds: sortedAnsweredQIds,
        authedUser
    })
}

export default connect(mapStateToProps)(Questions);
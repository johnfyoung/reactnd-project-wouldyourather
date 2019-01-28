import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

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
        const { questionIds, authedUser, answers } = this.props;
        const answeredQIds = Object.keys(answers);
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
                    <div className={`tab-pane fade ${tab === 'unanswered' ? 'show active' : ''}`} id='nav-unanswered' role='tabpanel' aria-labelledby='nav-unanswered-tab'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <ul className='col-md-8'>
                                    {unansweredQIds.map((qid) => (
                                        <li key={qid}><Question id={qid} isSolo={false} /></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane fade ${tab === 'answered' ? 'show active' : ''}`} id='nav-answered' role='tabpanel' aria-labelledby='nav-answered-tab'>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <ul className='col-md-8'>
                                    {answeredQIds.map((qid) => (
                                        <li key={qid}><Question id={qid} isSolo={false} /></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

function mapStateToProps({ questions, authedUser, users }) {
    return ({
        questionIds: Object.keys(questions),
        answers: authedUser !== null ? users[authedUser].answers : null,
        authedUser
    })
}

export default connect(mapStateToProps)(Questions);
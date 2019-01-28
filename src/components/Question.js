import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        const { question, author, id, isSolo, answer, authedUser } = this.props;
        const totalAnswers = question.optionOne.votes.length + question.optionTwo.votes.length;

        return (
            <div className='question'>

                {answer !== null && isSolo
                    ? (
                        <Fragment>
                            <div className='question__head'>
                                <img className='question__head__avatar' src={author.avatarURL} alt={`Avatar for author.name`} />
                                <h3>{`Asked by ${author.name}`}</h3>
                            </div>
                            <div className='question__body-answered'>
                                <div className='question__body__label question__body__label-title'>Results</div>
                                <div className='question__body-answered__option'>
                                    <div className='question__body-answered__option__info'>
                                        <div>{`Would you rather ${question.optionOne.text}?`}</div>
                                        <div className='question__body-answered__chart my-3' style={{ width: `${(question.optionOne.votes.length / totalAnswers) * 100}%` }}>
                                            {`${question.optionOne.votes.length / totalAnswers * 100}%`}
                                        </div>
                                        <div>{`${question.optionOne.votes.length} of ${totalAnswers}`}</div>
                                    </div>
                                    {answer !== null && answer === 'optionOne' && (
                                        <div className='question__body-answered__option_voted'>
                                            Your Choice!
                                        </div>
                                    )}
                                </div>
                                <div className='question__body-answered__option'>
                                    <div className='question__body-answered__option__info'>
                                        <div>{`Would you rather ${question.optionTwo.text}?`}</div>
                                        <div className='question__body-answered__chart my-3' style={{ width: `${(question.optionTwo.votes.length / totalAnswers) * 100}%` }}>
                                            {`${question.optionTwo.votes.length / totalAnswers * 100}%`}
                                        </div>
                                        <div>{`${question.optionTwo.votes.length} of ${totalAnswers}`}</div>
                                    </div>
                                    {answer !== null && answer === 'optionTwo' && (
                                        <div className='question__body-answered__option_voted'>
                                            Your Choice!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <div className='question__head'>
                                <h3>{`${author.name} asks:`}</h3>
                            </div>
                            <div className='question__body'>
                                <div className='question__body__avatarcontainer'>
                                    <img src={author.avatarURL} alt={`Avatar for ${author.name}`} />
                                </div>
                                <div className='question__body__questioncontainer'>
                                    <div className='question__body__label'>Would you rather...</div>
                                    <div className='question__body__questioncontainer__option'>{`${question.optionOne.text}?`}</div>
                                    <div className='question__body__label'>Or</div>
                                    <div className='question__body__questioncontainer__option'>{`${question.optionTwo.text}?`}</div>
                                    {!isSolo
                                        ? <Link to={`/question/${id}`} className='btn btn-primary question__body__questioncontainer__button'>View Poll</Link>
                                        : ''}
                                </div>
                            </div>
                        </Fragment>
                    )
                }

            </div >
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
    const { id } = props;
    const question = questions[id];
    const author = users[question.author];
    const authedUserProfile = users[authedUser];
    const answer = Object.keys(authedUserProfile.answers).indexOf(id) !== -1 ? authedUserProfile.answers[id] : null;

    return ({
        question,
        author,
        authedUser,
        answer
    });
}

export default connect(mapStateToProps)(Question);

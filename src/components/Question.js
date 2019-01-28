import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        const { question, author, id, isSolo, isAnswered, authedUser } = this.props;

        return (
            <div className='question'>

                {isAnswered && isSolo
                    ? (
                        <Fragment>
                            <div className='question__head'>
                                <img className='question__head__avatar' src={author.avatarURL} alt={`Avatar for author.name`} />
                                <h3>{`Asked by ${author.name}`}</h3>
                            </div>
                            <div className='question__body-answered'>
                                <div className='question__body__label question__body__label-title'>Results</div>
                                <div className='question__body-answered__option'>
                                    {`Would you rather ${question.optionOne.text}?`}
                                </div>
                                <div className='question__body-answered__option'>
                                    {`Would you rather ${question.optionTwo.text}?`}
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
    const isAnswered = Object.keys(authedUserProfile.answers).indexOf(id) !== -1;

    return ({
        question,
        author,
        authedUser,
        isAnswered
    });
}

export default connect(mapStateToProps)(Question);

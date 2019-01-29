import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { handleAnswerQuestion } from '../actions/questions';

/**
 * Question Component
 * 
 * Handles all the layout and functionality for Questions. This includes questions in a list and by themselves,
 * answered and unanswered.
 */
class Question extends Component {
    state = {
        selected: ''
    }

    handleOnChange = (e) => {
        this.setState({
            selected: e.target.value
        })
    }

    handleVote = (e) => {
        e.preventDefault();

        console.log('selected option: ', this.state.selected);

        const { dispatch, id } = this.props;
        dispatch(handleAnswerQuestion({
            qid: id,
            answer: this.state.selected
        }));
    }

    render() {
        const { question, author, id, isSolo, answer } = this.props;
        const totalAnswers = question.optionOne.votes.length + question.optionTwo.votes.length;

        return (
            <div className='question mb-3 border border-primary rounded' >
                {
                    answer !== null && isSolo
                        ? (
                            <Fragment>
                                {/* VIEW QUESTION WITH RESULTS*/}
                                <div className='question__head p-2 bg-primary text-white'>
                                    <img className='question__head__avatar rounded-circle mr-2' src={author.avatarURL} alt={`Avatar for author.name`} />
                                    <h3 className='m-0'>{`Asked by ${author.name}`}</h3>
                                </div>
                                <div className='question__body-answered p-3'>
                                    <div className='question__body__label question__body__label-title'>Results</div>
                                    <div className='question__body-answered__option'>
                                        <div className='question__body-answered__option__info'>
                                            <div className='font-weight-bold'>{`Would you rather ${question.optionOne.text}?`}</div>
                                            <div className='question__body-answered__chart my-3' style={{ width: `${(question.optionOne.votes.length / totalAnswers) * 100}%` }}>
                                                {`${Math.round(question.optionOne.votes.length / totalAnswers * 100)}%`}
                                            </div>
                                            <div className='text-primary'>{`${question.optionOne.votes.length} of ${totalAnswers}`}</div>
                                        </div>
                                        {answer !== null && answer === 'optionOne' && (
                                            <div className='question__body-answered__option_voted'>
                                                <div className='text-primary'>Your<br /><FaCheckCircle className='text-success question__body-answered__option_voted__check' /><br />Choice</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='question__body-answered__option'>
                                        <div className='question__body-answered__option__info'>
                                            <div className='font-weight-bold'>{`Would you rather ${question.optionTwo.text}?`}</div>
                                            <div className='question__body-answered__chart my-3' style={{ width: `${(question.optionTwo.votes.length / totalAnswers) * 100}%` }}>
                                                {`${Math.round(question.optionTwo.votes.length / totalAnswers * 100)}%`}
                                            </div>
                                            <div className='text-primary'>{`${question.optionTwo.votes.length} of ${totalAnswers}`}</div>
                                        </div>
                                        {answer !== null && answer === 'optionTwo' && (
                                            <div className='question__body-answered__option_voted'>
                                                <div className='text-dark'>Your<br /><FaCheckCircle className='text-success question__body-answered__option_voted__check' /><br />Choice</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                {/* VIEW QUESTION WITHOUT RESULTS*/}
                                <div className='question__head p-2 bg-primary text-white align-middle'>
                                    <h3 className='m-0'>{`${author.name} asks:`}</h3>
                                </div>
                                <div className='question__body d-flex align-middle'>
                                    <div className='question__body__avatarcontainer p-3'>
                                        <img className='rounded-circle' src={author.avatarURL} alt={`Avatar for ${author.name}`} />
                                    </div>
                                    <div className='question__body__questioncontainer'>
                                        <div className='question__body__label'>Would you rather...</div>
                                        {!isSolo
                                            ? (
                                                <Fragment>
                                                    {/* VIEW QUESTION IN A LIST*/}
                                                    <div className='question__body__questioncontainer__option'>{`${question.optionOne.text}?`}</div>
                                                    <div className='question__body__label'>Or</div>
                                                    <div className='question__body__questioncontainer__option mb-3'>{`${question.optionTwo.text}?`}</div>
                                                    <Link to={`/question/${id}`} className='btn btn-primary question__body__questioncontainer__button'>View Poll</Link>
                                                </Fragment>
                                            )
                                            : (
                                                <Fragment>
                                                    {/* VIEW QUESTION WITH ANSWER FORM*/}
                                                    <Form onSubmit={this.handleVote}>
                                                        <div className='question__body__questioncontainer__option'>
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input type='radio' id='optionOne' name='option' value='optionOne' onChange={this.handleOnChange} checked={this.state.selected === 'optionOne'} />{' '}
                                                                    {`${question.optionOne.text}?`}
                                                                </Label>
                                                            </FormGroup>
                                                        </div>
                                                        <div className='question__body__label'>Or</div>
                                                        <div className='question__body__questioncontainer__option mb-3'>
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input type='radio' id='optionTwo' name='option' value='optionTwo' onChange={this.handleOnChange} checked={this.state.selected === 'optionTwo'} />{' '}
                                                                    {`${question.optionTwo.text}?`}
                                                                </Label>
                                                            </FormGroup>
                                                        </div>
                                                        <Button type='submit' color='primary' className='question__body__questioncontainer__button' disabled={this.state.selected === ''}>Vote!</Button>
                                                    </Form>
                                                </Fragment>
                                            )
                                        }

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
        answer
    });
}

export default connect(mapStateToProps)(Question);

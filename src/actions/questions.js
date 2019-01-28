import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { userAnswerQuestion } from './users';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
    return ({
        type: ADD_QUESTION,
        question
    })
}

function answerQuestion({ qid, authedUser, answer }) {
    return ({
        type: ANSWER_QUESTION,
        qid,
        authedUser,
        answer
    })
}

export function receiveQuestions(questions) {
    return ({
        type: RECEIVE_QUESTIONS,
        questions
    })
}

export function handleAnswerQuestion({ qid, answer }) {
    return ((dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        const params = { qid, answer, authedUser };
        return saveQuestionAnswer(params)
            .then(() => {
                dispatch(answerQuestion(params));
            })
            .then(() => {
                dispatch(userAnswerQuestion(params));
            })
            .then(() => {
                dispatch(hideLoading());
            })
            .catch((e) => {
                console.warn(`Error saving answer to question: ${qid}`, e);
                alert('There was an error saving your answer. Please trt again');
            })
    });
}

export function handleAddQuestion({ optionOneText, optionTwoText }) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then((question) => {
                dispatch(addQuestion(question))
            })
            .then(() => {
                dispatch(hideLoading());
            })
            .catch((e) => {
                console.warn('Error adding question: ', e);
                alert('There was an error saving your question. Please try again.');
            });
    };
}
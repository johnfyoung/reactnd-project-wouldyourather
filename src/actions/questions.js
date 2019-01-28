import { saveQuestionAnswer } from '../utils/api';
import { userAnswerQuestion } from './users';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
    return ({
        type: RECEIVE_QUESTIONS,
        questions
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
import {
    RECEIVE_USERS,
    USER_ANSWER_QUESTION
} from '../actions/users';

import { ADD_QUESTION } from '../actions/questions';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return ({
                ...state,
                ...action.users
            });
        case ADD_QUESTION:
            return ({
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: state[action.question.author].questions.indexOf(action.question.id) === -1
                        ? state[action.question.author].questions.concat(action.question.id)
                        : state[action.question.author].questions
                }
            });
        case USER_ANSWER_QUESTION:
            if (Object.keys(state[action.authedUser].answers).indexOf(action.qid) === -1) {
                return ({
                    ...state,
                    [action.authedUser]: {
                        ...state[action.authedUser],
                        answers: {
                            ...state[action.authedUser].answers,
                            [action.qid]: action.answer
                        }
                    }
                });
            }

            return state;
        default:
            return state;
    }
}
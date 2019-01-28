import {
    RECEIVE_USERS,
    USER_ANSWER_QUESTION
} from '../actions/users';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return ({
                ...state,
                ...action.users
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
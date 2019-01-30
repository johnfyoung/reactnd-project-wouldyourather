import { getInitialData } from '../utils/api'
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { checkAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveQuestions(questions));
                dispatch(receiveUsers(users));
                dispatch(checkAuthedUser());
                dispatch(hideLoading());
            })
            .catch((e) => {
                console.warn('Error loading initial data: ', e);
                alert('There was a problem loading the inital data, Please reload your browser');
            })
    }
}
import { SET_AUTHED_USER, CHECK_AUTHED_USER } from '../actions/authedUser';
import { getAuthorization } from '../helpers/authorize';
import Cookies from 'universal-cookie';

export default function authedUser(state = null, action) {
    const cookies = new Cookies();
    switch (action.type) {
        case SET_AUTHED_USER:
            if (action.id === null) {
                cookies.remove('authedUser');
            } else {
                const exp = (new Date(Date.now() + 86400));
                cookies.set('authedUser', action.id, { path: '/', expires: exp });
            }
            return action.id;
        case CHECK_AUTHED_USER:
            return getAuthorization();
        default:
            return state;
    }
}
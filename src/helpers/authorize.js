import Cookies from 'universal-cookie';

export function getAuthorization() {
    const cookies = new Cookies();
    const authCookie = cookies.get('authedUser');
    if (authCookie && authCookie !== null) {
        return authCookie;
    }

    return null;
}
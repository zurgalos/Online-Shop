import { UserModel } from '../../models/user-model';
export const REGISTER_SUCCUSS = 'REGISTER_SUCCUSS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOAD_USER = 'LOAD_USER';
export const LOGIN_START = 'LOGIN_START';
export const LOGOUT = 'LOGOUT';
export const REGISTER_START = 'REGISTER_START';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';

export class LoginStart {
    readonly type = LOGIN_START;

    constructor(public payload: { email: string; password: string }) { }
}
export class RegisterStart {
    readonly type = REGISTER_START;

    constructor(public payload: UserModel) { }
}
export class AuthenticateSuccess {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor(
        public payload: UserModel

    ) { }
}

export class LoadUser {
    readonly type = LOAD_USER;

    constructor(
        public payload: { token: string, snackbarMSg: string }

    ) { }
}


export class AuthenticateFail {
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) { }
}

export class LogoutUser {
    readonly type  = LOGOUT;

}


export type AuthActionTypes = LoginStart | RegisterStart
    | AuthenticateSuccess | AuthenticateFail | LoadUser | LogoutUser
  
import { UserModel } from '../../models/user-model';
export interface AuthState {
    token: string | object | null;
    isAuthenticated: boolean;
    loading: boolean;
    user: UserModel;
    errorMessage: string | null;
}
export interface AppState {
    auth: AuthState;
}
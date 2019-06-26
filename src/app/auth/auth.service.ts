import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expirtesIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCAwSDQKSLtRgFelH0Nc7ixn7Vdj6xYjKA',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCAwSDQKSLtRgFelH0Nc7ixn7Vdj6xYjKA',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError))
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unkown error ocurred'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            // signup errors
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already'
                break
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'This operation is not allowed'
                break
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many attemps, please try later'
                break
            // signin errors
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email not found'
                break
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid password'
                break
            case 'USER_DISABLED':
                errorMessage = 'User disabled'
                break
        }
        return throwError(errorMessage)
    }
}

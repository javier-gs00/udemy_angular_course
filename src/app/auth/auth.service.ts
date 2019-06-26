import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expirtesIn: string;
    localId: string;
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
        ).pipe(
            catchError((errorResponse) => {
                let errorMessage = 'An unkown error ocurred'
                if (!errorResponse.error || !errorResponse.error.error) {
                    return throwError(errorMessage)
                }
                switch (errorResponse.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exists already'
                        break
                    case 'OPERATION_NOT_ALLOWED':
                        errorMessage = 'This operation is not allowed'
                        break
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMessage = 'Too many attemps, please try later'
                        break
                }
                return throwError(errorMessage)
            })
        )
    }
}

import { OnInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
    isLoginMode = true

    constructor() {}

    ngOnInit() {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        console.log(form.value)
        form.reset()
    }
}
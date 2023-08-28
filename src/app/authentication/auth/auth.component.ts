import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { AuthReponse } from '../auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode: boolean = true;
  loading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  handleAuth(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.loading = true;

    const email = form.value.email;
    const password = form.value.password;
    let authReponse: Observable<AuthReponse>;

    if (this.isLoginMode) {
      authReponse = this.authService.login(email, password);
    } else {
      authReponse = this.authService.register(email, password);
    }

    authReponse.subscribe({
      next: (response) => {
        this.error = '';
        this.loading = false;
        this.router.navigate(['/']);
      },

      error: (error) => {
        this.loading = false;
        this.error = error;

        console.log(error);
      },
    });
  }
}

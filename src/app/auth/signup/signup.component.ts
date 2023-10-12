import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService, SignupCredentials } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate] // async validators are 3rd arg
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private readonly matchPassword: MatchPassword,
    private readonly uniqueUsername: UniqueUsername,
    private readonly authService: AuthService
  ) {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const credentials: SignupCredentials = this.authForm
      .value as SignupCredentials;

    this.authService.signup(credentials).subscribe({
      // use arrow functions to bind 'this' to the component instead of the observable
      next: (response) => {
        // Navigate to some other route
      },
      complete: () => {},
      error: (err) => {
        // Show error and why failed
        if (!err.status) {
          this.authForm.setErrors({ noInternetConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}

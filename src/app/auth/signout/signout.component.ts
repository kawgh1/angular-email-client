import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss'],
})
export class SignoutComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.signOut().subscribe(() => {
      // navigate user back to sign in page after a few seconds of signing out
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 5000);
    });
  }
}

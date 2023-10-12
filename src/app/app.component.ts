import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'emailclient';
  signedIn = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.signedIn$.subscribe((signedIn) => {
      this.signedIn = signedIn;
    });
    this.authService.checkAuth().subscribe(() => {});
    // update
    setTimeout(() => {
      this.authService.signOut().subscribe(() => {});
    }, 5000);
  }
}

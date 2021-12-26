import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './redux/auth/auth-types';
import { LoadUser } from './redux/auth/auth-actions-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<{ auth: AppState }>) {

  }

  ngOnInit() {
    //auto-login
    let token = localStorage.getItem('token')
    if (token) {
      let stringToken = token.substring(1);
      stringToken = stringToken.substring(0, stringToken.length - 1);
    
      this.store.dispatch(
        new LoadUser({ token: stringToken, snackbarMSg: "" })
      );

    }

  }

}
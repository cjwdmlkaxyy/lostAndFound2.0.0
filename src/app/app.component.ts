import { Component, OnInit} from '@angular/core';

import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lostAndFind';
  token: any;
  // constructor(private login: LoginComponent){
  //   this.token = login.token;
  //   console.log(this.token);
  // }

  ngOnInit(){
    this.token = '';
  }

}

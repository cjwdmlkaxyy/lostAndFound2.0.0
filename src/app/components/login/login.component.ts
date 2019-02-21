import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../service/login.service';
import 'rxjs'
import {Router, ActivatedRoute} from '@angular/router';
import * as $ from 'jquery'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router,
              private route: ActivatedRoute) { }

  loginInfos:object = {};

  ngOnInit() {
    this.loginInfos = {
      username:'',
      password:''
    };
    $('#login').fadeIn(200);
  }

  /*登录*/
  login(){
    this.loginService.login(this.loginInfos);
    this.router.navigate(['/frame/index']);
  }

  /*忘记密码*/
  forgetPsd(){
    console.log(222);
  }
}

import { Component, OnInit } from '@angular/core';
import { RegisterService} from '../../service/register.service';
import 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';

/*services*/
import {CheckValueService} from '../../service/check-value.service';

interface Register {
  account:number,
  psd:string,
  confirmPsd:string,
  name:string,
  phoneNum:string,
  birthday:any,
  email:any,
  area:any,
  realName:string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public Registerhttp: RegisterService,
              private router: Router,
              private route: ActivatedRoute,
              private CheckValue: CheckValueService) { }
  // name:string = '';
  registerInfos: any;
  css = {
    userName: '',
    psd:'',
    confirmPsd:'',
    netName:'',
    phone:'',
    email:''
  };



  ngOnInit() {
    this.registerInfos = {
      account: '',
      psd: "",
      confirmPsd: "",
      userName: "",
      phoneNum: "",
      birthday: "",
      email: "",
      area: "",
      realName: ""
    };

  }

  register() {
    this.Registerhttp.register(this.registerInfos);
    this.router.navigate(['login']);
  }

  /*校验登录账号是否正确输入*/
  checkUserName(name){
    let flag = this.CheckValue.checkUserName(name);
    if(name == '' || name == null){
      this.css.userName = 'has-error';
      console.log('不能为空');
      return;
    }
    if(flag){
      this.css.userName = 'has-success';
      this.checkIsRepeat('account',name);

    }else{
      this.css.userName = 'has-error';
    }
  }

  /*校验登录账号是否已存在*/
  checkIsRepeat(flag,info){
    this.Registerhttp.checkAccount(flag,info).subscribe((res: any)=>{
      console.log(res);
    });
  }

  /*checkPsd*/
  checkPsd(psd){
    if(psd == '' || psd == null){
      this.css.psd = 'has-error';
      console.log('不能为空');
      return;
    }
    if(psd.length >= 6){
      this.css.psd = 'has-success';
    }else{
      this.css.psd = 'has-error';
    }
  }

  confirmPsd(value){
    if(value == this.registerInfos.psd){
      this.css.confirmPsd = 'has-success';
    }else{
      this.css.confirmPsd = 'has-error';
    }
  }

  checkNetName(value){
    if(value.length <= 15){
      this.css.netName = 'has-success';
      if(value.length == 0){
        this.css.netName = '';
      }
    }else{
      this.css.netName = 'has-error';
    }
  }

  /*check phone*/
  checkPhone(value){
    if(value == '' || value == null){
      this.css.phone = 'has-error';
      console.log('不能为空');
      return;
    }
    if(value.length >= 6){
      this.css.phone = 'has-success';
    }else{
      this.css.phone = 'has-error';
    }
  }

  checkEmail(value){
    if(value == '' || value == null){
      this.css.email = 'has-error';
      console.log('不能为空');
      return;
    }
    if(value.length >= 6){
      this.css.email = 'has-success';
    }else{
      this.css.email = 'has-error';
    }
  }

  registerConfirm(){
    if(this.css.userName == 'has-error'){
      return;
    }else if(this.css.psd == 'has-error'){
      return;
    }else if(this.css.confirmPsd == 'has-error'){
      return;
    }else if(this.css.netName == 'has-error'){
      return;
    }else if(this.css.phone == 'has-error'){
      return;
    }else if(this.css.email == 'has-error'){
      return;
    }else if(this.css.userName ==''){
      this.css = {
        userName: 'has-error',
        psd:'has-error',
        confirmPsd:'',
        netName:'',
        phone:'has-error',
        email:'has-error'
      };
      return;
    }

    this.register();
  }
}

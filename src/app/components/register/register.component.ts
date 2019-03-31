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

  userNameRepeat = false;
  phoneNumRepeat = false;
  emailRepeat = false;


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
    this.Registerhttp.register(this.registerInfos).subscribe( res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
    // this.router.navigate(['login']);
  }

  /*校验登录账号是否正确输入*/
  checkUserName(name){
    let flag = this.CheckValue.checkUserName(name);
    if(name == '' || name == null || !flag){
      this.css.userName = 'has-error';
      return;
    }
    if(flag){
      this.Registerhttp.checkInformation('account',name).subscribe((res: any)=>{
        if(res.code == '000004'){
          this.userNameRepeat = true;
          this.css.userName = 'has-error';
        }else{
          this.css.userName = 'has-success';
        }
      });
    }
  }

  /*checkPsd*/
  checkPsd(psd){
    if(psd == '' || psd == null){
      this.css.psd = 'has-error';
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
    let flag = this.CheckValue.checkPhoneNum(value);
    if(value == '' || value == null || !flag){
      this.css.phone = 'has-error';
      return;
    }
    if(flag){
      this.Registerhttp.checkInformation('phone',value).subscribe( res => {
        if(res.code === '000004'){
          this.css.phone = 'has-error';
          this.phoneNumRepeat = true;
        }else{
          this.css.phone = 'has-success';
        }
      });
    }
  }


  checkEmail(value){
    let flag = this.CheckValue.checkEmail(value);
    if(value == '' || value == null || !flag){
      this.css.email = 'has-error';
      return;
    }
    if(flag){
      this.Registerhttp.checkInformation('email',value).subscribe( res => {
        if(res.code === '000004'){
          this.css.email = 'has-error';
          this.emailRepeat = true;
        }else{
          this.css.email = 'has-success';
        }
      })
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

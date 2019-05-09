import { Component, OnInit } from '@angular/core';
import { RegisterService} from '../../service/register.service';
import 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import { HttpRequestService } from '../../service/http-request.service';
import { NzMessageService } from 'ng-zorro-antd';

/*services*/
import {CheckValueService} from '../../service/check-value.service';
import { PublicDateService } from '../../service/public-date.service';

/*interface Register {
  account: number,
  psd: string,
  confirmPsd: string,
  name: string,
  phoneNum: string,
  birthday: any,
  email: any,
  area: any,
  realName: string
}*/

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public Registerhttp: RegisterService,
              private router: Router,
              private route: ActivatedRoute,
              private CheckValue: CheckValueService,
              private PublicDate: PublicDateService,
              public HttpRequest: HttpRequestService,
              private NzMessage: NzMessageService) { }
  // name:string = '';
  css = {
    userName: '',
    psd: '',
    confirmPsd: '',
    netName: '',
    phone: '',
    email: ''
  };

  registerInfos = {
    username: '', // 用户登录账号
    password: '',
    phone: '',
    netName: '', // 可选
    birthday: '', // 可选
    email: '',
    province: '',
    city: '',
    district: '',
    name: ''  // 可选
  };

  userNameRepeat = false;
  phoneNumRepeat = false;
  emailRepeat = false;

  getProvinces: any; // 省
  getCities: any; // 市
  getArea: any; // 区
  showLoading = false;


  ngOnInit() {
    this.HttpRequest.getProvence().subscribe( (res: any) => {
      this.getProvinces = JSON.parse(res.data);
      this.registerInfos.province = this.getProvinces[0][0];
      this.associatedCtiyArea(); // 省市区联动
    });

    this.getCities = [];
  }

  register() {
    this.showLoading = true;
    this.Registerhttp.register(this.registerInfos).subscribe( res => {
      if (res.code === '000000') {
        this.NzMessage.success('注册成功');
        this.router.navigate(['login']);
        this.showLoading = false;
      }
    }, err => {
      console.log(err);
      this.NzMessage.error('系统错误');
      this.showLoading = false;
    });
  }

  /*校验登录账号是否正确输入*/
  checkUserName(name) {
    let flag = this.CheckValue.checkUserName(name);
    if (name === '' || name === null || !flag) {
      this.css.userName = 'has-error';
      return;
    }
    if (flag) {
      this.Registerhttp.checkInformation('account', name).subscribe((res: any) => {
        if (res.code === '000004') {
          this.userNameRepeat = true;
          this.css.userName = 'has-error';
        } else {
          this.css.userName = 'has-success';
        }
      });
    }
  }

  /*checkPsd*/
  checkPsd(psd) {
    if (psd === '' || psd == null) {
      this.css.psd = 'has-error';
      return;
    }
    if (psd.length >= 6) {
      this.css.psd = 'has-success';
    } else {
      this.css.psd = 'has-error';
    }
  }

  confirmPsd(value) {
    if (value === this.registerInfos.password) {
      this.css.confirmPsd = 'has-success';
    } else {
      this.css.confirmPsd = 'has-error';
    }
  }

  checkNetName(value) {
    if (value.length <= 15) {
      this.css.netName = 'has-success';
      if (value.length === 0) {
        this.css.netName = '';
      }
    } else {
      this.css.netName = 'has-error';
    }
  }

  /*check phone*/
  checkPhone(value) {
    let flag = this.CheckValue.checkPhoneNum(value);
    if (value === '' || value == null || !flag) {
      this.css.phone = 'has-error';
      return;
    }
    if (flag) {
      this.Registerhttp.checkInformation('phone', value).subscribe(res => {
        if (res.code === '000000') {
          this.css.phone = 'has-success';
        } else {
          this.css.phone = 'has-error';
          this.phoneNumRepeat = true;
        }
      });
    }
  }

  checkEmail(value) {
    let flag = this.CheckValue.checkEmail(value);
    if (value === '' || value == null || !flag) {
      this.css.email = 'has-error';
      return;
    }
    if (flag) {
      this.Registerhttp.checkInformation('email', value).subscribe(res => {
        if (res.code === '000006') {
          this.css.email = 'has-error';
          this.emailRepeat = true;
        } else {
          this.css.email = 'has-success';
        }
      });
    }
  }

  registerConfirm() {
    if (this.css.userName === 'has-error') {
      return;
    } else if (this.css.psd === 'has-error') {
      return;
    } else if (this.css.confirmPsd === 'has-error') {
      return;
    } else if (this.css.netName === 'has-error') {
      return;
    } else if (this.css.phone === 'has-error') {
      return;
    } else if (this.css.email === 'has-error') {
      return;
    } else if (this.css.userName === '') {
      this.css = {
        userName: 'has-error',
        psd: 'has-error',
        confirmPsd: '',
        netName: '',
        phone: 'has-error',
        email: 'has-error'
      };
      return;
    }

    this.register();
  }

  getStartDate(e) {
    console.log(e);
    let date = new Date(e);
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    let birthday = date.getFullYear() + '-' + month + '-' + day;
    console.log(birthday);
    this.registerInfos.birthday = birthday;
  }

  /*市区联动*/
  associatedCtiyArea() {
    /*获取城市*/
    this.HttpRequest.getCities(this.registerInfos.province).subscribe((resNext: any) => {
      this.getCities = JSON.parse(resNext.data);
      this.registerInfos.city = this.getCities[0][0];
      /*获取区域*/
      this.HttpRequest.getArea(this.registerInfos.city).subscribe( (res: any) => {
        this.getArea = JSON.parse(res.data);
        this.registerInfos.district = this.getArea[0][0];
      });
    });
  }

  changeProvince(val) {
    for (let item of this.getProvinces) {
      if (val === item[1]) {
        this.registerInfos.province = item[0];
        break;
      }
    }
    this.associatedCtiyArea();
  }

  changeCity(val) {
    for (let item of this.getCities) {
      if (val === item[1]) {
        this.registerInfos.city = item[0];
        break;
      }
    }
    this.HttpRequest.getArea(this.registerInfos.city).subscribe( (res: any) => {
      this.getArea = JSON.parse(res.data);
      this.registerInfos.district = this.getArea[0][0];
    });
  }

  changeArea(val) {
    for (let item of this.getArea) {
      if (val === item[1]) {
        this.registerInfos.district = item[0];
        break;
      }
    }
  }
}

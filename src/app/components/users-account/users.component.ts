import { Component, OnInit } from '@angular/core';
import { CheckValueService } from '../../service/check-value.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit{
  constructor(
    private CheckValue: CheckValueService
  ) {}

  userInfos = { // 用户信息
    netName: '',
    phone: '',
    birthday: '',
    province: '',
    city: '',
    area: '',
  };
  userInfosStyle = {
    netName: false,
    phone: false,
  };
  ngOnInit() {
  }

  checkPhone(val) {
    if (this.CheckValue.checkPhoneNum(val)) {
      this.userInfosStyle.phone = false;
    }
  }

  /*更新用户信息-确定*/
  updateUsersInfos() {
    console.log(2222);
    let flag = false;
    if (this.userInfos.netName.length > 15) {
      this.userInfosStyle.netName = true;
      flag = true;
    }
    if (!this.CheckValue.checkPhoneNum(this.userInfos.phone)) {
      this.userInfosStyle.phone = true;
      flag = true;
    }
    // if(this.userInfos.phone)
    $('.icon-danger').each(function(){
      console.log(222222222222);
      return;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { CheckValueService } from '../../service/check-value.service';
import * as $ from 'jquery';
import {RegisterService} from '../../service/register.service';
import { HttpRequestService } from '../../service/http-request.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  constructor(
    private CheckValue: CheckValueService,
    public registerService: RegisterService,
    public HttpRequest: HttpRequestService
  ) {}

  userInfos = { // 用户信息
    netName: '',
    phone: '',
    birthday: '',
    province: '',
    city: '',
    area: '',
  };
  userInfosStyle = { // 判断用户信息是否输入正确
    netName: false,
    phone: false,
    phoneRepeat: false,
    email: false,
    emailRepeat: false
  };
  // searchInfos = {
  //   userId: '31', // 用户id
  //   fromTime: null, // startTime
  //   toTime: null,  // endTime
  //   typeOfGoods: null,
  //   thankWay: null,
  //   pageNo: 1,
  //   pageSize: 10,
  //   id: '',  // 物品id
  //   province: '',
  //   district: '',
  //   city: ''
  // };
  getProvinces: any;
  getCities: any;
  
  searchInfos: any; // 搜索条件
  pagesConfig: any;
  renderData: any;
  ngOnInit() {
    this.pagesInfos();
    this.searchCondition();
    this.getData();
    /*更新用户信息时用的*/
    this.HttpRequest.getProvence().subscribe( (res: any) => {
      this.getProvinces = JSON.parse(res.data);
      this.userInfos.province = this.getProvinces[0][0];
    });
    this.getCities = [];
  }

  /*获取用户数据*/
  getData() {
    this.HttpRequest.searchGoods(this.searchInfos).subscribe( (res: any) => {
      console.log(res);
      this.renderData = JSON.parse(res.data.goods);
      console.log(this.renderData);
    });
  }
  pagesInfos() {
    this.pagesConfig = {
      pageSize: 10,
      pageNum: 1
    };
  }

  searchCondition() {
    this.searchInfos = { // 查找用户数据
      userId: '31',
      pageNo: this.pagesConfig.pageNum,
      pageSize: this.pagesConfig.pageSize,
    };
  }

  checkPhone(val) {
    if (this.CheckValue.checkPhoneNum(val)) {
      this.registerService.checkInformation('phone', val).subscribe( (res: any) => {
        if (res.code === '000005') {
          this.userInfosStyle.phone = false; // 不显示
          this.userInfosStyle.phoneRepeat = true; // 显示
        } else {
          this.userInfosStyle.phone = false;
          this.userInfosStyle.phoneRepeat = false;
        }
      });
    } else {
      this.userInfosStyle.phone = true;
      this.userInfosStyle.phoneRepeat = false;
    }
  }

  /*更新用户信息-确定*/
  updateUsersInfos() {
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
      // console.log(222222222222);
      return;
    });

    if (flag) {
      return;
    }

    console.log(this.userInfos);
    $('.update-user-infos').fadeOut(500);
  }

  /*更新用户信息-取消*/
  cancelUpdateUsersInfos(){
    $('.update-user-infos').fadeOut(500);
  }

  chooseCity(val) {
    for (let item of this.getProvinces) {
      if (val === item[1]) {
        this.userInfos.province = item[0];
        break;
      }
    }

    if (this.userInfos.province != '110000' && this.userInfos.province != '310000' && this.userInfos.province != '120000' && this.userInfos.province != '500000') {
      this.HttpRequest.getCities(this.userInfos.province).subscribe(res => {
        this.getCities = JSON.parse(res.data);
        this.userInfos.city = this.getCities[0][0];
      });
    }
  }

  formatCity(val) {
    for (let item of this.getCities) {
      if (val === item[1]) {
        this.userInfos.city = item[0];
        break;
      }
    }
  }

  showUserInfos() {
    $('.update-user-infos').fadeIn(500);
  }

}

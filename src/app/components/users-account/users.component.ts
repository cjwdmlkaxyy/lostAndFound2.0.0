import { Component, OnInit } from '@angular/core';
import { CheckValueService } from '../../service/check-value.service';
import * as $ from 'jquery';
import {RegisterService} from '../../service/register.service';
import { HttpRequestService } from '../../service/http-request.service';
import { stringify } from '@angular/compiler/src/util';

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

  getProvinces: any;
  getCities: any;
  searchInfos: any; // 搜索条件
  pagesConfig: any;
  renderData: any;
  deleteItemId = [];

  ngOnInit() {
    this.pagesInfos();
    this.searchCondition();
    this.getData();
    this.getProvince();
    this.getCities = [];
  }

  /*get province*/
  getProvince() {
    this.HttpRequest.getProvence().subscribe( (res: any) => {
      this.getProvinces = JSON.parse(res.data);
      this.userInfos.province = this.getProvinces[0][0];
    });
  }

  /*获得用户信息*/
  getUserInfos() {
  //  后台还没有做该功能
  }

  /*获取用户数据*/
  getData() {
    console.log(this.searchInfos);
    this.HttpRequest.searchGoods(this.searchInfos).subscribe( (res: any) => {
      this.renderData = JSON.parse(res.data.goods);
      this.pagesConfig.totalPages = res.data.pageCount;
      this.pagesConfig.totalNum = 40;
      console.log(this.renderData);
    });
  }
  pagesInfos() {
    this.pagesConfig = {
      pageSize: 10,
      pageNum: 1,
      totalPages: '', // 总页数
      totalNum: null, // 总条数
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
    $('.icon-danger').each(function(){
      // console.log(222222222222);
      return;
    });

    if (flag) {
      return;
    }

    console.log(this.userInfos);
    this.registerService.updateUsersInfos(this.userInfos).subscribe( (res: any) => {
      console.log(res);
      $('.update-user-infos').fadeOut(500);
    }, (err: any) => {
      console.log('系统错误，请稍候重试');
    });

  }

  /*更新用户信息-取消*/
  cancelUpdateUsersInfos() {
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

  /*翻页*/
  changePage(e) {
    this.searchInfos.pageNo = e;
    this.getData();
  }

  /*删除数据*/
  deleteData(val) {
    let data = stringify(val);
    this.deleteItemId = [];
    this.deleteItemId.push(data);
    $('.delete-layer').fadeIn(200);
  }
  /*删除-确定、取消*/
  confirmDel() {
    this.HttpRequest.deletegoods(this.deleteItemId).subscribe((res: any) => {
      console.log(res);
      if (res.code !== '999999') {
        $('.delete-layer').fadeOut(200);
      }
    }, (err: any) => {
      console.log(err);
    });
  }
  cancelDel() {
    $('.delete-layer').fadeOut(200);
  }
  closeDeleteLayer() {
    // $('.delete-layer').fadeOut(200);
  }

}

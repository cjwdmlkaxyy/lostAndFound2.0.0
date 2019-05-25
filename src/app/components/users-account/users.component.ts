import { Component, OnInit } from '@angular/core';
import { CheckValueService } from '../../service/check-value.service';
import * as $ from 'jquery';
import {RegisterService} from '../../service/register.service';
import { HttpRequestService } from '../../service/http-request.service';
import { stringify } from '@angular/compiler/src/util';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  constructor(
    private CheckValue: CheckValueService,
    public registerService: RegisterService,
    public HttpRequest: HttpRequestService,
    private nzMessage: NzMessageService,
    private route: Router
  ) {}

  showNetname: string;
  userInfos = { // 更新用户信息
    id: JSON.parse(localStorage.getItem('userInfos')).id,
    netName: '',
    phone: '',
    email: '',
    birthday: null,
    province: '',
    city: '',
    district: '',
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
  getDistricts: any;
  searchInfos: any; // 搜索条件
  pagesConfig: any;
  renderData: any;
  deleteItemId = [];
  showLoading = false;
  beforeUpdatePhone = '';
  beforeUpdateEmail =  '';
  test123: boolean;

  ngOnInit() {
    this.pagesInfos();
    this.getUserInfos();
    this.searchCondition();
    this.getData();
    this.getCities = [];
  }

  /*get province city district*/
  getInitArea() {
    this.HttpRequest.getProvence().subscribe( (res: any) => {
      this.getProvinces = JSON.parse(res.data);
      // this.userInfos.province = this.getProvinces[0][0];
    });
    /*获取城市*/
    this.HttpRequest.getCities(this.userInfos.province).subscribe(res1 => {
      this.getCities = JSON.parse(res1.data);
      // this.userInfos.city = this.getCities[0][0];
    });
    /*获取区域*/
    this.HttpRequest.getArea(this.userInfos.city).subscribe( (res2: any) => {
      this.getDistricts = JSON.parse(res2.data);
      // this.userInfos.district = this.getDistricts[0][0];
    });
  }

  /*获取用户数据*/
  getData() {
    this.HttpRequest.searchGoods(this.searchInfos).subscribe( (res: any) => {
      this.renderData = JSON.parse(res.data.goods);
      console.log(this.renderData);
      this.pagesConfig.totalPages = res.data.pageCount;
      this.pagesConfig.totalNum = res.data.recordCount;
      this.showLoading = false;
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
      userId: JSON.parse(localStorage.getItem('userInfos')).id,
      pageNo: this.pagesConfig.pageNum,
      pageSize: this.pagesConfig.pageSize,
    };
  }

  checkPhone(val) {
    if (val === this.beforeUpdatePhone) {
        this.userInfosStyle.phone = false;
        this.userInfosStyle.phoneRepeat = false;
        return;
    }
    if (this.CheckValue.checkPhoneNum(val)) {
      this.registerService.checkInformation('phone', val).subscribe( (res: any) => {
        if (res.code === '000005') {
          this.userInfosStyle.phone = false; // 不显示
          this.userInfosStyle.phoneRepeat = true; // 显示
        } else {
          this.userInfosStyle.phone = false;
          this.userInfosStyle.phoneRepeat = false;
        }
      }, (err: any) => {
        this.userInfosStyle.phone = false;
          this.userInfosStyle.phoneRepeat = false;
      });
    } else {
      this.userInfosStyle.phone = true;
      this.userInfosStyle.phoneRepeat = false;
    }
  }

  checkEmail(val) {
    if (val === this.beforeUpdateEmail) {
          this.userInfosStyle.email = false;
          this.userInfosStyle.emailRepeat = false;
          return;
    }
    if (this.CheckValue.checkEmail(val)) {
      this.registerService.checkInformation('email', val).subscribe((res: any) => {
        if (res.code === '000005') {
          this.userInfosStyle.email = false; // 不显示
          this.userInfosStyle.emailRepeat = true; // 显示
        } else {
          this.userInfosStyle.email = false;
          this.userInfosStyle.emailRepeat = false;
        }
      }, (err: any) => {
          this.userInfosStyle.email = false;
          this.userInfosStyle.emailRepeat = false;
      });
    } else {
      this.userInfosStyle.email = true;
      this.userInfosStyle.emailRepeat = false;
    }
  }

  /*获取用户数据*/
  getUserInfos() {
    this.registerService.getUserInfos(this.userInfos.id).subscribe((res: any) => {
      console.log(res);
      let data = JSON.parse(res.data);
      this.beforeUpdateEmail = data[0].email;
      this.beforeUpdatePhone = data[0].phone;
      this.userInfos.netName = data[0].netName;
      this.userInfos.phone = data[0].phone;
      this.userInfos.birthday = new Date(data[0].birthday);
      this.userInfos.email = data[0].email;
      this.userInfos.province = data[0].province;
      this.userInfos.city = data[0].city;
      this.userInfos.district = data[0].district;
      this.showNetname = this.userInfos.netName;
      this.getInitArea();
      console.log(data);
    }, (err: any) => {
      console.log(err);
    });
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
    $('.icon-danger').each(function() {
      return;
    });

    if (flag) {
      return;
    }

    this.registerService.updateUsersInfos(this.userInfos).subscribe( (res: any) => {
      if (res.code === '000000') {
        $('.update-user-infos').fadeOut(500);
        this.nzMessage.create('success', '修改成功');
        this.ngOnInit();
      } else if (res.code === '999999') {
        this.nzMessage.create('error', '系统错误请稍后重试');
      }

    }, (err: any) => {
      console.log('系统错误，请稍候重试');
      this.nzMessage.create('error', '修改失败');
    });

  }

  /*更新用户信息-取消*/
  cancelUpdateUsersInfos() {
    $('.update-user-infos').fadeOut(500);
  }

  changeProvince(val) {
    for (let item of this.getProvinces) {
      if (val === item[1]) {
        this.userInfos.province = item[0];
        break;
      }
    }
    this.HttpRequest.getCities(this.userInfos.province).subscribe(res => {
      this.getCities = JSON.parse(res.data);
      this.userInfos.city = this.getCities[0][0];

      this.HttpRequest.getArea(this.userInfos.city).subscribe((res: any) => {
        this.getDistricts = JSON.parse(res.data);
        this.userInfos.district = this.getDistricts[0][0];
      });
    });
  }

  changeCity(val) {
    for (let item of this.getCities) {
      if (val === item[1]) {
        this.userInfos.city = item[0];
        break;
      }
    }

    this.HttpRequest.getArea(this.userInfos.city).subscribe((res: any) => {
      this.getDistricts = JSON.parse(res.data);
      this.userInfos.district = this.getDistricts[0][0];
    });
  }

  changeArea(val) {
    for (let item of this.getDistricts) {
      if (val === item[1]){
        this.userInfos.district = item[0];
        break;
      }
    }
  }

  showUserInfos() {
    this.getUserInfos();
    $('.update-user-infos').fadeIn(200);
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
      if (res.code !== '999999') {
        $('.delete-layer').fadeOut(200);
        this.getData();
        this.nzMessage.success('删除成功');
      }
    }, (err: any) => {
      console.log(err);
      this.nzMessage.error('系统错误，请稍候再试');
    });
  }
  cancelDel() {
    $('.delete-layer').fadeOut(200);
  }
  closeDeleteLayer() {
    // $('.delete-layer').fadeOut(200);
  }

  formatDate(e) {
    let date = new Date(e);
    this.userInfos.birthday = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  updateGoodsStatus(id, val) {
    const obj = {
      id: id,
      status: val
    };
    this.route.navigate(['user'])
    this.HttpRequest.updateGoodsStatus(obj).subscribe( res => {
      this.nzMessage.success('修改成功');
      this.getData();
    }, err => {
      console.log(err);
      this.nzMessage.error('系统错误，请稍候重试');
    });
  }

}

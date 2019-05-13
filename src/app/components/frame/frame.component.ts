import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicDateService } from '../../service/public-date.service';
import { CommunicateWithHeaderService } from '../../service/communicateWithHeader.service';
import { HttpRequestService } from '../../service/http-request.service';
import { PublicService } from '../../service/public.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  userName = null;
  location = {
    city: ['', '成都市'] // 由于懒得改，所以就随便写个值
  }; // 所在地
  currentCityObj: any;
  link = [];

  userInfosFlag = localStorage.getItem('userInfos');
  userInfos: any = localStorage.getItem('userInfos');

  constructor(public PublicDate: PublicDateService,
              private communicateWithHeader: CommunicateWithHeaderService,
              private httpResquest: HttpRequestService,
              private publicServe: PublicService) {
    /*
    * 实现fixed时横向滚动
    * */
    window.onscroll = function () {
      let s1 = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
      $('header').css('left', s1 + 'px');
    };
  }

  ngOnInit() {
    // this.link = this.PublicDate.link;
    // 避免重复加载
    if (this.PublicDate.getAllCities.length === 0) {
      this.PublicDate.getProvince(); // 加载所有城市，更好的用户体验
    }
    if (this.userInfosFlag) {
      this.userInfos = JSON.parse(this.userInfosFlag);
      if (this.userInfos.name === '' || this.userInfos.name === null) {
        this.userName = this.userInfos.username;
      } else {
        this.userName = this.userInfos.name;
      }
      this.location.city = [''];
      if (this.userInfos.cityName === '市辖区') {
        this.location.city.push(this.userInfos.provinceName);
      } else {
        this.location.city.push(this.userInfos.cityName);
      }
      console.log(this.userInfos);
    }
    this.communicateWithHeader.getMessages().subscribe( res => {
      console.log(res);
      this.location = res;
      this.currentCityObj = res.city;
    });
    this.getLinks();
  }

  /*退出登录*/
  logOut() {
    localStorage.setItem('userInfos', '');
    localStorage.setItem('token', '');
  }

  getLinks() {
    this.httpResquest.getLinks().subscribe(res => {
      const data = JSON.parse(res.data.data);
      this.link = data;
      console.log(data);
    }, err => {
      console.log(err);
      this.publicServe.error();
    });
  }

}

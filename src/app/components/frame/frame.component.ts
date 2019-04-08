import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicDateService } from '../../service/public-date.service';
import { CommunicateWithHeaderService } from '../../service/communicateWithHeader.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  userName = null;
  loction: any; // 所在地
  currentCityObj: any;

  userInfosFlag = localStorage.getItem('userInfos');
  userInfos: any = localStorage.getItem('userInfos');

  constructor(public PublicDate: PublicDateService,
              private communicateWithHeader: CommunicateWithHeaderService) {
    /*
    * 实现fixed时横向滚动
    * */
    window.onscroll = function () {
      let s1 = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
      $('header').css('left', s1 + 'px');
    };
  }

  ngOnInit() {
    // 避免重复加载
    if (this.PublicDate.getAllCities.length === 0) {
      this.PublicDate.getProvince(); // 加载所有城市，更好的用户体验
    }
    if (this.userInfosFlag !== null || this.userInfosFlag !== '') {
      this.userInfos = JSON.parse(this.userInfosFlag);
      if (this.userInfos.name === '' || this.userInfos.name === null) {
        this.userName = this.userInfos.username;
      } else {
        this.userName = this.userInfos.name;
      }
      console.log(this.userInfos);
    }
    console.log(this.loction);
    this.communicateWithHeader.getMessages().subscribe( res => {
      console.log(res);
      this.loction = res;
      this.currentCityObj = res.city;
    });
  }

  /*退出登录*/
  logOut() {
    localStorage.setItem('userInfos', '');
    localStorage.setItem('token', '');
  }

}

import { Component, OnInit, DoCheck } from '@angular/core';
import { PublicDateService } from '../../service/public-date.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit, DoCheck {

  userName: string;
  loction: any; // 所在地


  constructor(public PublicDate: PublicDateService) {
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
  }

  ngDoCheck() {
    this.userName = localStorage.getItem('userName');
    this.loction = JSON.parse(localStorage.getItem('locationCity'));
    console.log(this.loction);
  }

}

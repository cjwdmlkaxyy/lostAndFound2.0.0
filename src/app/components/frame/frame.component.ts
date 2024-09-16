import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  constructor() {
    /*
    * 实现fixed时横向滚动
    * */
    window.onscroll = function () {
      let s1 = -Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
      $('header').css('left',s1+'px');
    }
  }

  ngOnInit(){
  }

}

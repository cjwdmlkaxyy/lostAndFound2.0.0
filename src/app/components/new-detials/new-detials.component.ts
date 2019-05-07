import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ViewChild, AfterViewInit } from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';

import { PublishLeaveWordsComponent } from '../publish-leave-words/publish-leave-words.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-new-detials',
  templateUrl: './new-detials.component.html',
  styleUrls: ['./new-detials.component.scss']
})
export class NewDetialsComponent implements OnInit {

  @ViewChild(PublishLeaveWordsComponent)
    private LeaveWordsComponent: PublishLeaveWordsComponent;

  id: any;
  leaveWordFlag: string;
  searchCondition = {
    id: null
  };
  questionLists = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public httpRequest: HttpRequestService
  ) {
    this.route.params.subscribe((params: Params) => {
        localStorage.setItem('goodsId', params.id);
        this.searchCondition.id = localStorage.getItem('goodsId');
    });
  }

  renderData: any;

  leaveWordsInfos = {
    goodsId: this.searchCondition.id,
    message: '',
    userId: null
  };
  userInfos = localStorage.getItem('userInfos');

  ngOnInit() {

    $('#leaveWords').hide();
    this.leaveWordFlag = 'leaveWords';
    this.getData();
    console.log(this.userInfos);
    if (this.userInfos) {
      this.leaveWordsInfos.userId = JSON.parse(this.userInfos);
    }
  }
  /*我要留言*/
  leaveWords() {
    $('#leaveWords').fadeIn(200);
    this.leaveWordFlag = 'publishWords';
  }
  /*发表留言*/
  publishWords() {
    $('#leaveWords').fadeOut(200);
    this.leaveWordFlag = 'leaveWords';
  }
  answerLayer() {
    $('#answer').fadeIn(200);
  }
  getData() {
    this.httpRequest.searchGoods(this.searchCondition).subscribe( (res: any) => {
      console.log(res);
      this.renderData = JSON.parse(res.data.goods);
      console.log(this.renderData);
      if (this.renderData.findGoodsQuestion1 !== '') {
          let obj = {
            key: '问题一',
            val: this.renderData[0].findGoodsQuestion1
          };
          this.questionLists.push(obj);
      }
      if (this.renderData.findGoodsQuestion2 !== '') {
          let obj = {
            key: '问题二',
            val: this.renderData[0].findGoodsQuestion2
          }
          this.questionLists.push(obj);
      }
      if (this.renderData.findGoodsQuestion3 !== '') {
          let obj = {
            key: '问题三',
            val: this.renderData[0].findGoodsQuestion3
          }
          this.questionLists.push(obj);
      } 
    }, (err: any) => {
      console.log(err);
    });
  }

  /*回答问题-确定，取消*/
  confirmAnswer() {
    $('#answer').fadeOut(200);
  }
  cancleAnswer() {
    $('#answer').fadeOut(200);
  }
}

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ViewChild, AfterViewInit } from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';
import { PublishLeaveWordsComponent } from '../publish-leave-words/publish-leave-words.component';
import * as $ from 'jquery';
import { PublicService } from '../../service/public.service';
import { NzMessageService} from 'ng-zorro-antd';

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
    id: localStorage.getItem('goodsId')
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public httpRequest: HttpRequestService,
    private publicServe: PublicService,
    private nzMessage: NzMessageService
  ) {}

  renderData: any;

  leaveWordsInfos = {
    goodsId: localStorage.getItem('goodsId'),
    message: '',
    userId: null
  };
  userInfos = localStorage.getItem('userInfos');
  messageList = [];
  questionLists = [];
  answers: any;
  test: any;
  answerErr = false; // 回答错误
  answersList = {
    concPersion: '',
    concPhone: '',
    qq: '',
    concPlace: ''
  };
  ngOnInit() {
    // this.clearAnswer();
    this.route.params.subscribe((params: Params) => {
      localStorage.setItem('goodsId', params.id);
      this.searchCondition.id = params.id;
    });
    $('#leaveWords').hide();
    this.leaveWordFlag = 'leaveWords';
    this.getData();
    console.log(this.userInfos);
    if (this.userInfos) {
      this.leaveWordsInfos.userId = JSON.parse(this.userInfos).id;
    }
  }
  /*我要留言*/
  leaveWords() {
    this.leaveWordsInfos.message = null;
    $('#leaveWords').fadeIn(200);
    this.leaveWordFlag = 'publishWords';
  }
  /*发表留言*/
  publishWords() {
    if (!this.leaveWordsInfos.userId) {
      this.nzMessage.info('请先登录');
      return;
    }
    if (!this.leaveWordsInfos.message) {
      this.nzMessage.info('请输入留言内容');
      return;
    }
    this.httpRequest.publishLeaveWords(this.leaveWordsInfos).subscribe(res => {
      $('#leaveWords').fadeOut(200);
      this.leaveWordFlag = 'leaveWords';
    }, err => {
      console.log(err);
      this.publicServe.error();
    });
  }

  clearAnswer() {
    this.answers = {
      goodId: this.searchCondition.id,
      findGoodsAnswer1: null,
      findGoodsAnswer2: null,
      findGoodsAnswer3: null
    };
    $('#answer input').each(function () {
      console.log(this);
      $(this).val(null);
    });
  }
  getData() {
    this.httpRequest.searchGoods(this.searchCondition).subscribe( (res: any) => {
      this.renderData = JSON.parse(res.data.goods);
      this.messageList = this.renderData[0].message;
      console.log(this.renderData);
      let obj = null;
      if (this.renderData[0].findGoodsQuestion1) {
          obj = {
            key: '问题一',
            val: this.renderData[0].findGoodsQuestion1,
          };
          this.questionLists.push(obj);
      }
      if (this.renderData[0].findGoodsQuestion2) {
          obj = {
            key: '问题二',
            val: this.renderData[0].findGoodsQuestion2,
          };
          this.questionLists.push(obj);
      }
      if (this.renderData[0].findGoodsQuestion3) {
          obj = {
            key: '问题三',
            val: this.renderData[0].findGoodsQuestion3,
          };
          this.questionLists.push(obj);
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  /*回答问题-确定，取消*/
  answerLayer() {
    this.clearAnswer();
    $('#answer').fadeIn(200);
  }

  confirmAnswer() {
    const _this = this;
    $('#answer input').each(function (i) {
      _this.answers['findGoodsAnswer' + (i + 1)] = $(this).val();
    });
    this.httpRequest.answerQuestion(this.answers).subscribe((res: any) => {
      console.log(res);
      if (!this.publicServe.checkResponse(res.code)) {
        if (res.data.info === '输入答案有误') {
          this.answerErr = true;
        } else {
          const startIndex = res.data.info.indexOf('(');
          const endIndex = res.data.info.indexOf(')');
          const string = res.data.info.substring(startIndex + 1, endIndex);
          const array = string.split(',');
          for (const i of array) {
            const arr = i.split('=');
            if (arr[0].trim() in this.answersList) {
              this.answersList[arr[0].trim()] = arr[1];
            }
          }
        }
      }
    }, (err: any) => {
      console.log(err);
      this.publicServe.error();
    });
  }
  cancleAnswer() {
    $('#answer').fadeOut(200);
  }
}

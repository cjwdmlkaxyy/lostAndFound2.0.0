import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ViewChild, AfterViewInit } from '@angular/core';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
        console.log(params);
        this.id = params.id;
    });
  }

  ngOnInit() {

    $('#leaveWords').hide();
    this.leaveWordFlag = 'leaveWords';
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
}

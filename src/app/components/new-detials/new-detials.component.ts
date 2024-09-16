import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ViewChild, AfterViewInit } from '@angular/core';

import { PublishLeaveWordsComponent } from '../publish-leave-words/publish-leave-words.component';

import * as $ from 'jquery'

@Component({
  selector: 'app-new-detials',
  templateUrl: './new-detials.component.html',
  styleUrls: ['./new-detials.component.scss']
})
export class NewDetialsComponent implements OnInit {

  @ViewChild(PublishLeaveWordsComponent)
    private LeaveWordsComponent: PublishLeaveWordsComponent;

  id:any;
  num = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
        console.log(params);
        this.id = params.id;
    })
  }

  ngOnInit() {

    $('#leaveWords').hide();
    this.test01();
  }

  ngOnChanges(val: any){
    console.log(val);
  }

  ngAfterViewInit(){
    console.log(2222222);
    console.log(this.LeaveWordsComponent.test());
  }

  leaveWords(){
    $('#leaveWords').fadeIn(500);
    this.num++;
    console.log(this.num);
  }

  test(val:any){
    console.log(val);
    this.leaveWords();
  }

  test01(){
    console.log(this.LeaveWordsComponent.test());
  }
}

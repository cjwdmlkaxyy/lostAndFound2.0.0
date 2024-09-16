import {Component, EventEmitter, OnInit, Output, Input, OnChanges} from '@angular/core';

import * as $ from 'jquery'

@Component({
  selector: 'app-publish-leave-words',
  templateUrl: './publish-leave-words.component.html',
  styleUrls: ['./publish-leave-words.component.scss']
})
export class PublishLeaveWordsComponent implements OnInit {

  @Output() listen = new EventEmitter<any>();
  @Input() data: any;

  testValue:string;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

  ngOnChanges(val: any){
    console.log(val);
  }

  publishMessage(){
    $('#leaveWords').fadeOut(500);
    this.listen.emit(this.testValue);
  }

  test(){
    return 'aa2222';
  }
}

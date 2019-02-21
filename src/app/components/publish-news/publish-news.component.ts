import { Component, OnInit } from '@angular/core';
import 'jquery'


@Component({
  selector: 'app-publish-news',
  templateUrl: './publish-news.component.html',
  styleUrls: ['./publish-news.component.scss']
})
export class PublishNewsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  lost(){
    $('.nav-tabs').css('border-bottom','1px rgb(225, 129, 48) solid');
    $('#myTabContent').css('border-color','rgb(225, 129, 48)');
  }

  found(){
    $('.nav-tabs').css('border-bottom','1px rgb(10, 110, 72) solid');
    $('#myTabContent').css('border-color','rgb(10, 110, 72)');
  }
}

import {Component, Input, OnInit} from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';
import 'rxjs';

import { PublicDateService } from '../../service/public-date.service';
import { CommunicateWithHeaderService } from '../../service/communicateWithHeader.service';

@Component({
  selector: 'app-lost-sth',
  templateUrl: './lost-sth.component.html',
  styleUrls: ['./lost-sth.component.scss','../home/home.component.scss']
})
export class LostSthComponent implements OnInit {

  constructor(private HttpService: HttpRequestService,
              private Source: PublicDateService,
              private communicateWithHeader: CommunicateWithHeaderService) { }

  /*
  * pagesInformation
  * */
  totalNum: number = 500;
  pageSize: number = 10;

  tags: any;

  goodsType: Array<any>;  // 物品种类
  thankWay: Array<any>;
  hotSearch: Array<any>;
  goodsSearch: any; // input框搜索
  district: Array<any>;
  startTime: any;
  endTime: any;

  searchInfos = {
    userId: '', // 用户id
    fromTime: null, // startTime
    toTime: null,  // endTime
    typeOfGoods: null,
    thankWay: null,
    pageNo: '',
    pageSize: '',
    id: '',  // 物品id
    province: '',
    district: '',
    city: ''
  };

  ngOnInit() {
    this.tags = [
      {id: 0, category: 1},
      {id: 1, category: 2},
      {id: 2, category: 1},
      {id: 3, category: 1},
      {id: 4, category: 2},
      {id: 5, category: 1},
      {id: 6, category: 2},
      {id: 7, category: 1},
      {id: 8, category: 1},
      {id: 9, category: 1},
    ];
    this.district = [];
    this.goodsType = this.Source.goodsType;
    this.hotSearch = this.Source.hotSearch;
    this.thankWay = this.Source.thankWay;

    /*this.communicateWithHeader.getMessages().subscribe( res => {
      this.getArea(res.city[0]);
    });
    console.log(this.communicateWithHeader.messagesVal);*/
    if(this.communicateWithHeader.messagesVal) {
      this.getArea(this.communicateWithHeader.messagesVal.city[0]);
    } else {
      this.getArea('510100'); // 给默认的区域是成都
    }
  }

  search(val) {
    console.log(val);
    if (typeof val === 'number') {
      this.searchInfos.typeOfGoods = val;
    } else if (typeof val === 'string') {

    } else if (typeof val === 'object') {

    }

    this.HttpService.searchGoods(this.searchInfos).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });

  }

  getArea(val) {
    this.HttpService.getArea(val).subscribe(res =>  {
      this.district = JSON.parse(res.data);
      console.log(this.district);
    }, error => {
      console.log(error);
    });

  }

  /*
 * format time
 * function: get timestamp
 * */
  getTimestamp(val, flag) {
    if (flag === 'start') {
      let startDate = new Date(val.getFullYear(), val.getMonth(), val.getDate(), 0, 0, 0);
      this.searchInfos.fromTime = startDate.getTime();
    } else {
      let endDate = new Date(val.getFullYear(), val.getMonth(), val.getDate(), 23, 59, 59);
      this.searchInfos.toTime = endDate.getTime();
    }
  }

  changePage(e){
    console.log(e);
  }
}


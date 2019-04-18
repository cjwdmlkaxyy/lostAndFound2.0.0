import {Component, Input, OnInit} from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';
import 'rxjs';

import { PublicDateService } from '../../service/public-date.service';
import { CommunicateWithHeaderService } from '../../service/communicateWithHeader.service';

@Component({
  selector: 'app-lost-sth',
  templateUrl: './lost-sth.component.html',
  styleUrls: ['./lost-sth.component.scss', '../home/home.component.scss']
})
export class LostSthComponent implements OnInit {

  constructor(private HttpService: HttpRequestService,
              private Source: PublicDateService,
              private communicateWithHeader: CommunicateWithHeaderService) { }

  /*
  * pagesInformation
  * */
  totalNum = 500;
  pageSize = 10;

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

  localCity: any; // 本市
  getProviceId: any; // 获得省id

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

    if (this.communicateWithHeader.messagesVal) {
      this.localCity = this.communicateWithHeader.messagesVal.city[0];
      if (this.localCity == '110100') { // 北京市
            this.getProviceId = '110000';
      } else if (this.localCity == '310100') { // 上海市
        this.getProviceId = '310000';
      } else if (this.localCity == '120100') { // 天津市
        this.getProviceId = '120000';
      } else if (this.localCity == '500100') { // 重庆市
        this.getProviceId = '500000';
      } else {
      this.getProviceId = this.communicateWithHeader.messagesVal.province;
      }
      this.getArea(this.localCity);
    } else {
      this.getProviceId = '510000';
      this.localCity = '510100';
      this.getArea('510100'); // 给默认的区域是成都
    }
  }

  search(flag: string, val: any) {
    console.log(flag, val);
    
    /*根据传过来的值封装数据*/
    if (flag === 'goodsType') {
      this.searchInfos.typeOfGoods = val;
    } else if (flag === 'startTime') {
      this.searchInfos.fromTime = val;
    } else if(flag === 'endTime') {
      this.searchInfos.toTime = val;
    } else if (flag === 'area' && val === '') {
      this.searchInfos.province = '';
      this.searchInfos.city = '';
      this.searchInfos.district = '';
    } else if (flag === 'area' && val !== '') {
      this.searchInfos.province = this.getProviceId;
      this.searchInfos.city = this.localCity;
      this.searchInfos.district = val;
    }
    
    console.log(this.searchInfos);
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

  /*获取搜索的开始时间和结束时间*/
  getSearchTime(val, flag) {
    if(flag === 'start') {
      let start = new Date(val.getFullYear(), val.getMonth(), val.getDate(), 0, 0, 0).getTime();
      this.search('startTime', start);
    } else {
      let end = new Date(val.getFullYear(), val.getMonth(), val.getDate(), 23, 59, 59).getTime();
      this.search('endTime', end);
    }
  }
}


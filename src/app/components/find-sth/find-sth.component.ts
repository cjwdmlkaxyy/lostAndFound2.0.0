import {Component, Input, OnInit} from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';
import 'rxjs';

import { PublicDateService } from '../../service/public-date.service';
import { CommunicateWithHeaderService } from '../../service/communicateWithHeader.service';

@Component({
  selector: 'app-find-sth',
  templateUrl: './find-sth.component.html',
  styleUrls: ['../lost-sth/lost-sth.component.scss', '../home/home.component.scss']
})
export class FindSthComponent implements OnInit {

  constructor(private HttpService: HttpRequestService,
              private Source: PublicDateService,
              private communicateWithHeader: CommunicateWithHeaderService) { }

  /*
  * pagesInformation
  * */
  tags: any;

  goodsType: Array<any>;  // 物品种类
  thankWay: Array<any>;
  hotSearch: Array<any>;
  district: Array<any>;
  startTime: any;
  endTime: any;

  /*页码信息*/
  pageConfig = {
    pageNum: 1,
    pageSize: 10,
    totalNum: null // 总条数
  };

  /*搜索条件*/
  searchInfos = {
    userId: '', // 用户id
    fromTime: null, // startTime
    toTime: null,  // endTime
    typeOfGoods: null,
    thankWay: null,
    pageNo: this.pageConfig.pageNum,
    pageSize: this.pageConfig.pageSize,
    id: '',  // 物品id
    province: '',
    district: '',
    city: '',
    infoTittle: '' // input框搜索
  };

  /*索搜时的样式*/
  searchStyle = {
    hotSearch: '',
    areaSearch: '',
    goodsTypeSearch: ''
  };

  localCity: any; // 本市
  getProviceId: any; // 获得省id
  renderData: any; // 存储数据的
  showLoading = true; // loading动画

  ngOnInit() {
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

    this.search('', '');
  }

  search(flag: string, val: any) {
    console.log(flag, val);
    
    /*根据传过来的值封装数据*/
    if (flag === 'goodsType') {
      this.searchInfos.typeOfGoods = val;
      this.searchStyle.goodsTypeSearch = val;
    } else if (flag === 'startTime') {
      this.searchInfos.fromTime = val;
    } else if(flag === 'endTime') {
      this.searchInfos.toTime = val;
    } else if (flag === 'area' && val === '') { // 区域选择-不限
      this.searchInfos.province = '';
      this.searchInfos.city = '';
      this.searchInfos.district = '';
      this.searchStyle.areaSearch = '';
    } else if (flag === 'area' && val == this.localCity) { // 区域选择-本市
      this.searchInfos.province = this.getProviceId;
      this.searchInfos.city = this.localCity;
      this.searchInfos.district = '';
      this.searchStyle.areaSearch = val;
    } else if (flag === 'area' && val !== '') { // 区域选择-区
      this.searchInfos.province = this.getProviceId;
      this.searchInfos.city = this.localCity;
      this.searchInfos.district = val;
      this.searchStyle.areaSearch = val;
    } else if ( flag === 'fuzzySearch-hot') {
      this.searchInfos.infoTittle = val;
      this.searchStyle.hotSearch = val;
    } else if ( flag === 'fuzzySearch-input') {
      this.searchInfos.infoTittle = val;
      this.searchStyle.hotSearch = '';
    } else if ( flag === 'clearInput') {
      this.searchInfos.infoTittle = '';
      this.searchStyle.hotSearch = '';
    }
    
    console.log(this.searchInfos);
    this.HttpService.searchGoods(this.searchInfos).subscribe(res => {
       this.renderData = JSON.parse(res.data.goods);
       this.pageConfig.totalNum = res.data.pageCount;
       console.log(this.renderData);
       this.showLoading = false;
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

  changePage(e){
    console.log(e);
    this.searchInfos.pageNo = e;
    this.search('', '');
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


import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { PublicDateService } from '../../service/public-date.service';
import { HttpRequestService } from '../../service/http-request.service';
import { CommunicateWithHeaderService } from '../../service/communicateWithHeader.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-switch-city',
  templateUrl: './switch-city.component.html',
  styleUrls: ['./switch-city.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SwitchCityComponent implements OnInit{
  constructor(private publicDate: PublicDateService,
              public httpRequest: HttpRequestService,
              private router: Router,
              private communicteWithHeader: CommunicateWithHeaderService) {}

  hotCity: any; // 热门城市
  directlyCity: any; // 直辖市 对象
  // directlyCities = ['北京市', '上海市', '天津市', '重庆市'];
  cities: Array<any>;  // 城市
  currentCity: any; // 当前城市

  ngOnInit() {

    this.cities  = [];
    if(this.communicteWithHeader.messagesVal) {
      this.currentCity = this.communicteWithHeader.messagesVal.city[0];
    }
    this.hotCity = this.publicDate.hotCity;
    this.directlyCity = this.publicDate.directlyCity;
    this.cities = this.publicDate.getAllCities;
  }

  /*
  * select city
  * */
  selectCity(city, province) {
    let cityObj = {
      province: province,
      city: city
    };
    this.router.navigateByUrl('frame');
    this.communicteWithHeader.sentMessages(cityObj);
    // 存储所在地
    this.communicteWithHeader.messagesVal = cityObj;
  }
}

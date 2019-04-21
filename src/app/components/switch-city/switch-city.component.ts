import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicDateService } from '../../service/public-date.service';
// import { HttpRequestService } from '../../service/http-request.service';
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
              // public httpRequest: HttpRequestService,
              private router: Router,
              private communicateWithHeader: CommunicateWithHeaderService) {}

  hotCity: any; // 热门城市
  directlyCity: any; // 直辖市 对象
  cities: Array<any>;  // 城市
  currentCity: any; // 当前城市

  ngOnInit() {

    this.cities  = [];
    if(this.communicateWithHeader.messagesVal) {
      this.currentCity = this.communicateWithHeader.messagesVal.city[0];

    }
    this.hotCity = this.publicDate.hotCity;
    this.directlyCity = this.publicDate.directlyCity;
    console.log(this.directlyCity);
    this.cities = this.publicDate.getAllCities;
  }

  /*
  * select city
  * */
  selectCity(city, province) {
    let cityObj: any = {
      province: province,
      city: city
    };
    this.router.navigateByUrl('frame');
    this.communicateWithHeader.sentMessages(cityObj);
    // 存储所在地
    this.communicateWithHeader.messagesVal = cityObj;
  }
}

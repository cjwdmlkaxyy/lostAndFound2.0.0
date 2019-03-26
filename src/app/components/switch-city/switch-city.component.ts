import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PublicDateService } from '../../service/public-date.service';
import { HttpRequestService } from '../../service/http-request.service';

@Component({
  selector: 'app-switch-city',
  templateUrl: './switch-city.component.html',
  styleUrls: ['./switch-city.component.scss']
})
export class SwitchCityComponent implements OnInit{
  constructor(private publicDate: PublicDateService,
              public httpRequest: HttpRequestService,
              private router: Router) {}

  hotCity: any; // 热门城市
  directlyCity: any; // 直辖市 对象
  // directlyCities = ['北京市', '上海市', '天津市', '重庆市'];
  cities: Array<any>;  // 城市
  currentCity: any; // 当前城市
  // citiesVal: any; // the ngModule of city



  ngOnInit() {
    this.cities  = [];

    this.hotCity = this.publicDate.hotCity;
    this.directlyCity = this.publicDate.directlyCity;
    this.cities = this.publicDate.getAllCities;
    this.currentCity = JSON.parse(localStorage.getItem('location')).cityId;
  }

  /*
  * select city
  * */
  selectCity(city, province) {
    console.log(city);
    this.router.navigateByUrl('frame');
    this.publicDate.switchCity.province = province;
    this.publicDate.switchCity.city = city[1];
    this.publicDate.switchCity.cityId = city[0];
    // 存储所在地
    localStorage.setItem('locationCity', JSON.stringify(this.publicDate.switchCity));
  }
}

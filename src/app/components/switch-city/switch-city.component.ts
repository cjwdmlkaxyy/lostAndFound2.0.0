import {Component, OnInit} from '@angular/core';
import { PublicDateService } from '../../service/public-date.service';
import { HttpRequestService } from '../../service/http-request.service';

@Component({
  selector: 'app-switch-city',
  templateUrl: './switch-city.component.html',
  styleUrls: ['./switch-city.component.scss']
})
export class SwitchCityComponent implements OnInit{
  constructor(private publicDate: PublicDateService,
              public httpRequest: HttpRequestService) {}

  hotCity: any; //热门城市
  directlyCity: any; //直辖市 对象
  directlyCities = ['北京市','上海市','天津市','重庆市'];
  cities: Array<any>;  //城市



  ngOnInit(){
    this.cities  = [];

    this.hotCity = this.publicDate.hotCity;
    this.directlyCity = this.publicDate.directlyCity;
    this.getProvince();
  }


  /*
  * get all province
  * */
  getProvince(){
    this.httpRequest.getProvence().subscribe(res => {
      let province = JSON.parse(res.data);
      console.log(province);
      for(let i = 0; i < province.length; i++){
        if(this.directlyCities.indexOf(province[i][1]) === -1){
          this.getCities(province[i]);
        }
      }
      console.log(this.cities);
    }, err => {
        console.log(err);
    });
  }

  /*
  * get cities of province
  * */
  getCities(province){
    this.httpRequest.getCities(province[1]).subscribe( res => {
        let city = JSON.parse(res.data);
        // console.log(city);
        let provinceObj = {
          name: province[1],
          val: city
        }
        this.cities.push(provinceObj);
      },err => {
      console.log(err);
    });
  }
}

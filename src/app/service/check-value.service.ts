import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CheckValueService {
  constructor(){}

  /*check userName*/
  checkUserName(value) {
    let res = /^[a-zA-Z0-9_]{4,20}$/;
    if (res.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  checkPhoneNum(val) {
    let res = /^1[3|4|5|7|8][0-9]\d{8}$/
    if(res.test(val)){
      return true;
    }else{
      return false;
    }
  }

  checkEmail(val){
    let res = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    if(res.test(val)){
      return true;
    }else{
      console.log('false');
      return false;
    }
  }
}

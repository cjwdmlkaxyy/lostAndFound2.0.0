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
}

import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})

export class PublicService {
  constructor(private nzMessage: NzMessageService) {}
  checkResponse(res) {
    if (res === '999999') {
      this.nzMessage.error('系统错误，请稍后重试');
      return true;
    }
  }
}

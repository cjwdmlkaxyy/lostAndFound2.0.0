import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommunicateWithHeaderService {
  constructor() {}
  messagesVal: any;
  // 发送消息订阅对象
  private messages = new Subject<any>();

  /*向其他组件发送信息*/
  public sentMessages(message: any) {
    this.messages.next(message);
  }

  /*订阅其他组件发送过来的消息*/
  public getMessages(): Observable<any> {
    console.log(this.messagesVal);
    return this.messages.asObservable();
  }


}


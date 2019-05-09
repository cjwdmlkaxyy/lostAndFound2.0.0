import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service';
import { NzMessageService } from 'ng-zorro-antd';
import { PublicService } from '../../service/public.service';

interface Tag {
  id: number,
  category: number; // 1:寻物 2:招领
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private httpRequest: HttpRequestService,
              private nzMessage: NzMessageService,
              private publicService: PublicService) { }

  searchInfos = {
    id: '',  // 物品id
  };
  renderData = [];
  showLoading = true;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.httpRequest.searchGoods(this.searchInfos).subscribe((res: any) => {
       this.publicService.checkResponse(res.code);
       if (!this.publicService.checkResponse(res.code)) {
           this.renderData = JSON.parse(res.data.goods);
           this.showLoading = false;
       } else {
           this.showLoading = false;
       }
      }, (err: any) => {
        console.log(err);
        this.showLoading = false;
        this.nzMessage.error('系统错误,请稍候重试');
      });
  }

}

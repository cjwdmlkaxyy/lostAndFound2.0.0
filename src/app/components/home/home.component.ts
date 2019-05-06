import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../service/http-request.service'

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

  constructor(private httpRequest: HttpRequestService) { }

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
      console.log(res);
      this.renderData = JSON.parse(res.data.goods);
      this.showLoading = false;
    }, (err: any) => {
      console.log(err);
    })
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-page',
  templateUrl: './common-page.component.html',
  styleUrls: ['./common-page.component.scss']
})
export class CommonPageComponent implements OnInit {

  constructor() { }

  @Input() totalNum: number;
  @Input() pageSize: number;

  @Output() currentIndex = new EventEmitter<number>();


  pageIndex = 1;

  ngOnInit() {

    // this.getPages(this.totalNum, this.pageSize, this.visibleNum);  //自己写的
  }

  changeData(e) {
    this.pageIndex = e;
    this.currentIndex.emit(e);
  }


  /*
  * 分页组件--自己写的
  * */
  /*
  pages:Array<number> = [];
  currentPage=1;
  // totalNum = 265;
  // pageSize = 10;
  pageNum:any;
  totalPage:any;
  visibleNum = 9;
  morePages(flag, visible){
    let startPage = this.pages[5];
    let endPage = this.pages[4];
    this.pages = [];
    let k = 1;
    if(flag == 'next'){
      for(let i=startPage; i <= this.totalPage; i++,k++){
        if(k > visible){
          break ;
        }
        this.pages.push(i);
      }
      this.currentPage = this.pages[4];
    }else{
      for(let i=this.currentPage-5; i <= endPage; i++,k++){
        if(k > visible){
          break ;
        }
        if(i > 0){
          this.pages.push(i);
        }
      }
      this.currentPage = this.pages[3];
    }
  }

  firstPage(){
    this.pages = [];
    this.getPages(this.totalNum, this.pageSize, this.visibleNum);
    this.currentPage = 1;
  }

  lastPage(){
    this.pages = [];
    let k = 1;
    for(let i = this.totalPage - 9;;i++,k++){
      if(k > this.visibleNum){
        break;
      }
      this.pages.push(i);
    }
    this.currentPage = this.pages[this.pages.length - 1];
  }

  prePage(){
    this.pageIndex--;
  }

  changePage(val){
    this.currentPage = val;
  }

  prevPage(){
    if(this.currentPage == 1){
      this.currentPage = 1;
      return ;
    }else if(this.currentPage == this.pages[0]){
      this.morePages('prev', this.visibleNum);
    }else{
      this.currentPage--;
    }
  }

  nextPage(){
    if(this.currentPage == this.totalPage){
      this.currentPage = this.pages[this.pages.length-1];
      return ;
    }

    if(this.currentPage == this.pages[this.pages.length-1]){
      this.morePages('next',this.visibleNum);
    }else{
      this.currentPage++;
    }
  }

  getPages(num, size, visible){
    this.totalPage = Math.ceil(num / size);
    for(let i=1; i <= this.totalPage; i++) {
      if(i > visible){
        break;
      }
      this.pages.push(i);
    }
  }*/

}

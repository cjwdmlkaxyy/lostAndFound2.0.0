import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  tags: Tag[];

  ngOnInit() {

    this.tags = [
      {id: 0, category: 1},
      {id: 1, category: 2},
      {id: 2, category: 1},
      {id: 3, category: 1},
      {id: 4, category: 2},
      {id: 5, category: 1},
      {id: 6, category: 2},
      {id: 7, category: 1},
      {id: 8, category: 1},
      {id: 9, category: 1}
    ];
  }

}

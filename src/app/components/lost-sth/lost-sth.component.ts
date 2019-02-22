import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lost-sth',
  templateUrl: './lost-sth.component.html',
  styleUrls: ['./lost-sth.component.scss']
})
export class LostSthComponent implements OnInit {

  constructor() { }

  tags: any;

  ngOnInit() {
    this.tags = [
      {id: 0, category:1},
      {id: 1, category:2},
      {id: 2, category:1},
      {id: 3, category:1},
      {id: 4, category:2},
      {id: 5, category:1}
    ]
  }

}


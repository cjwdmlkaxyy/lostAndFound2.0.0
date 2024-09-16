import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import 'jquery'
import {LoginService} from '../../service/login.service';


@Component({
  selector: 'app-find-sth',
  templateUrl: './find-sth.component.html',
  styleUrls: ['../lost-sth/lost-sth.component.scss','../home/home.component.scss']
})


export class FindSthComponent implements OnInit {

  tags:any;

  constructor(
    private loginService: LoginService
  ) {
  }
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

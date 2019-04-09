import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // let test = document.getElementsByClassName('glyphicon-apple');
    let test = document.getElementById('test');
    console.log(test);
    /*test[0].onclick = function () {
      console.log(2222222);
    };*/
  }

}

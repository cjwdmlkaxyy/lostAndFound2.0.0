import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import 'jquery'
import {LoginService} from '../../service/login.service';


interface Hero {
  name:string;
  emotion:string
}

@Component({
  selector: 'app-find-sth',
  templateUrl: './find-sth.component.html',
  styleUrls: ['./find-sth.component.scss']
})


export class FindSthComponent implements OnInit {

  constructor(
    private loginService: LoginService
  ) {
  }

  showSad: boolean = true;
  hero: any;
  heroes: Hero[];
  condition: boolean = true;
  date: any;
  files: any;

  name = new FormControl('');

  ngOnInit() {

    this.heroes = [
      {name: 'Romo', emotion: 'happy'},
      {name: 'Jenny', emotion: 'sad'},
      {name: 'Hanna', emotion: 'happy'},
      {name: 'Jay', emotion: 'happy'}
    ];
    this.date = new Date(2019,2,2);

  }

  /*fileChange(event){
    console.log('22222');
    this.files = event.target.files;
    let file;
    if(this.files && this.files.length >0){
      file = this.files[0];
      if(file.size > 1024 * 1024 * 2){
        console.log('图片大小不能超过2MB');
        return false;
      }

      //获取window的URL工具
      var URL = window.URL;
      var imgURL = URL.createObjectURL(file);
      $('#imgChange').attr('src',imgURL);
    }
  }*/

  upload(){
    let form11 = document.getElementById('ddd')[0].files[0];
    let fd = new FormData(form11);
    fd.append('file', form11);
    fd.append('username','5555');
    this.loginService.upload(fd).subscribe((res) =>{
      console.log(res);
    });
  }


}

/*
const secondsCounter = interval(10000);
secondsCounter.subscribe(n => console.log(`It's been ${n} seconds since subscribing1`));
*/

const apiData = ajax('/api/data');
apiData.subscribe(res => console.log(res));

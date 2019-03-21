import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FindSthComponent } from './components/find-sth/find-sth.component';
import { LostSthComponent } from './components/lost-sth/lost-sth.component';
import { PublishNewsComponent } from './components/publish-news/publish-news.component';
import { FrameComponent } from './components/frame/frame.component';
import {HighlightDirective} from './directive/highlight.directive';
import {UnlessDirective} from './directive/unless.directiva';
import {ExponentialStrengthPipe} from './pipe/exponential-strength.pipe';
import { NewDetialsComponent } from './components/new-detials/new-detials.component';
import {CheckValueDirective} from './directive/check-value.directive';
import { StatementComponent } from './components/statement/statement.component';
import { PublishLeaveWordsComponent } from './components/publish-leave-words/publish-leave-words.component';
import { CommonPageComponent } from './components/common-page/common-page.component';
import { SwitchCityComponent} from './components/switch-city/switch-city.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutUsComponent,
    FindSthComponent,
    LostSthComponent,
    PublishNewsComponent,
    FrameComponent,
    SwitchCityComponent,
    HighlightDirective,
    UnlessDirective,
    ExponentialStrengthPipe,
    NewDetialsComponent,
    CheckValueDirective,
    StatementComponent,
    PublishLeaveWordsComponent,
    CommonPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }

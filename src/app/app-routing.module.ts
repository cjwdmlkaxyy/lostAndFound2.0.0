import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {FindSthComponent} from './components/find-sth/find-sth.component';
import {LostSthComponent} from './components/lost-sth/lost-sth.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {PublishNewsComponent} from './components/publish-news/publish-news.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FrameComponent} from './components/frame/frame.component';
import {NewDetialsComponent} from './components/new-detials/new-detials.component';

const routes: Routes = [
  {path: '', redirectTo: '/frame/index', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'frame', component: FrameComponent,
  children: [
    {path: 'index', component: HomeComponent},
    {path: 'index/:id', component: NewDetialsComponent},
    {path: 'findSth', component: FindSthComponent},
    {path: 'lostSth', component: LostSthComponent},
    {path: 'aboutUs', component: AboutUsComponent},
    {path: 'publishNews', component: PublishNewsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

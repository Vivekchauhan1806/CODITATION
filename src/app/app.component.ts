import { Component, OnInit } from '@angular/core';
import { GitHubService } from './git-hub.service';
import { Iuser } from './users/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  users: Iuser[] = [];;
  usersListLength:any;
  constructor (private _gitHub: GitHubService){

  }

  ngOnInit(): void{
   
    this._gitHub.getUsers().subscribe(value =>{
      this.users = value
      this.getUsersList(this.users)
    });
   
  }

  getUsersList(arr){
    this.usersListLength = arr.length;
  }
}

import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'src/app/git-hub.service';
import { Iuser } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  pageTitle = 'User List';
  errorMessage = '';
  login = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.users;
  }

  filteredProducts: Iuser[] = [];
  users: Iuser[] = [];

  constructor(private gitHub: GitHubService) {

  }

  
  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    let x = this.users.filter((user: any) =>
    user.login.toLocaleLowerCase() == filterBy);
    return x;
  }

  
  ngOnInit(): void {

    this.gitHub.getUsers().subscribe({
      next: value =>{
      this.users = value;
     // this.filteredProducts = this.users;
    },
    error: err => this.errorMessage = err
  });

    
  }

}

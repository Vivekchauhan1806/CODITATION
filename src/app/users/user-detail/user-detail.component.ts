import { Component, OnInit } from '@angular/core';
import { Iuser } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { GitHubService } from 'src/app/git-hub.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  imageWidth = 50;
  imageMargin = 2;
  pageTitle = 'User Detail';
  errorMessage = '';
  user: Iuser | undefined;
  userData: any;
  followers:any;
  stars: any;
  

  constructor(private route: ActivatedRoute,
              private router: Router,
              private gitHubService: GitHubService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getUser(id);
    }
    if(this.user){
       
    }
  }

  getUser(id: number) {
    this.gitHubService.getUser(id).subscribe({
      next: user => this.user = user,
      error: err => this.errorMessage = err
    });
  }

  getUserData(url: string){
    this.gitHubService.getUrlData(url).subscribe({
      next: userData => this.userData = userData,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/users']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  isLoading = false;
  //This is where the user info returned from the API call will be kept.
  userInfo: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  //After implementing the function getMovies(), it's then called in the ngOnInit() lifecycle hook
  //ngOnInit() is called when Angular is done creating the component
  getUser(): void {
    this.isLoading = true;
    const user = localStorage.getItem('user');
    this.fetchApiData.getUserData(user).subscribe((resp: any) => {
      this.isLoading = true;
      this.userInfo = resp;
      console.log(this.userInfo);
      // this.router.navigate(['profile']);
      return this.userInfo;
    });
  }

  goBack(): void {
    this.router.navigate(['movies']);
  }
}

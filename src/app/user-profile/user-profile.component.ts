import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { FetchApiDataService } from '../fetch-api-data.service';

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
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  //After implementing the function getUser(), it's then called in the ngOnInit() lifecycle hook
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

  deleteUser(): void {
    this.isLoading = true;
    const user = localStorage.getItem('user');
    this.fetchApiData.deleteUser(user).subscribe((resp: any) => {
      this.isLoading = true;
      this.userInfo = resp;
      console.log(this.userInfo);
      // this.router.navigate(['profile']);
      return this.userInfo;
    });
    this.routeToWelcome();
  }

  openEditUserDialog(Name: string, Email: string, Birthday: string): void {
    this.dialog.open(EditUserComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        Name,
        Email,
        Birthday,
      },
    });
  }

  openDeleteUserDialog(): void {
    this.dialog.open(DeleteUserComponent, {
      width: 'auto',
      height: 'auto',
    });
  }

  routeToWelcome(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  goBack(): void {
    this.router.navigate(['movies']);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  isLoading = false;
  //This is where the user info returned from the API call will be kept.
  userInfo: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteUserComponent>
  ) {}

  ngOnInit(): void {}

  /**
   * Deletes user and redirects to Welcome page
   */
  deleteUser(): void {
    this.isLoading = true;
    const user = localStorage.getItem('user');
    this.fetchApiData.deleteUser(user).subscribe((resp: any) => {
      this.isLoading = true;
      this.userInfo = resp;
      console.log(this.userInfo);
      return this.userInfo;
    });
    this.routeToWelcome();
  }

  routeToWelcome(): void {
    this.dialogRef.close();
    this.router.navigate(['welcome']);
    localStorage.clear();
    this.snackBar.open('Account successfully deleted!', 'OK', {
      duration: 2000,
    });
  }

  onBackClick(): void {
    this.dialogRef.close();
  }
}

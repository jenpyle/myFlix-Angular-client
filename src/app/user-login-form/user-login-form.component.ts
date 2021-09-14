// Angular is built primarily out of components (component files), each of which
// has a "template." The template (i.e., the .component.html file) is rendered by the component
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

//Component decorator to tell Angular that the class right below is a component
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  isLoading = false;
  //Input decorator to define the component's input
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
  //called once the component has received all its inputs from the real-life user
  //a life cycle hook called by Angular to indicate that Angular is done creating the component
  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  //userData object will be passed into the API call in the userLogin function
  userLogin(): void {
    this.isLoading = true;
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        this.isLoading = true;

        // Store current user and token in localStorage.
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open('user login successful!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open('Incorrect Login credentials', 'OK', {
          duration: 5000,
        });
        this.isLoading = false;
      }
    );
  }
}

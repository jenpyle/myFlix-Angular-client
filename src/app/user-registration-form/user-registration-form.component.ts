// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//Component decorator to tell Angular that the class right below is a component
@Component({
  //defines the custom HTML element, into which this component will render
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  isLoading = false;
  //Input decorator to define the component's input
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}
  //called once the component has received all its inputs from the real-life user
  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  //userData object will be passed into the API call in the registerUser function
  registerUser(): void {
    this.isLoading = true;
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.isLoading = true;
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        this.snackBar.open('user registered successfully!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.isLoading = true;
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

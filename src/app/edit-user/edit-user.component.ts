// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  isLoading = false;
  //Input decorator to define the component's input
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  //userData object will be passed into the API call in the registerUser function
  updateUser(): void {
    this.isLoading = true;
    this.fetchApiData.putUserData(this.userData).subscribe(
      (result) => {
        console.log('hello1', result);
        this.isLoading = true;
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        localStorage.setItem('user', result.Username);
        window.location.reload();
        console.log(result);
        this.snackBar.open('user updated successfully!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result.error.errors[0].msg, 'OK', {
          duration: 5000,
        });
        this.isLoading = false;
      }
    );
  }
}

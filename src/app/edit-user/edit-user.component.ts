import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  isLoading = false;
  /**
   * Input decorator to define the component's input
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Updates userData object and closes dialog
   * in the HTML, thengModel directive binds the inputs to the userData object
   */
  updateUser(): void {
    this.isLoading = true;
    this.fetchApiData.putUserData(this.userData).subscribe(
      (result) => {
        console.log('hello1', result);
        this.isLoading = true;
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

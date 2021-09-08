import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  isLoading = false;
  //This is where the user info returned from the API call will be kept.
  // genre: any = {};
  // director = null;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public director: {
      Name: string;
      Birth: string;
      Bio: string;
    }
  ) {}
  ngOnInit(): void {}
}

// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-single-movie-view',
  templateUrl: './single-movie-view.component.html',
  styleUrls: ['./single-movie-view.component.scss'],
})

//child component of MovieCardComponent
export class SingleMovieViewComponent implements OnInit {
  //NgFor passes the data from a single movie in movie-card.component.html
  // @Input() movie: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public movie: {
      Title: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}

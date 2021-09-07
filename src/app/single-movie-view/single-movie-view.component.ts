// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-movie-view',
  templateUrl: './single-movie-view.component.html',
  styleUrls: ['./single-movie-view.component.scss'],
})

//child component of MovieCardComponent
export class SingleMovieViewComponent implements OnInit {
  //NgFor passes the data from a single movie in movie-card.component.html
  @Input() movie: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.movie.Title);
  }
}

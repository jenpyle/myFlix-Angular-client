import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-single-movie-view',
  templateUrl: './single-movie-view.component.html',
  styleUrls: ['./single-movie-view.component.scss'],
})

//child component of MovieCardComponent
export class SingleMovieViewComponent implements OnInit {
  //use constructor() to setup Dependency Injection, Initialization of class fields, etc.
  constructor(
    //injector creates dependencies, and maintains a container of dependency instances that it reuses if possible

    /**
     * Uses Inject to get details from each movie object
     * from movie-card component
     */
    @Inject(MAT_DIALOG_DATA)
    public movie: {
      Title: string;
      Actors: any[];
      Description: string;
      Director: Array<any>;
      Genre: object[];
      ImagePath: string;
      Rated: string;
      Released: string;
      Runtime: string;
      Year: string;
    }
  ) {}

  ngOnInit(): void {}
}

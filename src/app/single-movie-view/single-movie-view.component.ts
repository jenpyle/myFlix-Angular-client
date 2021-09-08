// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

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
    //any dependency that you need in your app, you must register a provider with the application's injector, so that the injector can use the provider to create new instances
    @Inject(MAT_DIALOG_DATA)
    public movie: {
      Title: string;
      Actors: any[];
      Description: string;
      // Director: object[Name: string, Bio: string, Birth: string,];
      // Director: object[];
      Director: Array<any>;
      Genre: object[];
      ImagePath: string;
      Rated: string;
      Released: string;
      Runtime: string;
      Year: string;
    }
  ) {}

  //place to write "actual work code" that we need to execute as soon as the class is instantiated
  ngOnInit(): void {
    console.log('HERE1 ', this.movie.Director);
  }
}

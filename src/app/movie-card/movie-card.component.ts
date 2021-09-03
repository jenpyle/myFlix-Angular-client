// Angular is built primarily out of components (component files), each of which
// has a "template." The template (i.e., the .component.html file) is rendered by the component
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  //This is where the movies returned from the API call will be kept
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) {}

  //After implementing the function getMovies(), it's then called in the ngOnInit() lifecycle hook
  //ngOnInit() is called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
  }

  //A function, getMovies(), is then implemented and used to fetch the movies
  //from the FetchApiDataService service with the help of getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}

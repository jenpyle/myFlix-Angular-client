// Angular is built primarily out of components (component files), each of which
// has a "template." The template (i.e., the .component.html file) is rendered by the component
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { SingleMovieViewComponent } from '../single-movie-view/single-movie-view.component';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  isLoading = false;
  //This is where the user info returned from the API call will be kept.
  userInfo: any = {};
  //This is where the movies returned from the API call will be kept
  public movies: any[] = [];

  movie = null;

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

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

  addToFav(movieID: string): void {
    this.fetchApiData.postFavMovie3(movieID).subscribe((resp: any) => {
      this.userInfo = resp;
      console.log(this.userInfo);
      return this.userInfo;
    });
  }

  RemoveFav(movieID: string): void {
    this.fetchApiData.deleteFavMovie(movieID).subscribe((resp: any) => {
      this.userInfo = resp;
      console.log(this.userInfo);
      return this.userInfo;
    });
  }

  routeToProfile(): void {
    this.isLoading = true;
    this.router.navigate(['profile']);
  }
  routeToWelcome(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        Name,
        Description,
      },
    });
  }

  openDirectorDialog(Name: string, Birth: string, Bio: string): void {
    this.dialog.open(DirectorComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        Name,
        Birth,
        Bio,
      },
    });
  }

  openSingleMovieViewDialog(
    Title: string,
    Actors: any[],
    Description: string,
    Director: Array<any>,
    Genre: object[],
    ImagePath: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Year: string
  ): void {
    this.dialog.open(SingleMovieViewComponent, {
      width: '80%',
      height: '80%',
      data: {
        Title,
        Actors,
        Description,
        Director,
        Genre,
        ImagePath,
        Rated,
        Released,
        Runtime,
        Year,
      },
    });
  }
}

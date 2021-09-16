import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DirectorComponent } from '../director/director.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { SingleMovieViewComponent } from '../single-movie-view/single-movie-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  //After implementing the function getMovies(), it's then called in the ngOnInit() lifecycle hook
  //ngOnInit() is called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  /**
   * Used to get the movies from the
   * FetchApiDataService service with the help of getAllMovies()
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Used to add a movie to the User's favorite list
   * @param movieID
   */
  addToFav(movieID: string, title: string): void {
    this.fetchApiData.postFavMovie(movieID).subscribe((resp: any) => {
      this.userInfo = resp;
      this.snackBar.open(`${title} has been added to your favorites.`, 'OK', {
        duration: 3000,
      });
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    });
    return this.getUsersFavs();
  }

  /**
   * Used to remove a movie from the User's favorite list
   * @param movieID
   */
  removeFav(movieID: string, title: string): void {
    this.fetchApiData.deleteFavMovie(movieID).subscribe((resp: any) => {
      this.userInfo = resp;
      this.snackBar.open(
        `${title} has been removed from your favorites.`,
        'OK',
        {
          duration: 3000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    });
    return this.getUsersFavs();
  }

  /**
   * gets the users favorite movies
   */
  getUsersFavs(): void {
    let name = localStorage.getItem('user');
    this.fetchApiData.getUserData(name).subscribe((resp: any) => {
      console.log('nn', resp);
      this.favs = resp.FavoriteMovies;
      console.log(this.favs, 'favs');
      return this.favs;
    });
  }

  /**
   * Compares movie id's with getUsersFavs returned list to display the favorite movie icon (heart) correctly
   * @param id
   * @returns
   */
  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

  routeToProfile(): void {
    this.isLoading = true;
    this.router.navigate(['profile']);
  }

  routeToWelcome(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
  /**
   * Used to open the Genre dialog
   * @param Name
   * @param Description
   */
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

  /**
   * Used to open the Director dialog
   * @param Name
   * @param Birth
   * @param Bio
   */
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

  /**
   *
   * @param Title
   * @param Actors
   * @param Description
   * @param Director
   * @param Genre
   * @param ImagePath
   * @param Rated
   * @param Released
   * @param Runtime
   * @param Year
   */
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

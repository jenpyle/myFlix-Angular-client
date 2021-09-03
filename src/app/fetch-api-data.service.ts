import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://jennysflix.herokuapp.com/';
//using the decorator to tell Angular that this service will be available everywhere (hence the root). This is a way of scoping services (though you won’t use it here)
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  //private namespace..is a way of initializing the instance with whatever is given as a parameter. shortcut for constructor(http: HttpClient){this.http = http;}
  constructor(private http: HttpClient) {}

  //Post new user registration api call
  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    //Using this.http, it posts it to the API endpoint and returns the API's response.
    //The pipe() function takes the functions you want to combine (catchError) as its args and return a new function that runs the composed functions in sequence.
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Post user login api call
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get one movie by title
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get director
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get genre
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Get current user data
  getUserData(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .get(apiUrl + 'users/:Username', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Post a favorite movie to user's favorites list
  postFavMovie(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(
        apiUrl + 'users/:Username/movies/favoritemovies/:MovieID',
        userDetails
      )
      .pipe(catchError(this.handleError));
  }

  //Post a movie to user's ToWatch list
  postToWatch(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users/:Username/movies/towatch/:MovieID', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Update current user's data (without password input)
  putUserData(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .put(apiUrl + 'users/:Username', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Update current user's data (WITH password input)
  putUserDataPassword(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .put(apiUrl + 'users/:Username/password', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Update current user's data (WITH password input)
  deleteUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .delete(apiUrl + 'users/:Username', userDetails)
      .pipe(catchError(this.handleError));
  }

  //Delete a favorite movie from user's favorites list
  deleteFavMovie(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .delete(
        apiUrl + 'users/:Username/movies/favoritemovies/:MovieID',
        userDetails
      )
      .pipe(catchError(this.handleError));
  }

  //Delete a movie from user's Watch list
  deleteToWatch(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .delete(apiUrl + 'users/:Username/movies/towatch/:MovieID', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    console.log('HERE0', res);
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
          `Error body is: ${error.error.errors[0].msg}`
      );
    }
    return throwError(error);
  }
}

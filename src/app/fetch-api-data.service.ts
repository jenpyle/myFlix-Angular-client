import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://jennysflix.herokuapp.com/';
//using the decorator to tell Angular that this service will be available everywhere (hence the root)
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  //
  /**
   * Post new user registration api call
   * @param userDetails
   * @returns success status
   */
  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    //The pipe() function takes the functions you want to combine (catchError) as its args and return a new function that runs the composed functions in sequence.
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Post user login api call
   * @param userDetails
   * @returns User object
   */
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all movies
   * @returns Movies object array
   */
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

  /**
   * Get one movie by title
   * @returns Movie object
   */
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

  /**
   * Get director
   * @returns Movie object
   */
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

  /**
   * Get genre
   * @param Name
   * @returns Movie object
   */
  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/' + Name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get current user data
   * @param userDetails
   * @returns User object
   */
  getUserData(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');

    console.log(userDetails);
    return this.http
      .get(apiUrl + 'users/' + userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Post a favorite movie to user's favorites list
   * @param movieID
   * @returns Movie object
   */
  postFavMovie(movieID: string): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(movieID);
    return this.http.post(
      apiUrl + 'users/' + user + '/movies/favoritemovies/' + movieID,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      }
    );
  }

  /**
   * Update current user's data (without password input)
   * @param userDetails
   * @returns User object
   */
  putUserData(userDetails: any): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(userDetails);
    return this.http
      .put(apiUrl + 'users/' + user + '/password', userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Update current user's data (WITH password input)
   * @param userDetails
   * @returns User object
   */
  putUserDataPassword(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .put(apiUrl + 'users/:Username/password', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Deletes the current user
   * @param user
   * @returns status
   */
  deleteUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(user);
    return this.http
      .delete(apiUrl + 'users/' + user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete a favorite movie from user's favorites list
   * @param movieID
   * @returns User object
   */
  deleteFavMovie(movieID: string): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(movieID);
    return this.http
      .delete(apiUrl + 'users/' + user + '/movies/favoritemovies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    console.log('HERE0', res);
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    let message;
    try {
      message = error.error.errors[0].msg;
    } catch {
      message = error.error;
    } finally {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${message}`
      );
    }
    return throwError(error);
  }
}

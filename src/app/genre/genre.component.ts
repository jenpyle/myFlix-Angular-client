import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  isLoading = false;
  //This is where the user info returned from the API call will be kept.
  // genre: any = {};

  constructor(
    // public fetchApiData: FetchApiDataService,
    // public router: Router,
    @Inject(MAT_DIALOG_DATA)
    public genre: {
      Name: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {
    // this.getGenre();
  }

  //ngOnInit() is called when Angular is done creating the component
  // getGenre(): void {
  //   this.isLoading = true;
  //   this.fetchApiData.getGenre(genreName).subscribe((resp: any) => {
  //     this.isLoading = true;
  //     this.genre = resp;
  //     console.log(this.genre);
  //     return this.genre;
  //   });
  // }

  // goBack(): void {
  //   this.router.navigate(['movies']);
  // }
}

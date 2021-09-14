import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {
  isLoading = false;

  constructor(
    /**
     * Uses Inject to get genre details from the movie object
     * from movie-card component
     */
    @Inject(MAT_DIALOG_DATA)
    public genre: {
      Name: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}

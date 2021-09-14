import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  isLoading = false;

  constructor(
    /**
     * Uses Inject to get director details from the movie object
     * from movie-card component
     */
    @Inject(MAT_DIALOG_DATA)
    public director: {
      Name: string;
      Birth: string;
      Bio: string;
    }
  ) {}
  ngOnInit(): void {}
}

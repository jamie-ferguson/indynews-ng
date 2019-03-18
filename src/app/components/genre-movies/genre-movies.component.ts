import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PageEvent } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-genre-movies',
  templateUrl: './genre-movies.component.html',
  styleUrls: ['./genre-movies.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class GenreMoviesComponent implements OnInit {

  displayedColumns = ["id", "title", "release_date", "overview"];
  length = 0;
  pageSize = 20;
  pageIndex = 1;
  pageEvent: PageEvent;
  movies:Array<any>;
  pages:Array<number>;
  movieDetails = null;
  loading = false;
  expandedMovie:any;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
      this.apiService.search.subscribe((subjectData) => this.searchMovies(subjectData.SearchTerm, subjectData.PageNumber));
      this.apiService.movies.subscribe((subjectData) => this.getMovies(subjectData.GenreID, subjectData.PageNumber));
  }

  searchMovies(term:string, page:number) {
      if(term == null){
          console.log("null term value");
          return;
      }

      // make http request to Movie DB via API service
      this.loading = true;
      this.apiService.searchMovies(term, page).subscribe(
      data => {

          this.movies= data['results'];
          this.length= data['total_results'];
          this.pageIndex= page - 1;
          this.loading = false;
      },
      error => {
          console.log(error);
      });
  }

  getMovies(genre:number, page:number) {
      if(genre == null){
          console.log("null genre value");
          return;
      }

      // make http request to Movie DB via API service
      this.loading = true;
      this.apiService.getMovies(genre, page).subscribe(
      data => {
          this.movies= data['results'];
          this.length= data['total_results'];
          this.pageIndex= page - 1;
          this.loading = false;
      },
      error => {
          console.log(error);
      });
  }

  pageChange(event){
      let movieDBPageIndex = event.pageIndex + 1;
      this.apiService.changePage(movieDBPageIndex);
  }


  getMovieDetails(movieID){
      this.movieDetails= null;

      // check to see if it is an expanding event or a closing one.
      // we don't want to make a request if an expansion row is closing.
      if(this.expandedMovie && this.expandedMovie.id === movieID){
          return;
      }

      // make http request to Movie DB via API service
      this.apiService.getDetails(movieID).subscribe(
      data => {
          console.log(data);
          this.movieDetails= data;
      },
      error => {
          console.log(error);
      });
  }



}

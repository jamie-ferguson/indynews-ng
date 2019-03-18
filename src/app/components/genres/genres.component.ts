import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres:Array<any>;
  searchInputValue;
  selectedGenreValue;
  isGenreDisabled = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
      // make http request to /api/genres
      this.apiService.getGenres().subscribe(data => {
          this.genres = data['genres'];
          this.isGenreDisabled = false;
      },
      error => {
          console.log(error);
      });
  }

  search(searchTerm){
      this.apiService.newSearch(searchTerm);
      this.selectedGenreValue = undefined;
  }

  genreChange(value) {
      this.apiService.changeGenre(value);
      this.searchInputValue = undefined;
  }

}

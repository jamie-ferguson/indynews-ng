import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private laravelAPIURL: string = "http://www.localhost:7888/api/";
  private laravelAPIURL: string = "http://88.80.187.165/api/";
  private searchOrGenre = '';
  private currentSearchTerm = '';
  private currentGenre = 0;
  private currentPage = 1;

  private moviesSubject = new BehaviorSubject<any>({});
  movies = this.moviesSubject.asObservable();

  private searchSubject = new BehaviorSubject<any>('');
  search = this.searchSubject.asObservable();

  constructor(private http:HttpClient) { }

  getGenres(){
      return this.http.get(this.laravelAPIURL + 'genres');
  }

  searchMovies(term:string, page:number){
      return this.http.get(this.laravelAPIURL + 'search?term='+term+'&page='+page);
  }

  getMovies(genre:number, page:number){
      return this.http.get(this.laravelAPIURL + 'movies?genre='+genre+'&page='+page);
  }

  getDetails(movieID){
      return this.http.get(this.laravelAPIURL + 'details?movie='+movieID);
  }


  newSearch(term){
      this.searchOrGenre = "search";
      this.currentSearchTerm=term;
      this.currentPage=1;
      this.searchSubject.next({"SearchTerm": this.currentSearchTerm, "PageNumber": this.currentPage});
  }

  changeGenre(genre:number){
      this.searchOrGenre = "genre";
      this.currentGenre=genre;
      this.currentPage=1;
      this.moviesSubject.next({"GenreID": this.currentGenre, "PageNumber": this.currentPage});
  }

  changePage(page:number){
      if(this.searchOrGenre === 'search'){
          this.currentPage=page;
          this.searchSubject.next({"SearchTerm": this.currentSearchTerm, "PageNumber": this.currentPage});
      }else if(this.searchOrGenre === 'genre'){
          this.currentPage=page;
          this.moviesSubject.next({"GenreID": this.currentGenre, "PageNumber": this.currentPage});
      }
  }

}

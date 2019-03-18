import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatTableModule, MatPaginatorModule,
         MatInputModule, MatButtonModule, MatProgressBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { GenresComponent } from './components/genres/genres.component';
import { GenreMoviesComponent } from './components/genre-movies/genre-movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

import { ApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    GenresComponent,
    GenreMoviesComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

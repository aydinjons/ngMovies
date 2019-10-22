import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { filter, map, tap, debounceTime, switchMap } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  movies = [];
  searchText: string = "";
  errorMessage: string;
  textChanged$ = new Subject<string>();

  constructor(private movieservice: MovieService) { }

  ngOnInit() {
    this.textChanged$.asObservable()
      .pipe(
        debounceTime(500),
        filter(text => text.length >= 3),
        tap(curr => console.log(curr)),
        switchMap(this.getMovies),
        map((elem: any) => ({
          ...elem,
          results: elem.results.map((item) => ({
            ...item,
            poster_path: item.poster_path ? 'http://image.tmdb.org/t/p/w185/' + item.poster_path : null
          }))
        }))
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res.results == []) {
          this.movies = [];
          this.errorMessage = res.Error;
        }
        const search = res.results;
        this.errorMessage = '';
        this.movies = search;
        console.log(this.movies);
      });
  }

  getMovies = (text) => this.movieservice.getAllMovies(text);



}

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
        switchMap(this.getMovies)
      )
      .subscribe((res: any) => {
        if (res.Response == 'False') {
          this.movies = [];
          this.errorMessage = res.Error
        }
        const search = res.Search;
        this.errorMessage = "";
        this.movies = search;
      })
  }

  getMovies = (text) => this.movieservice.getAllMovies(text);



}

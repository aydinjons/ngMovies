import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { filter,map,tap } from 'rxjs/operators';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  movies =[];
  searchText: string;
  errorMessage: string;

  constructor(private movieservice:MovieService) { }

  ngOnInit() {
  }
  
  getMovies()  {
    this.movieservice.getAllMovies(this.searchText).pipe(
      tap((data: any)=> {
        if(data.Response == 'False'){
          this.movies = [];
          this.errorMessage = data.Error
        }
      }),
      filter((data: any)=> data && data.Search),
      map((data)=> data.Search)
    )  
    .subscribe((movies :any[])=>{ 
      this.errorMessage = "";
      this.movies = movies;
    })
  }
}

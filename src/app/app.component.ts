import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Tank } from './interfaces';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allTanks: any;
  availableTanks: Array<Tank> = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .getTanks()
      .pipe(map((res: any) => res.data))
      .subscribe((data: any) => {
        this.availableTanks = Object.keys(data).map((tank: any) => ({
          name: data[tank].name,
          imgUrl: data[tank].images.big_icon,
        }));
        console.log(this.availableTanks);
      });
  }
}

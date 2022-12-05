import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { map } from 'rxjs';
import { Tank } from './interfaces';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  availableTanks!: Array<Tank>;
  scrollTanks!: Array<ElementRef>;
  @ViewChildren('tank') tanks!: QueryList<ElementRef>;

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
        this.createTanksRef();
      });
  }

  createTanksRef(): void {
    this.tanks.changes.subscribe((tank) => {
      this.scrollTanks = tank.toArray();
    });
  }

  roll(target: number): void {
    this.scrollTanks[target].nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
    this.scrollTanks[target].nativeElement.setAttribute('style', 'opacity:0.2');
    this.scrollTanks[target + 1].nativeElement.setAttribute(
      'style',
      'opacity:0.5'
    );
    this.scrollTanks[target + 3].nativeElement.setAttribute(
      'style',
      'opacity:0.5'
    );
    this.scrollTanks[target + 4].nativeElement.setAttribute(
      'style',
      'opacity:0.2'
    );
  }
}

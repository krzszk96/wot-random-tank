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
  hideview: boolean = true;
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
        this.shuffle(this.availableTanks);
        this.createTanksRef();
      });
  }

  hideView(): void {
    this.hideview = !this.hideview;
  }

  createTanksRef(): void {
    this.tanks.changes.subscribe((tank) => {
      this.scrollTanks = tank.toArray();
      console.log(this.scrollTanks);
    });
  }

  clearOpacityStyles(): void {
    this.scrollTanks.forEach((tank) => {
      tank.nativeElement.setAttribute('style', 'opacity:1');
    });
  }

  roll(): void {
    let target = this.availableTanks!.length - 5;
    this.scrollTanks[target].nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
    this.changeStyleSurroundingofTanks(target);
    console.log(this.availableTanks![target + 2].name);
  }

  reset(): void {
    this.shuffle(this.availableTanks);
    this.scrollTanks[0].nativeElement.scrollIntoView({
      behavior: 'smooth',
    });
    this.clearOpacityStyles();
  }

  shuffle(array: Array<Tank>): Array<Tank> {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  changeStyleSurroundingofTanks(target: number): void {
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

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '.././hero.service';

@Component({
  selector: 'app-procura-heroi',
  templateUrl: './procura-heroi.component.html',
  styleUrls: ['./procura-heroi.component.css']
})
export class ProcuraHeroiComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  // A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
  private buscaTermo = new Subject<string>();

  constructor(private heroService: HeroService) { }

  // Push a search term into the observable stream.
  procurarHeroi(termo: string): void {
    this.buscaTermo.next(termo);
  }

  ngOnInit(): void {
    this.heroes$ = this.buscaTermo.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((termo: string) => this.heroService.procurarHerois(termo)),
    );

  }

}

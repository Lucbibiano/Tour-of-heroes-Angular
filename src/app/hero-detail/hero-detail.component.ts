import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from './../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private heroi: HeroService, private localizacao: Location) { }

  @Input() hero: Hero;

  ngOnInit(): void{
    this.getHero();
  }

  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroi.getHero(id).subscribe(hero => this.hero = hero);
  }

  voltar(): void{
    this.localizacao.back();
  }

  salvar():void{
    this.heroi.atualizaHeroi(this.hero)
    .subscribe(() => this.voltar());
  }

}

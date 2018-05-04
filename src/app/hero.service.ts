import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { TypeModifier } from '@angular/compiler/src/output/output_ast';

//a special header in HTTP save requests
const httpOption = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class HeroService {

  private heroesUrl = 'api/herois';

  constructor(private msg: MessageService, private http: HttpClient) { }

  getHerois(): Observable<Hero[]> {
    this.msg.add('HeroService: Herois buscados.');
    // return of (HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('heroi buscado')),
        catchError(this.handleError('getHeroes',[]))
      );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error);
      this.log(operation+' failed: '+error.mensagem);
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    this.msg.add('HeroService: O heroi de ID' + id);
    // return of(HEROES.find(hero => hero.id === id));
    const url = this.heroesUrl+'/'+id;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log('Buscou heroi de id='+id)),
      catchError(this.handleError<Hero>('getHero id='+id))
    );
  }

  atualizaHeroi(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOption).pipe(
      tap(_ => this.log('update hero id='+hero.id)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  //it expects the server to generates an id for the new hero, which it returns in the Observable<Hero> to the caller.
  adicionarHeroi(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOption).pipe(
      tap((hero: Hero) => this.log('adicionou um heroi com id'+hero.id)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deletarHeroi(hero: Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = this.heroesUrl+"/"+id;

    return this.http.delete<Hero> (url, httpOption).pipe(
      tap(_ => this.log('heroi deletado id'+id)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  procurarHerois(termo: string): Observable<Hero[]>{
    if(!termo.trim()){
      return of([]);  
    }
    return this.http.get<Hero[]>('api/herois/?nome='+termo).pipe(
      tap(_ => this.log('Encontrou heroi(s) que combinam com '+termo)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TROCAR PRA TESTAR
    );
  }

  private log(mensagem: string) {
    this.msg.add('HeroService: ' + mensagem);
  }
}
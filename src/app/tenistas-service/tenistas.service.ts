import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

export interface Tenista {
  nomeTenista: string;
  sexo: string;
  classe_sigla: string;
}
export interface addTenista {
  id: number,
  nomeTenista: string;
  sexo: string;
  classe_sigla: string;
}
export interface TenistaPontos {
  id: number,
  etapa_idEtapa: number,
  nomeTenista: string,
  sexo: string,
  classe_sigla: string,
  pontuacao: number,
}

@Injectable({
  providedIn: 'root',
})
export class TenistasService {
  private readonly _currentTenista = new BehaviorSubject<any>([]);
  readonly currentTenista$ = this._currentTenista.asObservable();

  constructor(private http: HttpClient) {}

  async getTenistaByID(id: number) {
    this.http
      .get<Tenista>(`http://127.0.0.1:3000/tenistas/${id}`)
      .subscribe((res) => {
        this.currentTenista = res;
      });
    console.log(this.currentTenista);
    return this.currentTenista
  }
  async getTenistaPontosByID(id: number) {
    this.http
      .get<any>(`http://127.0.0.1:3000/tenistasPontos/${id}`)
      .subscribe((res) => {
        this.currentTenista = res;
        return this.currentTenista
      });
  }
  async deleteTenista(id: number) {
    this.http
      .delete<any>(`http://127.0.0.1:3000/deleteTenistas/${id}`)
      .subscribe((res) => {
        console.log(res)
      });
  }
  async deletePontuacao(id: number, etapa:number) {
    this.http
      .delete<any>(`http://127.0.0.1:3000/deleteScores/${id}&${etapa}`, )
      .subscribe((res) => {
        console.log(res)
      });
  }

  // async addPlayer(tenista: Tenista): Promise<Observable<Tenista>> {
  //   console.log(tenista);
  //   return this.http
  //     .post<Tenista>('http://127.0.0.1:3000/addTenista', tenista)
  //     .pipe(catchError(this.handleError));
  // }

  async editTenista(id: number, tenista: Tenista) {
    try {
      this.http
        .patch(`http://127.0.0.1:3000/updateTenistas/${id}`, tenista)
        .subscribe((res) => console.log(res));
    } catch (error) {
      console.error(error);
    }
  }
  async editPontos(id: number, etapa: number, pontos: number) {
    try {
      this.http
        .patch(`http://127.0.0.1:3000/updateScores/${id}`, {etapa, pontos})
        .subscribe((res) => console.log(res));
    } catch (error) {
      console.error(error);
    }
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  addTenista(tenista: Tenista) {
    try {
      console.log(tenista);
      // this.params.append("classe", classe);
      // console.log(this.params)
      this.http
        .post(`http://127.0.0.1:3000/tenistasGeral`, tenista)
        .subscribe((res) => console.log(res));
    } catch (error) {
      console.error(error);
    }
  }
  addPontos(idTenista: number, etapa: number, pontos: number) {
    try {
      console.log({idTenista, etapa, pontos});
      // this.params.append("classe", classe);
      // console.log(this.params)
      this.http
        .post(`http://127.0.0.1:3000/tenistasGeral`, {idTenista, etapa, pontos})
        .subscribe((res) => console.log(res));
    } catch (error) {
      console.error(error);
    }
  }
  
  set currentTenista(currentTenista: Tenista){
    this._currentTenista.next(currentTenista)
  }

  get currentTenista(){
    return this._currentTenista.getValue();
  }
}

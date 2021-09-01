import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  private URL = 'http://localhost:3000/api';

  postQuestion(question: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/agregarPregunta`, question)
  }

  postAnswer(answer: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/agregarRespuesta`, answer)
  }
}
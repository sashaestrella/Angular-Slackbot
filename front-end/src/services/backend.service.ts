import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  private URL = environment.backendUrl;

  postQuestionAndAnswers(question: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/agregarPregunta`, question)
  }

  /* postAnswer(answer: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/agregarRespuesta`, answer)
  } */
  
  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/obtenerPreguntas`);
  }

  getAnswers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/obtenerRespuestas`);
  }

  editQuestion(id: any, question: any): Observable<any> {
    return this.http.put<any>(`${this.URL}/editarPregunta/` + id, question);
  }

  deleteQuestion(id: any) {
    return this.http.delete<any>(`${this.URL}/eliminarPregunta/` + id);
  }

  /* deleteAnswer(idPregunta: any, idRespuesta: any) {
    return this.http.delete<any>(`${this.URL}/eliminarRespuesta/` + idPregunta + '/' + idRespuesta);
  } */

  editAnswers(id: any, answers: any) {
    return this.http.put<any>(`${this.URL}/editarRespuestas/` + id, answers);
  }
}
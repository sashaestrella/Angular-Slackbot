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

  /* Questions */
  postQuestionAndAnswers(question: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/agregarPregunta`, question)
  }

  postAnswers(answers: any): Observable<any> {
    return this.http.post<any>(`${this.URL}/agregarRespuestas`, answers)
  }
  
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
  
  editAnswers(id: any, answers: any) {
    return this.http.put<any>(`${this.URL}/editarRespuestas/` + id, answers);
  }

  /* Users */
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/obtenerUsuarios`);
  }

  getUsersAnswers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/obtenerRespuestasUsuarios`);
  }
}
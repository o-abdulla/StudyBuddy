import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionsAndAnswers } from '../Models/questions-and-answers';
import { Favorite } from '../Models/favorite';

@Injectable({
  providedIn: 'root'
})
export class QuestionsAnswersService {
  ShowFavorites(id: string): Favorite[] {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  GetQuestions():Observable<QuestionsAndAnswers[]>{
    return this.http.get<QuestionsAndAnswers[]>(`${this.baseUrl}QuestionsAnswers`);
  }

  GetById(id:number):Observable<QuestionsAndAnswers>{
    return this.http.get<QuestionsAndAnswers>(`${this.baseUrl}QuestionsAnswers/${id}`);
  }

  PostQuestion(questions:QuestionsAndAnswers):Observable<QuestionsAndAnswers>{
    return this.http.post<QuestionsAndAnswers>(`${this.baseUrl}QuestionsAnswers`, questions);
  }

  PutQuestion(id:number, question:QuestionsAndAnswers):Observable<QuestionsAndAnswers>{
    return this.http.put<QuestionsAndAnswers>(`${this.baseUrl}QuestionsAnswers/${id}`, question);
  }

  DeleteById(id:number):Observable<QuestionsAndAnswers>{
    return this.http.delete<QuestionsAndAnswers>(`${this.baseUrl}QuestionsAnswers/${id}`);
  }



  // Favorites

  GetFavorites(googleId:string):Observable<Favorite[]>{
    return this.http.get<Favorite[]>(`${this.baseUrl}Favorite/${googleId}`);
  }

  GetFavoriteById(id:number):Observable<Favorite>{
    return this.http.get<Favorite>(`${this.baseUrl}Favorite/${id}`);
  }

  AddFavorite(favorite:Favorite):Observable<Favorite>{
    return this.http.post<Favorite>(`${this.baseUrl}Favorite`, favorite);
  }

  PutFavorite(id:number, favorite:Favorite):Observable<Favorite>{
    return this.http.put<Favorite>(`${this.baseUrl}Favorite/${id}`, favorite);
  }

  // DeleteFavoriteById(googleId:string):Observable<Favorite>{
  //   return this.http.delete<Favorite>(`${this.baseUrl}Favorite/${googleId}`);
  // }

  DeleteFavoriteById(questionId: number, userId: string): Observable<Favorite> {
    return this.http.delete<Favorite>(`${this.baseUrl}Favorite/${questionId}/${userId}`);
  }
  
}
import { Component } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { QuestionsAndAnswers } from 'src/app/Models/questions-and-answers';
import { QuestionsAnswersService } from 'src/app/Services/questions-answers.service';

@Component({
  selector: 'app-questions-and-answers',
  templateUrl: './questions-and-answers.component.html',
  styleUrls: ['./questions-and-answers.component.css']
})
export class QuestionsAndAnswersComponent {
  QuestionsAnswersList: QuestionsAndAnswers[] = [];
  FavoritesList: Favorite[] = [];
  Question: QuestionsAndAnswers = {} as QuestionsAndAnswers;

  constructor(private _questionsAnswersService: QuestionsAnswersService) { }

  ngOnInit(): void {
    this._questionsAnswersService.GetQuestions().subscribe(response => {
      console.log(response)
      this.QuestionsAnswersList = response;
    });
  }

  newQuestion(addQuestion: QuestionsAndAnswers) {
    this._questionsAnswersService.PostQuestion(addQuestion).subscribe(response => {
      console.log(response);
      this.QuestionsAnswersList.push(response);
    });
  }

  AddFavorite(questions: string, newFavorite: QuestionsAndAnswers) {
    let favorite: Favorite = {} as Favorite;
    favorite.questionId = newFavorite.questionId;
    // fix this method call
    this._questionsAnswersService.AddFavorite(favorite).subscribe(response => {
      console.log(response);
      this.FavoritesList.push(response);
    });
  }

  DeleteQuestion(id: number): void {
    let target: number = this.QuestionsAnswersList.findIndex((Question) => Question.questionId == id);
    this.QuestionsAnswersList.splice(target, 1);

    this._questionsAnswersService.DeleteById(id).subscribe(response => {
      console.log(response);
    });
  }
}

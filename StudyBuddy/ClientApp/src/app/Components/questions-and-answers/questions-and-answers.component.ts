import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
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
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  toggleAnswer: boolean = false;
  // googleId: string = "";

  constructor(private _questionsAnswersService: QuestionsAnswersService, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.ShowQuestions();
  }

  ShowQuestions():QuestionsAndAnswers[]{
    this._questionsAnswersService.GetQuestions().subscribe((response:QuestionsAndAnswers[]) => {
      console.log(response)
      this.QuestionsAnswersList = response;
    });
    return this.QuestionsAnswersList;
  }

  newQuestion(addQuestion: QuestionsAndAnswers) {
    this._questionsAnswersService.PostQuestion(addQuestion).subscribe(response => {
      console.log(response);
      this.QuestionsAnswersList.push(response);
      addQuestion.questions = ""; // Clear the input fields
      addQuestion.answers = ""; // Clear the input fields
    });
  }

  AddFavorite(newFavorite: QuestionsAndAnswers) {
    let favorite: Favorite = {} as Favorite;
    favorite.questionId = newFavorite.questionId;
    favorite.userId = this.user.id; // Assign the user's Google ID
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

  // showAnswer(): void {
  //   this.toggleAnswer = !this.toggleAnswer;
  // }

  showAnswer(question: any): void {
    question.toggleAnswer = !question.toggleAnswer;
}

}

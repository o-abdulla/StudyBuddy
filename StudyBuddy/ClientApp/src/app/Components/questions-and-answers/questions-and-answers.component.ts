import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ChangeDetectorRef, Component } from '@angular/core';
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

  constructor(private _questionsAnswersService: QuestionsAnswersService,
    private authService: SocialAuthService,
    ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.ShowQuestions();
      this.ShowFavorites(this.user.id);
      this.FavoritesList = this._questionsAnswersService.ShowFavorites(this.user.id);
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

  AddFavorite(newFavorite: QuestionsAndAnswers, googleId: string) {
    let favorite: Favorite = {} as Favorite;
    favorite.questionId = newFavorite.questionId
    favorite.answerId = newFavorite.questionId; // still getting null for answerId in sql table
    favorite.userId = googleId; // Assign the user's Google ID
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

isFavorite(question: QuestionsAndAnswers): boolean {
  return this.FavoritesList.some(favorite => favorite.questionId === question.questionId
    && favorite.answerId === question.questionId);
}

deleteFavorite(id: number, googleId: string) {
  let target: number = this.FavoritesList.findIndex((question) => question.userId === googleId);
  this.FavoritesList.splice(target, 1);

  this._questionsAnswersService.DeleteFavoriteById(id, googleId).subscribe(response => {
    console.log(response);
  });
}

toggleFavorite(question: QuestionsAndAnswers, googleId: string): void {
  const isCurrentlyFavorite = this.isFavorite(question);

  if (isCurrentlyFavorite) {
    this.deleteFavorite(question.questionId, googleId);
  } else {
    this.AddFavorite(question, googleId);
  }
}

ShowFavorites(googleId:string): void {
  this._questionsAnswersService.GetFavorites(googleId).subscribe((response: Favorite[]) => {
    console.log(response);
    this.FavoritesList = response;
  });
  // return this.FavoritesListResult;
}

}

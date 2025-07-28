import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Favorite } from 'src/app/Models/favorite';
import { QuestionsAndAnswers } from 'src/app/Models/questions-and-answers';
import { QuestionsAnswersService } from 'src/app/Services/questions-answers.service';
import { Word } from 'src/app/Models/word';

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
  faved: boolean = false;
  // dictionaryWordResult: Word = {} as Word;
  searchWord: string = "";
  status: string = "";
  // googleId: string = "";

  constructor(private _questionsAnswersService: QuestionsAnswersService,
    private authService: SocialAuthService,
    ) { }

  ngOnInit(): void {
    let exampleShown = false;
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.ShowQuestions(this.user.id);
        this.ShowFavorites(this.user.id);
        this.FavoritesList = this._questionsAnswersService.ShowFavorites(this.user.id);
        exampleShown = true;
      } else {
        this.ShowExampleQuestions();
        exampleShown = true;
      }
    });

    // Fallback: If authState doesn't emit quickly, show examples after a short delay
    setTimeout(() => {
      if (!this.loggedIn && !exampleShown) {
        this.ShowExampleQuestions();
      }
    }, 500); // 0.5s delay, adjust as needed
  }

  ShowQuestions(userId: string): void {
    this._questionsAnswersService.GetQuestions(userId).subscribe((response: QuestionsAndAnswers[]) => {
      console.log(response);
      this.QuestionsAnswersList = response;
    });
  }

  newQuestion(addQuestion: QuestionsAndAnswers) {
    if (!addQuestion.questions.trim() || !addQuestion.answers.trim()) {
      // Display an error message or handle the lack of input
      console.error('Both questions and answers are required.');
      return;
    }
  
    // Ensure userId is set
    addQuestion.userId = this.user.id;
  
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
    favorite.answerId = newFavorite.questionId;
    favorite.userId = googleId; // Assign the user's Google ID
    this._questionsAnswersService.AddFavorite(favorite).subscribe(response => {
      console.log("add favorite",response);
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


deleteFavorite(id: number, googleId: string) {
  let target: number = this.FavoritesList.findIndex((question) => question.userId === googleId);
  this.FavoritesList.splice(target, 1);
  
  this._questionsAnswersService.DeleteFavoriteByIds(id, googleId).subscribe(response => {
    console.log("delete favorite",response);
  });
}


isFavorite(question: QuestionsAndAnswers): boolean {
  // console.log("isFavorite", question);
  return this.FavoritesList.some(favorite => favorite.questionId === question.questionId);
}

// newMethod(question: number):boolean {
//   let questionExists = false;

//   this.FavoritesList.forEach((q) =>{
//     if(q.questionId === question){
//       questionExists = true;
//     }
    
//   })
  
// return questionExists;

// }

toggleFavorite(question: QuestionsAndAnswers, googleId: string): void {
  console.log("toggleFavorite",question)
  let isCurrentlyFavorite = this.isFavorite(question);
// this.ShowFavorites(this.user.id);
  if (isCurrentlyFavorite) {
    this.deleteFavorite(question.questionId, googleId);
    this.ShowFavorites(this.user.id);
  } else {
    this.AddFavorite(question, googleId);
  }
  this.ShowFavorites(this.user.id);
}

ShowFavorites(googleId:string): void {
  this._questionsAnswersService.GetFavorites(googleId).subscribe((response: Favorite[]) => {
    console.log(response);
    this.FavoritesList = response;
  });
  // return this.FavoritesListResult;
}

ShowExampleQuestions(): void {
  this._questionsAnswersService.GetExampleQuestions().subscribe((response: QuestionsAndAnswers[]) => {
    this.QuestionsAnswersList = response;
  });
}

trackByQuestionId(index: number, question: QuestionsAndAnswers): number {
  return question.questionId;
}

// getDictionaryWord(): void{
//   this.status = "loading";
//   this._questionsAnswersService.GetWordResults(this.searchWord).subscribe((response:Word) => {
//     console.log(response);

//     this.dictionaryWordResult = response;
//     this.status = "";
//   })
// }

}

import { Component, Input, Output } from '@angular/core';
import { DictionaryWord } from 'src/app/Models/dictionary-word';
import { QuestionsAnswersService } from 'src/app/Services/questions-answers.service';
import { EventEmitter } from '@angular/core';
import { Word } from 'src/app/Models/word';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {

  searchWord: string = "";
  @Output() dictionaryWord = new EventEmitter<string>();
  dictionaryWordResult: Word = {} as Word;
  status: string = "";
  @Input() DisplayWord: Word = {} as Word;

  constructor(private _questionsAnswersService: QuestionsAnswersService

    ) { }

  ngOnInit(): void {

  }

  getDictionaryWord(): void{
    this.status = "loading";
    this._questionsAnswersService.GetWordResults(this.searchWord).subscribe((response:Word) => {
      console.log(response);

      this.dictionaryWordResult = response;
      this.status = "";
    })
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  trackByDefinition(index: number, definition: any): number {
    return index;
  }
}

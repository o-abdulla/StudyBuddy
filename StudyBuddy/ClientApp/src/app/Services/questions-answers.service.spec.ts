import { TestBed } from '@angular/core/testing';

import { QuestionsAnswersService } from './questions-answers.service';

describe('QuestionsAnswersService', () => {
  let service: QuestionsAnswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsAnswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

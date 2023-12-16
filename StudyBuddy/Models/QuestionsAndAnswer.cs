using System;
using System.Collections.Generic;

namespace StudyBuddy.Models
{
    public partial class QuestionsAndAnswer
    {
        public int QuestionId { get; set; }
        public string? Questions { get; set; }
        public string? Answers { get; set; }
    }
}

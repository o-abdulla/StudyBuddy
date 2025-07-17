using System;
using System.Collections.Generic;

namespace StudyBuddy.Models
{
    public partial class QuestionsAndAnswer
    {
        public QuestionsAndAnswer()
        {
            FavoriteAnswers = new HashSet<Favorite>();
            FavoriteQuestions = new HashSet<Favorite>();
        }

        public int QuestionId { get; set; }
        public string? Questions { get; set; }
        public string? Answers { get; set; }

        public string? UserId { get; set; }

        public virtual ICollection<Favorite> FavoriteAnswers { get; set; }
        public virtual ICollection<Favorite> FavoriteQuestions { get; set; }
    }
}

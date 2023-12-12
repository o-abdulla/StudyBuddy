using System;
using System.Collections.Generic;

namespace StudyBuddy.Models
{
    public partial class QuestionsAndAnswer
    {
        public QuestionsAndAnswer()
        {
            Favorites = new HashSet<Favorite>();
        }

        public int QuestionId { get; set; }
        public string? Questions { get; set; }
        public string? Answers { get; set; }

        public virtual ICollection<Favorite> Favorites { get; set; }
    }
}

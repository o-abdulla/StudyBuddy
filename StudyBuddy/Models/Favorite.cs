using System;
using System.Collections.Generic;

namespace StudyBuddy.Models
{
    public partial class Favorite
    {
        public int FavoriteId { get; set; }
        public string? UserId { get; set; }
        public int? QuestionId { get; set; }
        public int? AnswerId { get; set; }

        public virtual QuestionsAndAnswer? Answer { get; set; }
        public virtual QuestionsAndAnswer? Question { get; set; }
    }
}

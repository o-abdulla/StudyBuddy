using System;
using System.Collections.Generic;

namespace StudyBuddy.Models
{
    public partial class Favorite
    {
        public int FavoriteId { get; set; }
        public int? UserId { get; set; }
        public int? QuestionId { get; set; }

        public virtual QuestionsAndAnswer? Question { get; set; }
    }
}

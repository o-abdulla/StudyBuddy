using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyBuddy.Models;

namespace StudyBuddy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuestionsAnswersController : ControllerBase
    {
        StudyBuddyDBContext dBContext = new StudyBuddyDBContext();

        // GET: QuestionsAnswers/user/{userId}
        [HttpGet("user/{userId}")]
        public List<QuestionsAndAnswer> GetQuestionsByUser(string userId)
        {
            return dBContext.QuestionsAndAnswers.Where(q => q.UserId == userId).ToList();
        }

        // GET: QuestionsAnswers/examples
        [HttpGet("examples")]
        public List<QuestionsAndAnswer> GetExampleQuestons()
        {
            return dBContext.QuestionsAndAnswers.Where(q => q.UserId == null).ToList();
        }

        // GET: QuestionsAnswers/5
        [HttpGet("{id}")]
        public QuestionsAndAnswer GetById(int id)
        {
            return dBContext.QuestionsAndAnswers.Find(id);
        }

        // POST: QuestionsAnswers
        [HttpPost]
        public QuestionsAndAnswer PostQuestion([FromBody] QuestionsAndAnswer question)
        {
            dBContext.QuestionsAndAnswers.Add(question);
            dBContext.SaveChanges();
            return question;
        }

        // PUT: QuestionsAnswers/5
        [HttpPut("{id}")]
        public QuestionsAndAnswer PutQuestion(int id, [FromBody] QuestionsAndAnswer question)
        {
            dBContext.QuestionsAndAnswers.Update(question);
            dBContext.SaveChanges();
            return question;
        }

        // DELETE: QuestionsAnswers/5
        [HttpDelete("{id}")]
        public QuestionsAndAnswer DeleteById(int id)
        {
            QuestionsAndAnswer deleted = dBContext.QuestionsAndAnswers.Find(id);
            // Delete related favorites in the Favorites table
            if(deleted != null)
            {
                IEnumerable<Favorite> relatedFavorites = dBContext.Favorites.Where(f => f.QuestionId == id);
                dBContext.Favorites.RemoveRange(relatedFavorites);
            }
            dBContext.QuestionsAndAnswers.Remove(deleted);
            dBContext.SaveChanges();
            return deleted;
        }
    }
}

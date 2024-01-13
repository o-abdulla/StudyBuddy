using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyBuddy.Models;

namespace StudyBuddy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WordController : ControllerBase
    {
        [HttpGet("{word}")]
        public WordModel GetWord(string word)
        {
            return WordDAL.GetWordResults(word);
        }
    }
}

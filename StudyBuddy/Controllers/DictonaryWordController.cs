using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyBuddy.Models;

namespace StudyBuddy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DictonaryWordController : ControllerBase
    {
        [HttpGet("{word}")]
        public DictionaryModel GetTheDictionaryWord(string word)
        {
            return DictionaryModelDAL.GetDictionaryWord(word);
        }
    }
}

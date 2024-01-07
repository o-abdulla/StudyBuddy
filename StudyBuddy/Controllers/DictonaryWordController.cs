using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyBuddy.Models;

namespace StudyBuddy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DictonaryWordController : ControllerBase
    {
        [HttpGet("{word}")]
        public DictionaryModelDAL GetsDictionaryWord(string word)
        {
            return DictionaryModelDAL.GetDictionaryWord(word);
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyBuddy.Models;

namespace StudyBuddy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        StudyBuddyDBContext dBContext = new StudyBuddyDBContext();

        // GET: Favorite
        [HttpGet("{googleId}")]
        public List<Favorite> GetFavorites(string googleId)
        {
            return dBContext.Favorites.Where(g => g.UserId == googleId).ToList();
        }

        // GET: Favorite/5
        //[HttpGet("{id}")]
        //public Favorite GetFavoriteById(int id)
        //{
        //    return dBContext.Favorites.Find(id);
        //}

        // POST: Favorite
        [HttpPost]
        public Favorite AddFavorite([FromBody] Favorite newFav)
        {
            Favorite favorite = new Favorite();
            int x = 0;
            foreach (Favorite f in dBContext.Favorites)
            {
                if (newFav.UserId == f.UserId && newFav.QuestionId == f.QuestionId)
                {
                    x++;
                }
            }
            if (x == 0)
            {
                favorite.UserId = newFav.UserId;
                favorite.QuestionId = newFav.QuestionId;
                favorite.AnswerId = newFav.AnswerId;

                dBContext.Favorites.Add(favorite);
                dBContext.SaveChanges();
            }
            return favorite;
        }

        // PUT: Favorite/5
        [HttpPut("{id}")]
        public Favorite PutFavorite(int id, [FromBody] Favorite favorite)
        {
            dBContext.Favorites.Update(favorite);
            dBContext.SaveChanges();
            return favorite;
        }

        //DELETE: Favorite/5
        [HttpDelete("{id}")]
        public Favorite DeleteById(int id)
        {
            Favorite deleted = dBContext.Favorites.Find(id);
            dBContext.Favorites.Remove(deleted);
            dBContext.SaveChanges();

            return deleted;
        }

        [HttpDelete("{questionId}/{userId}")]
        public IActionResult DeleteFavoriteByIds(int questionId, string userId)
        {
            Favorite deleted = dBContext.Favorites.FirstOrDefault(f => f.QuestionId == questionId && f.UserId == userId);

            if (deleted != null)
            {
                dBContext.Favorites.Remove(deleted);
                dBContext.SaveChanges();
                return Ok(deleted);
            }

            return NotFound(); // Or you can return a different status code based on your requirements
        }
    }
}

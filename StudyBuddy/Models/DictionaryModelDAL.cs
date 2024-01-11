using Newtonsoft.Json;
using System.Net;

namespace StudyBuddy.Models
{
    public class DictionaryModelDAL
    {
        public static List<DictionaryModel> GetDictionaryWord(string word)//Adjust here
        {
            //Adjust
            //Setup
            //string deckID = Secret.deckID;
            string url = $"https://api.dictionaryapi.dev/api/v2/entries/en/{word}";

            //Request
            HttpWebRequest request = WebRequest.CreateHttp(url);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            //Converting to json
            StreamReader reader = new StreamReader(response.GetResponseStream());
            string json = reader.ReadToEnd();

            //Adjust
            //Convert to c#
            //Install Newtonsoft.json
            List<DictionaryModel> result = JsonConvert.DeserializeObject<List<DictionaryModel>>(json);
            return result;
        }

    }
}

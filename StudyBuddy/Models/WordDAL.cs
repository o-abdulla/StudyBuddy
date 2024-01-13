using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace StudyBuddy.Models
{
    public class WordDAL
    {
        public static WordModel GetWordResults(string word)//Adjust here
        {
            //adjust
            //setup
            string apiKey = Secret.apiKey;
            string Host = Secret.host;
            string url = $"https://wordsapiv1.p.rapidapi.com/words/{word}/definitions";

            //request
            HttpWebRequest request = WebRequest.CreateHttp(url);
            request.Headers.Add("X-RapidAPI-Key", apiKey);
            request.Headers.Add("X-RapidAPI-Host", Host);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            //Converting to json
            StreamReader reader = new StreamReader(response.GetResponseStream());
            string json = reader.ReadToEnd();

            //Adjust
            //Convert to C#
            //Install Newtonsoft.json
            WordModel result = JsonConvert.DeserializeObject<WordModel>(json);
            return result;
        }
    }
}


namespace StudyBuddy.Models
{
    public class WordModel
    {

        public string Word { get; set; }
        public List<DefinitionModel> Definitions { get; set; }


        public partial class DefinitionModel
        {
            public string? Definition { get; set; }
            public string PartOfSpeech { get; set; }
        }
    }
}

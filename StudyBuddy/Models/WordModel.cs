namespace StudyBuddy.Models
{
    public class WordModel
    {

        public string Word { get; set; }
        public List<Definition> Definitions { get; set; }


        public partial class Definition
        {
            public string DefinitionDefinition { get; set; }
            public string PartOfSpeech { get; set; }
        }
    }
}

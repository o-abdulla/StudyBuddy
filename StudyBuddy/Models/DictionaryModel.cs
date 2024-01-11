namespace StudyBuddy.Models
{

    public partial class DictionaryModel
    {
        public string Word { get; set; }
        public string Phonetic { get; set; }
        public List<Phonetic> Phonetics { get; set; }
        public List<Meaning> Meanings { get; set; }
        public License License { get; set; }
        public List<Uri> SourceUrls { get; set; }
    }
    public partial class License
    {
        public string Name { get; set; }
        public Uri Url { get; set; }
    }
    public partial class Meaning
    {
        public string PartOfSpeech { get; set; }
        public List<Definition> Definitions { get; set; }
        public List<string> Synonyms { get; set; }
        public List<object> Antonyms { get; set; }
    }
    public partial class Definition
    {
        public string DefinitionDefinition { get; set; }
        public List<object> Synonyms { get; set; }
        public List<object> Antonyms { get; set; }
        public string Example { get; set; }
    }
    public partial class Phonetic
    {
        public string Text { get; set; }
        public Uri Audio { get; set; }
        public Uri SourceUrl { get; set; }
        public License License { get; set; }
    }
}

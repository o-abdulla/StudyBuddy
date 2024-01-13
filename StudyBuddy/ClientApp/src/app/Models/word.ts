export interface Word {
    word: string;
    definitions: Definition[];
}

export interface Definition {
    definition: string;
    partOfSpeech: string;
}

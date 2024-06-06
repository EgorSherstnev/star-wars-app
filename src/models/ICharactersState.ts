import { ICharacter } from "./ICharacter";

export interface ICharactersState {
   characters: ICharacter[];
   viewedCharacters: ICharacter[];
   status: 'idle' | 'loading' | 'succeeded' | 'failed';
   error: string | null;
   currentPage: number;
   nextPage: string | null;
   previousPage: string | null;
}
import { Commentaire } from "./Comment.model";

export interface Message {
  id: number;
  sender: string;
  content: string;
  date: Date;
  nblike: number;
  nbdislike: number;
  report:number,
  id_user: number;
  comments: Commentaire[];
}
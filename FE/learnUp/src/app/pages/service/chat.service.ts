import { Injectable } from '@angular/core';
import { Message } from '../Message.model';
import {Commentaire } from '../Comment.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { subscribe } from 'diagnostics_channel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: Message[] = [];
  private url = 'http://localhost/learnUp/chat.php'; // Adjust URL as needed
  private datePipe = new DatePipe('en-US'); // Create a DatePipe instance

  constructor(private http: HttpClient) {}
  generateSimpleId(): number {
    const randomInt = Math.floor(Math.random() * 100000000000) + 1;
    return randomInt;
  }
  getMessages(): Observable<Message[]> {
    return this.http.get<any[]>(`${this.url}?query=get`).pipe(
      map(response => {
        return response.map((item: any) => { 
          const message: Message = {
            id: item.idMessage,
            sender: item.username, 
            content: item.msg,
            date: new Date(item.dateMessage), 
            nblike: item.nblike,
            nbdislike: item.nbdislike,
            report:item.report,
            id_user: item.id, // Assuming "id_user" is available in the response
            comments: item.responses.map((responseItem: any) => {
              const comment: Commentaire = {
                id: responseItem.id_r,
                content: responseItem.msg,
                date: new Date(responseItem.dateMessage),
                id_user: responseItem.id,
                idM: responseItem.idM,
              };
              return comment;
            })
          };
          return message;
        });
      }),
      catchError(error => {
        console.error(error);
        return of([]); // Return empty array if there's an error
      })
    );
  }

  addMessage(content: string): Observable<Message> {
    const newMessage: Message = {
      id: 0,
      sender: 'admin',
      content: content,
      date: new Date(),
      nblike: 0,
      nbdislike: 0,
      report: 0,
      id_user: 1,
      comments: [],
    };
    this.messages.push(newMessage);
    const formattedDate = this.datePipe.transform(newMessage.date, 'yyyy-MM-dd HH:mm:ss');
    const jsonMessage = JSON.stringify({
      ...newMessage,
      date: formattedDate,
    });
    console.log(jsonMessage)
    return this.http.post<Message>(`${this.url}?query=addmessage`, jsonMessage).pipe(
      catchError((error) => {
        console.error(error);
        return of(newMessage);
      })
    );
  }

  addComment(messageId: number, content: string): Observable<Commentaire> {
    const newComment: Commentaire = {
      id: 0,
      content: content,
      date: new Date(),
      id_user: 1,
      idM: messageId,
    };

    if (this.messages[messageId - 1]) {
      this.messages[messageId - 1].comments?.push(newComment);
    }

    const commentData = {
      id_r: newComment.id.toString(),
      msg: newComment.content,
      dateMessage: newComment.date.toISOString(),
      id: newComment.id_user.toString(),
      idM: newComment.idM.toString(),
    };
    console.log(commentData)
    const jsonData = JSON.stringify(commentData);
    return this.http.post<Commentaire>(`${this.url}?query=addcomment`, jsonData).pipe(
      catchError(() => of(newComment))
    );
  }
  Putlike(c:number){
    const requestData = { id: c, data:'1'}; 
    return this.http.put(`${this.url}?query=like`, requestData)
    .pipe(
      catchError((error: any) => {
        console.error(error);
        return [];
      })
    );
  }
  Putdislike(c:number){
    const requestData = { id: c, data:'1'}; 
    return this.http.put(`${this.url}?query=dislike`, requestData)
    .pipe(
      catchError((error: any) => {
        console.error(error);
        return [];
      })
    );
  }
  putMessage(id: number): Observable<any> {
    console.log(id)
    const requestData = { id: id, data:'1'}; 
    return this.http.put(`${this.url}?query=putReport`, requestData)
      .pipe(
        catchError((error: any) => {
          console.error(error);
          return [];
        })
      );
  }
  getReportMessage(){

    return this.http.get<any[]>(`${this.url}?query=get`).pipe(
      map(response => {
        return response.map((item: any) => { 
          const message: Message = {
            id: item.id,
            sender: item.username, 
            content: item.msg,
            date: new Date(item.dateMessage), 
            nblike: item.nblike,
            nbdislike: item.nbdislike,
            report:item.report,
            id_user: item.id_user, // Assuming "id_user" is available in the response
            comments: item.responses.map((responseItem: any) => {
              const comment: Commentaire = {
                id: responseItem.id_r,
                content: responseItem.msg,
                date: new Date(responseItem.dateMessage),
                id_user: responseItem.id,
                idM: responseItem.idM,
              };
              return comment;
            })
          };
          return message;
        });
      }),
      catchError(error => {
        console.error(error);
        return of([]); // Return empty array if there's an error
      })
    );
  }
}

/*  addComment(messageId: number, content: string): Observable<Commentaire> {
    const newComment: Commentaire = {
      id:this.generateSimpleId(),
      content: content,
      date: new Date(),
      id_user: 1,
      idM: messageId
    };
    if (this.messages[messageId - 1]) {
      this.messages[messageId - 1].comments?.push(newComment);
    }
    const commentData = {
      id_r: newComment.id.toString(),
      msg: newComment.content,
      dateMessage: newComment.date.toISOString(),
      id: newComment.id_user.toString(),
      idM: newComment.idM.toString()
    };
    const jsonData = JSON.stringify(commentData);
    console.log(jsonData)
    return this.http.post<Commentaire>(`${this.url}?query=addcomment`,jsonData).pipe(
      catchError(() => of(newComment))
    );
  } */
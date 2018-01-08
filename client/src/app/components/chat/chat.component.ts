import { Component, OnInit,HostListener } from '@angular/core';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


messages = [];
  connectionMessage;
  connectionUsers;
  
  message;
  message1=null;
  username;
  load=false;
  messageClass;
  userInput;
  users;
check=[];
status;



  constructor(private chatService:ChatService) { }


  @HostListener('window:beforeunload')
  onExit() {
    if (this.username) this.chatService.exitSession(this.username);
  }

  sendMessage() {
    this.chatService.sendMessage(this.message, this.username);
    this.message = '';
    if (this.messages.length > 8) this.messages.splice(0, 1);
  }

  ngOnInit() {
    this.connectionMessage = this.chatService.getMessages().subscribe(message => {

      this.messages.push(message);
    });


    this.connectionUsers = this.chatService.getUsers().subscribe(data => {
      this.users = data;
       
     
    });
    
    
    
  }

  saveUsername() {
   
   
   
   
   
   	this.chatService.saveUsername(this.userInput);
   	 this.username=this.userInput;
   

   
  

}
  


  




    
    


}

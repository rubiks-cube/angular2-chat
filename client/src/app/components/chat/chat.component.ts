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
  message1;
  username;
  load=false;
  messageClass;
  userInput;
  users;
check=[];
status;
x;
time;

  constructor(private chatService:ChatService) { }


  @HostListener('window:beforeunload')
  onExit() {
    if (this.username) this.chatService.exitSession(this.username);
  }

  sendMessage() {
    this. time='('+this.timeNow()+')';
    
    this.chatService.sendMessage(this.message, this.username,this.time);
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
    
   this.saveUsername();
    
  }

  saveUsername() {
   
   
   
   
   this. x=this.userInput;
//console.log(this.x);
  
   	this.chatService.saveUsername(this.userInput).subscribe(data=>{
//console.log(data['sta']);
// console.log(this.x);
    if(data['sta']=='f'){
    //  console.log(data['alert']);
      this.message1=data['alert'];
    //  console.log(this.message1);
      this.messageClass='alert alert-danger';
      this.userInput='';
    }else if(data['sta']=='t'){
      this.message1='Hi '+this.x+'!';
      //console.log(this.message1);
      this.messageClass='alert alert-success';
      this.username=this.x;
    }
});
   
   
  

}
  

timeNow() {
  var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
      s=d.getSeconds();
 
 var value = h + ':' + m+ ':'+s;
 return value;
}

    
    


}

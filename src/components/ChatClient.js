import React ,{useState,useEffect} from 'react'
import io from 'socket.io-client';
import '../css/chat-main.css'
import { Button,Modal,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import MessageBox from './MessageBox';

const socket = io('localhost:8000');

function ChatClient() {

    const [sentMessage, setSentMessage] = useState([])


    const [allMessageList, setAllMessageList] = useState([])

    const [show, setShow] = useState(true);
    const [userName, setUserName] = useState('');

    const handleClose = () => {
      setShow(false)
      localStorage.setItem('user-name',userName);

    
    };

 
    useEffect(() => {


        if(localStorage.getItem("room-id") === null)
        {

          const roomId = uuidv4();;
            localStorage.setItem('room-id',roomId);
            
        
        }
        else{
            let roomIdClient = localStorage.getItem('room-id')
            // console.log(`Room is ${roomIdClient}`)
        }
  
    }, [])



        socket.on('connect', function(){
            console.log(`Connected to server`)
        });

        const handleKeyDown = e => {
          if (e.key === 'Enter') {
            sendMessage()
          }
        }

const prepareMessage = e => {
  let msgArr = {userName:userName,type:'sent',content:e.target.value}
    setSentMessage(msgArr)
 
}

const sendMessage = () =>{

    let roomId = localStorage.getItem('room-id');
    socket.emit('message',sentMessage,roomId);
    setAllMessageList([...allMessageList,sentMessage])
    setSentMessage({content:""})
}
  useEffect(() => {
      socket.on('message',function(data,socketRoomId){

        if(socketRoomId == localStorage.getItem('room-id'))
        {
            var recievedMsgArr = new Array();
            recievedMsgArr['userName'] = data.userName;
            recievedMsgArr['type'] = 'received';

            recievedMsgArr['content'] = data.content;

            setAllMessageList([...allMessageList,recievedMsgArr])

          }
      
      })
   
  },[allMessageList])

    return (
        <div>
            <>

      <Modal show={show} onHide={handleClose} backdrop="static">
   
        <Modal.Body>
   
  <Form.Group>
    <Form.Label><b>Enter your name</b></Form.Label>
    <Form.Control type="text" placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)}/>
    <Form.Text className="text-muted">
      <ul>
        <li>Enter any desired name</li>
        <li>To Add another participant duplicate this window</li>
        <li>Click on send or hit 'Enter' key to send message</li>

      </ul>
    </Form.Text>
  </Form.Group>

  <Button variant="success" onClick={handleClose}>
    Start Chat
  </Button>


        </Modal.Body>
  
      </Modal>
    </>

		<div className="container-fluid h-100">
			<div className="row justify-content-center h-100">
			
				<div className="col-md-8 col-xl-10 chat">
					<div className="card">
						<div className="card-header msg_head">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="/images/user-2.png" className="rounded-circle user_img" />
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>{userName}</span>
								</div>
							
							</div>
						
						</div>
						<div className="card-body msg_card_body">

              {allMessageList.map((msg,index) => 
                <MessageBox key={index} userName={msg.userName} type={msg.type} content={msg.content}/>
          
        
              )}
							
          

					</div>
						<div className="card-footer">
							<div className="input-group">
								<div className="input-group-append">
									<span className="input-group-text attach_btn"></span>
								</div>
                                <input type="text" className="form-control type_msg" placeholder="Type your message..." value={sentMessage.content || ""} onChange={prepareMessage} onKeyDown={handleKeyDown}/>
								<div className="input-group-append">
									<span className="input-group-text send_btn" onClick={sendMessage}><i className="fas fa-location-arrow"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        </div>
    )
}

export default ChatClient

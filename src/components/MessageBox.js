import React from 'react'

function MessageBox(props) {

    if(props.type == 'sent')
    return (
        <>
          		<div className="d-flex justify-content-end mb-4">
					 	<div className="img_cont_msg">
								<img src="/images/user-2.png" className="rounded-circle user_img_msg" />
							</div>
                            
							<div className="msg_cotainer_send">
               <b>You</b><br/>{props.content}
				 	</div>
							
							</div>  
        </>
    )
    return(
        <>
        <div className="d-flex justify-content-start mb-4">
					 	<div className="img_cont_msg">
								<img src="/images/user-1.jpeg" className="rounded-circle user_img_msg" />
							</div>
							<div className="msg_cotainer">
               <b>{props.userName}</b><br/>{props.content}
				 	</div>
            </div>
        </>
    )
}

export default MessageBox

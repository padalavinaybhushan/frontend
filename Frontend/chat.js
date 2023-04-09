const socket=io("ws://localhost:8900")
socket.on("getmessage",data=>{
    message=data[0]
    oppositeid=data[1]
    if(sessionStorage.getItem("oppositeid")==oppositeid){
        document.getElementById("messages").innerHTML+=`<li class="clearfix">
        <div class="message-data">
            <span class="message-data-time">`+new Date().toString().substr(16,8)+`</span>
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
        </div>
        <div class="message my-message">`+message+`</div>
    </li>`
    }
})
    

if(window.location.href.indexOf("cchat.html")>=0){
    $(document).ready(function(){
        $.ajax({
            url:"https://jobportal-s38r.onrender.com/conversations",
            type:"GET",
            headers:{
                id:JSON.parse(sessionStorage.getItem("user"))._id,
                type:JSON.parse(sessionStorage.getItem("user")).type
            },
            success:(users)=>{
                var flag=0
                ds=""
                
                for(user of users){
                    document.getElementById("members").innerHTML+=`<a onclick="clearss()" id="`+user._id+`">
                                                                        <li class="clearfix" id="`+user._id+`">
                                                                            <img src="${user.profile}" alt="avatar" id="`+user._id+`">
                                                                            <i class="fa fa-circle offline float-right" id=`+user._id+`status></i> 
                                                                            <div class="about" id="`+user._id+`">
                                                                                <div class="name" id="`+user._id+`">`+user.name+`</div>
                                                                            </div>
                                                                        </li>   
                                                                   </a>`
                    if(flag==0){
                        ds=user._id
                        flag=1
                    }
                    

                }
                
                document.getElementById(ds).click()
                
                if("oppositeid" in sessionStorage){
                    id=sessionStorage.getItem("oppositeid")
                    document.getElementById(id).click()
                }
                socket.emit("adduser",JSON.parse(sessionStorage.getItem("user"))._id)
                socket.on("users",data=>{
                    console.log(data)  
                    for(user of data){
                      if(document.getElementById(user.userid+"status")){
                          document.getElementById(user.userid+"status").className="fa fa-circle online float-right"
                      }
                    }
                    var items=document.querySelectorAll(".online")
                    for(user of items){
                        id=user.id.replace("status","")
                        flag=0
                        for(obj of data){
                            if(obj.userid==id){
                                flag=1
                                break
                            }
                        }
                        if(flag==0){
                            document.getElementById(id+"status").className="fa fa-circle offline float-right"
                        }
                    }
                })
            }
        })
    })
}

function godown(){
        var position = document.getElementById('chatss').scrollTop;
        // console.log(position)
        if(position!=0){
            document.getElementById('chatss').scrollTop=0
        }
    

}


function clearss(ev){
    $.ajax({
        url:"https://jobportal-s38r.onrender.com/messages",
        type:"GET",
        headers:{
            members:[event.target.id,JSON.parse(sessionStorage.getItem("user"))._id],
            id:JSON.parse(sessionStorage.getItem("user"))._id,
            type:JSON.parse(sessionStorage.getItem("user")).type
        },
        success:(data)=>{

            messages=data[0]
            opposite=data[1]
            console.log(opposite);
            //document.querySelector('#curruser').src=opposite.profile 
            sessionStorage.setItem("coversationid",data[2])
            $("#username").html(opposite.name)
            console.log(messages,"plopp");
            sessionStorage.setItem("oppositeid",opposite._id)
            str=""
            for(message of messages){
                time=message.createdAt
                time=time.replace("T",",")
                time=time.substr(0,20)
                sessionStorage.setItem("coversationid",message.conversationid)
                if(JSON.parse(sessionStorage.getItem("user"))._id===message.senderid){
                    str+=`<li class="clearfix">
                <div class="message-data text-right">
                    <span class="message-data-time">`+time+`</span>
                    <img src="${JSON.parse(sessionStorage.getItem("user")).profile}" alt="avatar">
                </div>
                <div class="message other-message float-right">`+message.message+`</div>
            </li>`
                }
                else{
                    str+=`<li class="clearfix">
                <div class="message-data">
                    <span class="message-data-time">`+time+`</span>
                    <img src="${opposite.profile}" alt="">
                </div>
                <div class="message my-message">`+message.message+`</div>
            </li>`
                }
            }
            document.getElementById("messages").innerHTML=str
        }
    })
}
if(window.location.href.indexOf("echat.html")>=0){
    $(document).ready(function(){
        console.log("fghjkl");
        $.ajax({
            url:"https://jobportal-s38r.onrender.com/conversations",
            type:"GET",
            headers:{
                id:JSON.parse(sessionStorage.getItem("user"))._id,
                type:JSON.parse(sessionStorage.getItem("user")).type
            },
            success:(users)=>{
                var flag=0
                ds=""
                console.log(users);
                for(user of users){
                    console.log(user)
                    document.getElementById("members").innerHTML+=`<a onclick="clearss()" id="`+user._id+`">
                                                                        <li class="clearfix" id="`+user._id+`">
                                                                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" id="`+user._id+`">
                                                                            <i class="fa fa-circle offline float-right" id="`+user._id+`status" ></i> 
                                                                            <div class="about" id="`+user._id+`">
                                                                                <div class="name" id="`+user._id+`">`+user.name+`</div>
                                                                            </div>
                                                                        </li>   
                                                                   </a>`

                if(flag==0){
                        ds=user._id
                        flag=1
                }
                }
                if(ds==""){
                    // alert("please start a conversation GO TO : (profile -->> posted jobs -->> applied candidates -->> click on profile -->> message )")
                    window.location.href=("empprofile.html")
                }
                document.getElementById(ds).click()
                
                //document.getElementsByClassName("chat-history").scrollTop = document.getElementsByClassName("chat-history").scrollHeight;
                if("currApplicant" in sessionStorage){
                    id=JSON.parse(sessionStorage.getItem("currApplicant"))._id
                    console.log(document.getElementById(id).click())
                    sessionStorage.removeItem("currApplicant")
                }
                if("oppositeid" in sessionStorage){
                    id=sessionStorage.getItem("oppositeid")
                    document.getElementById(id).click()
                }
                socket.emit("adduser",JSON.parse(sessionStorage.getItem("user"))._id)
                socket.on("users",data=>{
                    console.log(data)  
                    for(user of data){
                      if(document.getElementById(user.userid+"status")){
                          document.getElementById(user.userid+"status").className="fa fa-circle online float-right"
                      }
                    }
                    var items=document.querySelectorAll(".online")
                    for(user of items){
                        id=user.id.replace("status","")
                        flag=0
                        for(obj of data){
                            if(obj.userid==id){
                                flag=1
                                break
                            }
                        }
                        if(flag==0){
                            document.getElementById(id+"status").className="fa fa-circle offline float-right"
                        }
                    }
                })
            }
        })
        
    })
    
}


function conversationstart(){
    $.ajax({
        type:"POST",
        url:"https://jobportal-s38r.onrender.com/conversations",
        contentType:"application/json",
        data:JSON.stringify({
            ids:[JSON.parse(sessionStorage.getItem("user"))._id,JSON.parse(sessionStorage.getItem("currApplicant"))._id]
        }),
        success:function(data){
            sessionStorage.setItem("coversationid",data)
            window.location.href="echat.html"
        }
    })
}
function sendmessage(ev){
    event.preventDefault()
    let message=$("#textmessage").val()
    document.getElementById("textmessage").value=""
    console.log(message)
    $.ajax({
        type:"POST",
        url:"https://jobportal-s38r.onrender.com/messages",
        contentType:"application/json",
        data:JSON.stringify({
            conversationid:sessionStorage.getItem("coversationid"),
            senderid:JSON.parse(sessionStorage.getItem("user"))._id,
            message:message
        }),
        success:function(data){
            document.getElementById("messages").innerHTML+=`<li class="clearfix">
            <div class="message-data text-right">
                <span class="message-data-time">`+new Date().toString().substr(16,8)+`</span>
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
            </div>
            <div class="message other-message float-right">`+message+`</div>
        </li>`
        socket.emit("sendmessage",[sessionStorage.getItem("oppositeid"),message])
        }
    })
    
}



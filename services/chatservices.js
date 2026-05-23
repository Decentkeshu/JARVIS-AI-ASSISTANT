export const storechatserver = async(sessionId,message , reply,filename)=>{
    const response = await fetch("http://localhost:3001/api/chat",{
        method: "POST",
        headers : {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({sessionId,message,reply,filename}),

    });
    return response.json();
}

export const getchatdata = async()=>{
    const response = await fetch("http://localhost:3001/api/chat/${sessionId}");
    const data = await response.json();
    return data;
}
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const storechatserver = async(sessionId, message, reply, filename) => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, message, reply, filename }),
    });
    return response.json();
}


export const getchatdata = async(sessionId) => {
    const response = await fetch(`${BASE_URL}/api/chat/${sessionId}`);
    const data = await response.json();
    return data;
}

export const createuser = async(user, email, password, cpassword) => {
    console.log("1. createuser called with:", { user, email, password, cpassword }); 

    const response = await fetch(`${BASE_URL}/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, email, password, cpassword }),
    });

    console.log("2. response status:", response.status); 
    const data = await response.json();
    console.log("3. response data:", data);              
    return { status: response.status, data };
}


export const loggedinuser = async(identifier, password) => {
    console.log("login called with:", { identifier, password });
    const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }) 
    });
    return response.json();
}
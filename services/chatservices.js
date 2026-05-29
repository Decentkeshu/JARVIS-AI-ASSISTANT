export const storechatserver = async(sessionId, message, reply, filename) => {
    const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, message, reply, filename }),
    });
    return response.json();
}

// ✅ fixed: backticks instead of quotes so sessionId is actually used
export const getchatdata = async(sessionId) => {
    const response = await fetch(`http://localhost:3001/api/chat/${sessionId}`);
    const data = await response.json();
    return data;
}

export const createuser = async(user, email, password, cpassword) => {
    console.log("1. createuser called with:", { user, email, password, cpassword }); // ✅ check data being sent

    const response = await fetch("http://localhost:3001/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, email, password, cpassword }),
    });

    console.log("2. response status:", response.status); // ✅ check status
    const data = await response.json();
    console.log("3. response data:", data);              // ✅ check what came back
    return { status: response.status, data };
}

// ✅ fixed: sends identifier instead of user to match backend $or query
export const loggedinuser = async(identifier, password) => {
    console.log("login called with:", { identifier, password });
    const response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }) // ✅ identifier not user
    });
    return response.json();
}
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const storechatserver = async(sessionId, message, reply, filename, userId) => { // ✅ added userId
    const response = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId, message, reply, filename, userId }), // ✅ added userId
    });
    return response.json();
}

export const getchatdata = async(sessionId) => {
    const response = await fetch(`${BASE_URL}/api/chat/${sessionId}`);
    const data = await response.json();
    return data;
}

export const createuser = async(user, email, password, cpassword) => {
    const response = await fetch(`${BASE_URL}/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, email, password, cpassword }),
    });
    const data = await response.json();
    return { status: response.status, data };
}

export const loggedinuser = async(identifier, password) => {
    const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password })
    });
    return response.json();
}
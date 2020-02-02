import axios from 'axios';


export const testy = axios.get("http://localhost:3000/test");

export const updateCounter = (body) => axios.post("http://localhost:3000/counter", {
    headers: {'Content-Type': "application/json"},
    body
});


import axios from "axios"
import md5 from 'md5';

const publicKey = 'b14cc2ba325bce82c76572be4c3640fd';
const privateKey = 'ba9fc7c37e7baa8910efb93a0d239b59bb0c2fae';
const ts = Number(new Date());

const hash = md5(ts + privateKey + publicKey);

const api = axios.create({
    baseURL:'http://gateway.marvel.com/v1/public',
    params: {
        ts,
        apikey: publicKey,
        hash: hash
    }
})

export default api;

import axios from "axios";

const instance = axios.create({
    baseURL: "http://mystyle-server.shop/app/users"
});

export default instance;

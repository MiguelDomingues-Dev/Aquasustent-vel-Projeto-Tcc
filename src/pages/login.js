import { loginUser } from "../firebase/auth.js";
import "../scss/";

document.querySelector("#loginBtn").addEventListener("click", loginUser);

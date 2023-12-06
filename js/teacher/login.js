// firebaseで使うやつ
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
import { getDatabase, ref, set, get, onValue, update } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";  //追加
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDALbDCl1cQ0K-WoIVW_jEhGGFpVKu4HG8",
  authDomain: "dbtest-a8005.firebaseapp.com",
  databaseURL: "https://dbtest-a8005-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dbtest-a8005",
  storageBucket: "dbtest-a8005.appspot.com",
  messagingSenderId: "788239328067",
  appId: "1:788239328067:web:aa6bd9897621641f4c45f6",
  measurementId: "G-B77QR8NJPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

// 関数をインポート
import {queryDivider, generateUuid } from '../set.js';

// グローバル変数の用意
var mailValue;      // メアド in databaseを格納
var passwordValue;  //パスワード in databaseを格納
var uidValue;       // ユーザーユニークIDを格納
var mailInput;     // メアド in 入力領域を格納
var passwordInput; //パスワード in 入力領域を格納



function login(){

    // メアド、パスワードin 入力領域を取得
    mailInput = document.getElementById(loginMailInput).value;
    passwordInput = document.getElementById(loginPasswordInput).value;
    // メールアドレス、パスワードin データベースを取得

    // メアドが存在しなかったらreturn
    if(!mailValue) return;

    // パスワードが間違っていたらreturn
    if(passwordValue != passwordInput ) return;

    // ページ遷移
    window.location.href = './mypage.html';

}

window.login = login;
export{ login };
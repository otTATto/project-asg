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

// 「ログインする」ボタンを押したときに実行
async function login(){

    // メアド、パスワードin 入力領域を取得
    mailInput = document.getElementById('loginMailInput').value;
    passwordInput = document.getElementById('loginPasswordInput').value;
    // メールアドレス、パスワードin データベースを取得

  if(!data) {
    alert("DBに正しくアクセスできません");
    return;
  }

  Object.keys(data).forEach((element, index, key, snapshot) => {  //DB内を全探索して一致するメアドを探す
    let mailFromDB = data[element].mail;
    
    if(mailFromDB == mailInput){   //一致したらそれを保存
      console.log('ヒットしました:' + element.value);
      mailValue = mailFromDB;
      passwordValue = data[element].password;
    }
  });
  
  // メアドがDBに無かったらreturn
  if(!mailValue) {
    alert("登録していないメールアドレスです");
    return;
  }

  // パスワードが間違っていたらreturn
  if(passwordValue != passwordInput ) {
    alert("パスワードが間違っています");
    return;
  }

  // ページ遷移
  window.location.href = './mypage.html';

}

// ナビにおける「サインイン」ボタンを押したときに実行
function viewSigninArea(){
    // 「ログインエリア」を非表示・「サインインエリア」を表示
    $('#loginArea').removeClass('visible').addClass('unvisible');
    $('#signinArea').removeClass('unvisible').addClass('visible');
}

// ナビにおける「ログイン」ボタンを押したときに実行
function viewLoginArea(){
    // 「ログインエリア」を表示・「サインインエリア」を非表示
    $('#loginArea').removeClass('unvisible').addClass('visible');
    $('#signinArea').removeClass('visible').addClass('unvisible');
}

// 「サインインエリア」の「1st step」における「次へ」ボタンを押したときに実行
function moveTo2(){
    // 「1st ステップ エリア」を非表示・「2nd ステップ エリア」を表示・「3rd ステップ エリア」を非表示
    $('#firstStepArea').removeClass('visible').addClass('unvisible');
    $('#secondStepArea').removeClass('unvisible').addClass('visible');
    $('#thirdStepArea').removeClass('visible').addClass('unvisible');
}

// 「サインインエリア」の「2st step」における「次へ」ボタンを押したときに実行
function moveTo3(){
    // 「1st ステップ エリア」を非表示・「2nd ステップ エリア」を非表示・「3rd ステップ エリア」を表示
    $('#firstStepArea').removeClass('visible').addClass('unvisible');
    $('#secondStepArea').removeClass('visible').addClass('unvisible');
    $('#thirdStepArea').removeClass('unvisible').addClass('visible');
}

// 「サインインエリア」の「2st step」における「戻る」ボタンを押したときに実行
function backTo1(){
    // 「1st ステップ エリア」を表示・「2nd ステップ エリア」を非表示・「3rd ステップ エリア」を非表示
    $('#firstStepArea').removeClass('unvisible').addClass('visible');
    $('#secondStepArea').removeClass('visible').addClass('unvisible');
    $('#thirdStepArea').removeClass('visible').addClass('unvisible');
}

// 「サインインエリア」の「3rd step」における「次へ」ボタンを押したときに実行
function moveToMypage(){
    // 各情報をデータベースに格納
    

    // マイページへの遷移
    window.location.href = './mypage.html';

}

// 「サインインエリア」の「3rd step」における「戻る」ボタンを押したときに実行
function backTo2(){
    // 「1st ステップ エリア」を非表示・「2nd ステップ エリア」を表示・「3rd ステップ エリア」を非表示
    $('#firstStepArea').removeClass('visible').addClass('unvisible');
    $('#secondStepArea').removeClass('unvisible').addClass('visible');
    $('#thirdStepArea').removeClass('visible').addClass('unvisible');
}

// 関数のエクスポート
window.login = login;
window.viewSigninArea = viewSigninArea;
window.viewLoginArea = viewLoginArea;
window.moveTo2 = moveTo2;
window.moveTo3 = moveTo3;
window.backTo1 = backTo1;
window.moveToMypage = moveToMypage;
window.backTo2 = backTo2;
export{ login, viewSigninArea, viewLoginArea, moveTo2, moveTo3, backTo1, moveToMypage, backTo2 };
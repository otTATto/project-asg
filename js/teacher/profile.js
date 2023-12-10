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

import { queryDivider, generateUuid } from '../set.js';

var uidValue;
var nameInput;
var univInput;
var facInput;
var depInput;

//ページが読み込まれたときに実行
window.addEventListener('load', async function(){
  // クエリからuidを取得
  uidValue = queryDivider()[0];
  console.log("get uid: " + uidValue);

  //uid から名前、大学、学部、学科を取得
  const teaRef = ref(database, 'users/teachers/' + uidValue + '/mainData/');
  var snapshot = await get(teaRef);
  var data = snapshot.val();
  var teaName = data.studentName;
  var teaUniv = data.belonging.univ;
  var teaFac = data.belonging.fac;
  var teaDep = data.belonging.dep;

  console.log('Name:' + teaName);
  console.log('univ:' + teaUniv);


  // uidValueをhtmlに反映
  var uid = document.getElementById('uid');
  uid.innerHTML = ' ID・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + uidValue + '</span>';

  var teaNameShow = document.getElementById('teaName');
  teaNameShow.innerHTML = '名前・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + teaName + '</span>';

  var teaUnivShow = document.getElementById('teaUniv');
  teaUnivShow.innerHTML = '大学・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + teaUniv + '</span>';

  var teaFacShow = document.getElementById('teaFac');
  teaFacShow.innerHTML = '学部・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + teaFac + '</span>';

  var teaDepShow = document.getElementById('teaDep');
  teaDepShow.innerHTML = '学科・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + teaDep + '</span>';
})


// 「科目情報」をクリックしたときに実行
function viewSubjectArea(){
    // 「基本情報エリア」を非表示・「科目情報エリア」を表示
    $('#profileMainArea').removeClass('visible').addClass('unvisible');
    $('#profileSubjectArea').removeClass('unvisible').addClass('visible');
}

function viewMainArea(){
    // 「基本情報エリア」を表示・「科目情報エリア」を非表示
    $('#profileMainArea').removeClass('unvisible').addClass('visible');
    $('#profileSubjectArea').removeClass('visible').addClass('unvisible');
}

// プロフィール変更の「保存する」ボタンを押したときに実行
async function saveProf(){
    //テキストエリアから情報を取得
    nameInput = document.getElementById('testNameInput').value;
    univInput = document.getElementById('univ').value;
    facInput = document.getElementById('faculty').value;
    depInput = document.getElementById('depature').value;

    //DBに上書き
    const userRef1 = ref(database, 'users/teachers/' + uidValue + '/mainData/');
    await update(userRef1, {
        studentName : nameInput
    });

    const userRef2 = ref(database, 'users/teachers/' + uidValue + '/mainData/belonging/');
    await update(userRef2, {
        univ : univInput,
        fac : facInput,
        dep : depInput
    });

    window.location.href = './profile.html?uid=' + uidValue;
}

//「科目情報エリア」の「科目を追加する」機能
function addSub(){
    //テキストエリアから科目名を取得
    const subNameInput = document.getElementById('testNameInput').value;

    // 履修者の学籍番号を取得

    // 学籍番号からuidを取得

    // 担当者のuidを取得

    // 
}

//ホームボタンを押したとき実行
function moveToHome(){
    window.location.href = './mypage.html?id=' + uidValue;
}

//テストボタンを押したとき実行
function moveToTest(){
    window.location.href = './tests.html?id=' + uidValue;  
}

//プロフィールボタンを押したとき実行
function moveToProf(){
    window.location.href = './profile.html?uid=' + uidValue;
}

//設定ボタンを押したとき実行
function moveToSet(){
    window.location.href = './setting.html?id=' + uidValue;
}

//ログアウトボタンを押したときに実行
function logout(){
    window.location.href = './login.html';
}

window.viewSubjectArea = viewSubjectArea;
window.viewMainArea = viewMainArea;
window.saveProf = saveProf;
window.addSub = addSub;
window.moveToHome = moveToHome;
window.moveToTest = moveToTest;
window.moveToProf = moveToProf;
window.moveToSet = moveToSet;
window.logout = logout;
export{ viewSubjectArea, viewMainArea, saveProf, addSub, moveToHome, moveToTest, moveToProf, moveToSet }
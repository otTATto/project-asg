import { queryDivider, generateUuid } from '../set.js';

var uidValue;

//ページが読み込まれたときに実行
window.addEventListener('load', async function(){
  // クエリからuidを取得
  uidValue = queryDivider()[0];
  console.log("get uid: " + uidValue);

  //uid から学籍番号を取得


  // uidValueをhtmlに反映
  var uid = document.getElementById('uid');
  uid.innerHTML = ' ID・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + uidValue + '</span>';
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
window.addSub = addSub;
window.moveToHome = moveToHome;
window.moveToTest = moveToTest;
window.moveToProf = moveToProf;
window.moveToSet = moveToSet;
window.logout = logout;
export{ viewSubjectArea, viewMainArea, addSub, moveToHome, moveToTest, moveToProf, moveToSet }
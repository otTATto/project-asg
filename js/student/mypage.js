import { queryDivider, generateUuid } from '../set.js';
// テストの詳細モーダル内の「試験画面へ進む」ボタンを押したときに実行

window.addEventListener('load', function(){
    // クエリからuidを取得
    uidValue = queryDivider()[0];
    console.log("get uid: " + uidValue);

})


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

function moveToExam(){

    // ページ遷移
    window.location.href = './exam.html';
    
}

window.moveToExam = moveToExam;
export{ moveToExam }
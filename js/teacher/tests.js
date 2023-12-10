import { queryDivider, generateUuid } from '../set.js';

var uidValue;

// 起動時に実行
window.addEventListener('load', function(){
    // クエリからuidを取得
    uidValue = queryDivider()[0];
    console.log("get uid: " + uidValue);

})

// テストの詳細モーダル内の「監督画面へ進む」ボタンを押したときに実行
function supervise(){

    // ページ遷移
    window.location.href = './supervisor.html';
    
}

// ナビにおける「本日のテスト」ボタンを押したときに実行
function viewTodayTestArea(){
    // 「本日のテスト」を表示・「今後のテスト」を非表示・「過去のテスト」を非表示
    $('#todayTestArea').removeClass('unvisible').addClass('visible');
    $('#futureTestArea').removeClass('visible').addClass('unvisible');
    $('#pastTestArea').removeClass('visible').addClass('unvisible');
}

// ナビにおける「今後のテスト」ボタンを押したときに実行
function viewFutureTestArea(){
    // 「本日のテスト」を非表示・「今後のテスト」を表示・「過去のテスト」を非表示
    $('#todayTestArea').removeClass('visible').addClass('unvisible');
    $('#futureTestArea').removeClass('unvisible').addClass('visible');
    $('#pastTestArea').removeClass('visible').addClass('unvisible');
}

// ナビにおける「過去のテスト」ボタンを押したときに実行
function viewPastTestArea(){
    // 「本日のテスト」を非表示・「今後のテスト」を非表示・「過去のテスト」を表示
    $('#todayTestArea').removeClass('visible').addClass('unvisible');
    $('#futureTestArea').removeClass('visible').addClass('unvisible');
    $('#pastTestArea').removeClass('unvisible').addClass('visible');
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


// 関数のエクスポート
window.viewTodayTestArea = viewTodayTestArea;
window.viewFutureTestArea = viewFutureTestArea;
window.viewPastTestArea = viewPastTestArea;
window.supervise = supervise;
window.moveToHome = moveToHome;
window.moveToTest = moveToTest;
window.moveToProf = moveToProf;
window.moveToSet = moveToSet;
window.logout = logout;
export{ viewTodayTestArea, viewFutureTestArea, viewPastTestArea, supervise, moveToHome, moveToTest, moveToProf, moveToSet, logout }
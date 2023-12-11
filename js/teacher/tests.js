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

var uidValue;   //自分(教師)のuidを格納

// 起動時に実行
window.addEventListener('load', function(){
    // クエリからuidを取得
    uidValue = queryDivider()[0];
    console.log("get uid: " + uidValue);

})

// 起動時に自分の担当している教科を「科目選択」のプルダウンに追加→テスト追加の科目名にも適用, プルダウンのvalueは教科のuid
window.addEventListener('load', async function(){
    // DB.subjectsからmanagerIdが自分になっている教科を探し出す(全探索)
    var subjectsList1 = document.getElementById('subjChoose');   //科目選択の表示エリア(親クラス)
    var subjectsList2 = document.getElementById('subjTest');    //テスト追加の科目選択の表示エリア(親クラス2)
    const subjRef = ref(database, 'subjects/');
    var subjSnapshot = await get(subjRef);
    var subjData = subjSnapshot.val();
    Object.keys(subjData).forEach((element, index, key, snapshot) => {
        let manaIdFromDB = subjData[element].mainData.managerId;

        if(manaIdFromDB == uidValue){   //一致したら
            var subjName = subjData[element].mainData.subjectName;  //教科の名前を取得
            var subjUid = subjData[element].mainData.subjectId; //教科のuidを取得(もしかしたらelementだけでいい？)
            var subject = document.createElement('option');   //子クラス
            console.log('ヒットしました:' + subjName);
            // subject.innerHTML = '<option value="' + subjUid + '">' + subjName + '</option>';
            subject.value = subjUid;
            subject.text = subjName;
            var subject2 = document.createElement('option');
            subject2.value = subjUid;
            subject2.text = subjName;
            subjectsList1.appendChild(subject);   //エリアに追加
            subjectsList2.appendChild(subject2);
        }
    });

    // もし自分の担当教科だったらvalue=uid, text=教科名 でプルダウンを作成(innerHTML,appendChild)
})

// 起動時に「本日のテスト」を表示する
window.addEventListener('load', function(){

})

// 起動時に「今後のテスト」を表示する
window.addEventListener('load', function(){

})

// 起動時に「過去のテスト」を表示する
window.addEventListener('load', function(){

})

// プルダウンを選択したときにテストを絞り込む

// 新しくテストを作成する
async function makeTest(){
    // 科目名(教科のuid)、テストの名前、実施日時、試験時間、補助情報をテキストボックスから取得
    const subjectUid = document.getElementById('subjTest').value;  //教科のuid
    const testNameInput = document.getElementById('testNameInput').value; //テストの名前
    const testDateInput = document.getElementById('testDateInput').value; //テストの日時
    const testLimitInput = document.getElementById('testLimitInput').value;    //試験時間
    const testMemoInput = document.getElementById('testMemoInput').value;    //備考

    // テストのuidを作成
    const testUid = generateUuid();

    //テストの作成日時を生成
    const makeDate = Date.now();

    // DBに情報を格納
    const testRef1 = ref(database, 'subjects/' + subjectUid + '/tests/' + testUid + '/mainData/');  //第一引数：database(L24)(どのデータベースか), 第2：入れたい場所のパス, refはfirebaseから引っ張ってきた
    await set(testRef1, {      //第一引数：入れたい場所, 第2引数：入れたい内容   await: 非同期関数の中で使える、この関数が完了するまで先に進まない
      testName : testNameInput,
      testId : testUid,
      testDate : testDateInput,
      testLimit : testLimitInput,
      testMemo : testMemoInput
    });

    const testRef2 = ref(database, 'subjects/' + subjectUid + '/tests/' + testUid + '/baseData/');
    await set(testRef2,{
        makeDate : makeDate
    });

    window.location.href = './tests.html?id=' + uidValue;

}

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
window.makeTest = makeTest;
window.supervise = supervise;
window.moveToHome = moveToHome;
window.moveToTest = moveToTest;
window.moveToProf = moveToProf;
window.moveToSet = moveToSet;
window.logout = logout;
export{ viewTodayTestArea, viewFutureTestArea, viewPastTestArea, makeTest, supervise, moveToHome, moveToTest, moveToProf, moveToSet, logout }
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

// テストの詳細モーダル内の「試験画面へ進む」ボタンを押したときに実行
import { queryDivider, generateUuid } from '../set.js';

var uidValue;   //自分(生徒)のuidを格納
var subjUidValue;
var subjTaken = [];

// 起動時に実行
window.addEventListener('load', function(){
    // クエリからuidを取得
    uidValue = queryDivider()[0];
    console.log("get uid: " + uidValue);

})

async function showSubj(){
    console.log("subjTaken");
    console.log(subjTaken);

    for(var i = 0; i < subjTaken.length; i++){
        var element = subjTaken[i];

        console.log("element: " + element);

        var subjectsList1 = document.getElementById('subjChoose');   //科目選択の表示エリア(親クラス)
        var subject = document.createElement('option');
        
        //sujUidValueをsubjTakeの配列の中身にしたい。つまりidentyfyUidで一致した科目uid
        var subjNameRef = ref(database, 'subjects/' + element + '/mainData/');
        var snapshot = await get(subjNameRef);
        var data = snapshot.val();
        //教科の名前を取得
        var subjNameFromDb = data.subjectName;
        console.log("subjNameFromDb: " + subjNameFromDb);
        subject.text = subjNameFromDb;
        subject.value = element; //subjectの中身をsubUidをいれている。
        console.log("subject.value");
        console.log(subject.value);

         //subjectの表示テキストにsubjNameを入れている。
        subjectsList1.appendChild(subject); 
    }
}

// 起動時に自分の担当している教科を「科目選択」のプルダウンに追加→テスト追加の科目名にも適用, プルダウンのvalueは教科のuid


async function identifyUid(subjUidValue){
    // uidValue内に既に自分のuidが格納されているはず？なのでそれをif文を用いて判定する
    // またforEachを用いることにより条件判定をsub/uid/par/uid内の要素すべてに対して行う
    //また、ここでは科目のsubjUidvalue部分が変数となる。その変数はより上層の関数から引数として渡される必要がある。
    //もし自分のuidが格納されているならば"何かを"返り値(?)にして関数を終える
    //表示したいのは教科名の所、suj/$uid/main/subjectsName←ここ
    //表示の参照地点はsub/$uid←ここ
    //変数sunjUidValueを変数としてその変数を繰り返し変更するような文をより高層階で行えば何とか動かすことができる？
    //つまりsubjUidValueをワールド変数としてそれを繰り返し変更する方針がよい
    
    var subjectsList1 = document.getElementById('subjChoose');   //科目選択の表示エリア(親クラス)
    
    const stuUidRef = ref(database, 'subjects/'+ subjUidValue + '/participants/');
    var stuUidSnapshot = await get(stuUidRef);
    var stuUidData = stuUidSnapshot.val();
    
    
    Object.keys(stuUidData).forEach( key => {
        let subParUid = stuUidData[key].uid;

        if(subParUid == uidValue) {
        subjTaken.push(subjUidValue);
        //ここにoptinを追加する関数を表示したい
           
        }
        
    })
    
}

//上記関数を各科目に対して行いたいため


window.addEventListener('load', async function(){
    const subjRef = ref(database, 'subjects/');
    var subjSnapshot = await get(subjRef);
    var subjData = subjSnapshot.val();

    // 非同期関数を使うためのfor...ofループ
    for (const element of Object.keys(subjData)) {
        subjUidValue = subjData[element].mainData.subjectId;
        console.log(subjUidValue);

        // 非同期処理を待ってidentifyUidを実行
        await identifyUid(subjUidValue);
    }

    // forEachが完了した後にshowSubjを実行
    showSubj();
});



function moveToExam(){

    // ページ遷移
    window.location.href = './exam.html';
    
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
window.moveToExam = moveToExam;
window.moveToHome = moveToHome;
window.moveToTest = moveToTest;
window.moveToProf = moveToProf;
window.moveToSet = moveToSet;
window.logout = logout;

export{ viewTodayTestArea, viewFutureTestArea, viewPastTestArea, moveToExam,moveToHome, moveToTest, moveToProf, moveToSet, logout }
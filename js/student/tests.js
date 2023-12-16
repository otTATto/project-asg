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

        subject.text = subjNameFromDb; //subjectの表示テキストにsubjNameを入れている。
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
           
        }
        
    })
    
}




window.addEventListener('load', async function(){
    const subjRef = ref(database, 'subjects/');
    var subjSnapshot = await get(subjRef);
    var subjData = subjSnapshot.val();

    // 非同期関数を使うためのfor...ofループ
    for (const element of Object.keys(subjData)) {
        subjUidValue = subjData[element].mainData.subjectId;
        console.log("subjUidValue: " + subjUidValue);

        // 非同期処理を待ってidentifyUidを実行
        await identifyUid(subjUidValue);
    }

    // forEachが完了した後にshowSubjを実行
    showSubj();
});

var subjSelect = document.getElementById('subjChoose');
var todayTestArea = document.getElementById("todayTestArea");


async function getParticipantsNum(subjectUid){
    const participantsRef = ref(database, 'subjects/' + subjectUid + '/participants/');
    var snapshot = await get(participantsRef);
    var data = snapshot.val();
    var participantsNum = Object.keys(data).length;
    return participantsNum;
}

// 科目選択が変更されたときのイベントリスナー
subjSelect.addEventListener('change', async function () {
    // 選択された科目の値を取得
    var selectedSubject = subjSelect.value;

    // 本日のテストエリアの要素をクリア
    todayTestArea.innerHTML = '<div class="mt-3"> <div class="row justify-content-center row-cols-auto f-Zen-Kaku-Gothic-New"> <div class="col"> <div class="fw-exbold c-blue tb-blue"> 本日のテスト </div> </div> <div class="col"> <div onclick="viewFutureTestArea()" type="button" class="fw-medium text-secondary be-big-lg"> 今後のテスト </div> </div> <div class="col"> <div onclick="viewPastTestArea()" type="button" class="fw-medium text-secondary be-big-lg"> 過去のテスト </div> </div> </div> </div> <div class="mt-4"></div>';

    // 選択された科目の値を使用してデータを取得してtests配列に追加
    var tests = await fetchTestsData(selectedSubject);

    // 取得したテストデータに基づいて要素を生成して本日のテストエリアに追加
    tests.forEach(test => {
        var newTestElement = document.createElement("div");
        newTestElement.setAttribute("type", "button");
        newTestElement.setAttribute("data-bs-toggle", "modal");
        newTestElement.setAttribute("data-bs-target", "#testViewModal");
        newTestElement.classList.add("shadow", "br-10", "mt-2", "mx-lg-5", "mx-3", "px-3", "py-3", "f-Zen-Kaku-Gothic-New", "be-big-sm");
        newTestElement.style.border = "2px solid rgb(124, 154, 95)";

        newTestElement.innerHTML = `
            <div class="row row-cols-auto">
                <div class="col fw-bold br-20 px-3 ms-2 text-white" style="background-color: rgb(124, 154, 95); font-size: 20px;">
                    ${test.subject}
                </div>
                <div class="col fw-exbold c-black" style="font-size: 20px">
                    ${test.title}
                </div>
            </div>
            <div class="my-2" style="border-bottom: 1px solid rgb(180, 180, 180);"></div>
            <div class="row row-cols-auto mt-1 justify-content-end">
                <div class="col f-Zen-Maru-Gothic br-20 px-3 ms-2 text-white" style="background-color: rgb(89, 121, 60); font-size: 15px;">
                    ${test.date}
                </div>
                <div class="col f-Zen-Maru-Gothic fw-medium c-black text-secondary" style="font-size: 15px">
                    ${test.examinees}
                </div>
            </div>
        `;

        // 新しいテストを本日のテストエリアに追加
        todayTestArea.appendChild(newTestElement);
    });
});

// データを取得してtests配列に追加する関数
async function fetchTestsData(selectedSubject) {
    console.log("selectedSubject :" + selectedSubject)
    const subjRef = ref(database, 'subjects/' + selectedSubject + '/tests');
    const subjSnapshot = await get(subjRef);
    const subjData = subjSnapshot.val();
    console.log("subjData :" + subjData)
    const tests = [];

    const subjRef1 = ref(database, 'subjects/' + selectedSubject+'/');
    const subjSnapshot1 = await get(subjRef1);
    const subjData1 = subjSnapshot1.val();
    console.log("subjData1 :" + subjData1)
    
    // var subbject = subjData1.mainData.subjectName;
    // var sumstu  = numberOfParticipants;

    // パスを指定してデータを取得
    const subjRef3 = ref(database, 'subjects/' + selectedSubject + '/participants');
    const subjSnapshot3 = await get(subjRef3);
    const participantsData3 = subjSnapshot3.val(); 
    // オブジェクトのキー（参加者のID）の数を取得
    const numberOfParticipants = Object.keys(participantsData3).length;

    var subbject = subjData1.mainData.subjectName;
    var sumstu  = numberOfParticipants;
    if (subjData) {
        // Firebaseから取得したデータをtests配列に変換
        Object.keys(subjData).forEach(element => {
            const testInfo = {
                subject: subbject,
                title: subjData[element].mainData.testName,
                date: subjData[element].mainData.testDate,
                examinees: '受験予定者'+ sumstu
            };

            tests.push(testInfo);
        });
    } else {
        console.log("subjData is null or undefined");
    }

    return tests;
}





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
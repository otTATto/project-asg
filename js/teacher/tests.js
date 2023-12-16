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
var subjectsList = document.getElementById('subjChoose');   //科目選択のプルダウン、表示エリア(親クラス)
var todayTestsArea = document.getElementById('todayTestArea');  //今日のテストの表示エリア
var futureTestsArea = document.getElementById('futureTestArea');    //今後のテストの表示エリア
var pastTestsArea = document.getElementById('pastTestArea');    //過去のテストの表示エリア

// 起動時に実行
window.addEventListener('load', function(){
    // クエリからuidを取得
    uidValue = queryDivider()[0];
    console.log("get uid: " + uidValue);

})

// 起動時に自分の担当している教科を「科目選択」のプルダウンに追加→テスト追加の科目名にも適用, プルダウンのvalueは教科のuid
window.addEventListener('load', async function(){
    // DB.subjectsからmanagerIdが自分になっている教科を探し出す(全探索)
    var subjectsListForAdd= document.getElementById('subjTest');    //テスト追加の科目選択のプルダウン、表示エリア(親クラス2)
    const subjRef = ref(database, 'subjects/');
    var subjSnapshot = await get(subjRef);
    var subjData = subjSnapshot.val();
    Object.keys(subjData).forEach((element, index, key, snapshot) => {
        let manaIdFromDB = subjData[element].mainData.managerId;

        if(manaIdFromDB == uidValue){   // もし自分の担当教科だったらvalue=uid, text=教科名 でプルダウンを作成(innerHTML,appendChild)
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
            subjectsList.appendChild(subject);   //エリアに追加
            subjectsListForAdd.appendChild(subject2);
        }
    });

    
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


// 科目検索のプルダウンを選択したときにその科目のテストを表示する
subjectsList.addEventListener('change', async function(){
    // 選択された科目のuidを取得
    var selectedSubjUid = subjectsList.value;
    // テストエリアをクリアにする
    todayTestsArea.innerHTML = `<div class="mt-3">
                                    <div class="row justify-content-center row-cols-auto f-Zen-Kaku-Gothic-New">
                                        <div class="col">
                                            <div class="fw-exbold c-pink tb-pink">
                                                本日のテスト
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div onclick="viewFutureTestArea()" type="button" class="fw-medium text-secondary be-big-lg">
                                                今後のテスト
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div onclick="viewPastTestArea()" type="button" class="fw-medium text-secondary be-big-lg">
                                                過去のテスト
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4"></div>`;
    futureTestsArea.innerHTML = `<div class="mt-3">
                                    <div class="row justify-content-center row-cols-auto f-Zen-Kaku-Gothic-New">
                                        <div class="col">
                                            <div onclick="viewTodayTestArea()" type="button" class="fw-medium text-secondary be-big-lg">
                                                本日のテスト
                                            </div>
                                            
                                        </div>
                                        <div class="col">
                                            <div class="fw-exbold c-pink tb-pink">
                                                今後のテスト
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div onclick="viewPastTestArea()" type="button" class="fw-medium text-secondary be-big-lg">
                                                過去のテスト
                                            </div>
                                        </div>
                                    </div> 
                                </div>

                                <div class="mt-4"></div>`;
    pastTestsArea.innerHTML = `<div class="mt-3">
                                    <div class="row justify-content-center row-cols-auto f-Zen-Kaku-Gothic-New">
                                        <div class="col">
                                            <div onclick="viewTodayTestArea()" type="button" class="fw-medium text-secondary be-big-lg">
                                                本日のテスト
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div onclick="viewFutureTestArea()" type="button" class="fw-medium text-secondary be-big-lg">
                                                今後のテスト
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="fw-exbold c-pink tb-pink">
                                                過去のテスト
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4"></div>`;
    

    // 選択された科目の各テストの情報を取得(fetchTestData)
    var tests = await fetchTestsData(selectedSubjUid);
    // 取得したデータをもとにボタンを追加
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

    // テストの日時に応じてエリアを振り分ける
    var testUnixTime = new Date(test.date).getTime()/1000//テスト開始時間のunixTime
    var nowUnixTime = Date.now();     //現在時間(unix time)
    var now = new Date(nowUnixTime);    //Dateオブジェクトに変換
    var nowYear = now.getFullYear();    //現在年
    var nowMonth = now.getMonth() + 1;      //現在月
    var nowDay = now.getDate();     //現在日
    var todayUnixTime = new Date(nowYear, nowMonth -1, nowDay).getTime()/1000; //今日00:00のunixTime
    var tomorrowUnixTime = todayUnixTime + 86400;    //明日の00:00のUnixTime(1日のunixTime=86400)
    // console.log('現在' + nowYear + '年' + nowMonth + '月' + nowDay + '日');
    // console.log('テスト' + testYear + '年' + testMonth + '月' + testDay + '日');

    if(testUnixTime >= todayUnixTime && testUnixTime < tomorrowUnixTime){   //テストが今日だったら
        todayTestsArea.appendChild(newTestElement);
    } else if(testUnixTime >= tomorrowUnixTime){   //テストが明日以降だったら
        futureTestsArea.appendChild(newTestElement);
    } else{ //テストが昨日以前だったら
        pastTestsArea.appendChild(newTestElement);
    }

    });

})

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
    if (subjData) { //テストが存在したら
        // Firebaseから取得したデータをtests配列に変換
        Object.keys(subjData).forEach(element => {
            const testInfo = {
                subject: subbject,
                title: subjData[element].mainData.testName,
                date: subjData[element].mainData.testDate,
                examinees: '受験予定者：'+ sumstu + '人'
            };

            tests.push(testInfo);
        });
    } else {
        console.log("subjData is null or undefined");
    }

    return tests;
}



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
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

// 後で使う変数
var uidValue;
var nameInput;
var univInput;
var facInput;
var depInput;
var students = [];     //学籍番号を格納

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

// 科目追加で「学生を追加する」ボタンを押したときに実行
// 入力→[num1「, or -」num2] を想定、返り値→学籍番号の配列？
function addStu(){
    // テキストエリアを「,」「-」で分解
    var stuNumsInput = document.getElementById('participantInput').value;

    // 「,」だったら前後の二つの数字を配列に追加
    students = stuNums.split(',');
    console.log(typeof(students));
    for(var num in students){
        students[num] = parseInt(students[num]);
        console.log(students[num]);
    }
    // console.log(students);
    // console.log(typeof(students));
    // 「-」だったらnum1~num2までのすべての数字を配列に追加


    return;
}

//「科目情報エリア」の「科目を追加する」機能
async function addSubj(){
    // 担当者のuidを取得(uidValue)

    //テキストエリアから科目名を取得
    const subjNameInput = document.getElementById('testNameInput').value;

    // 教科のuidを作成
    const subjUid = generateUuid();

    // 作成時間を取得
    const createTime = Date.now();

    // 履修者の学籍番号を取得(students)

    // 学籍番号からuidを取得  
    const itemRef = ref(database, 'users/students/');
    var snapshot = await get(itemRef);
    var data = snapshot.val();
    var stuUidValue;   //参加生徒のuid
    var uidArray = [];   //uidの配列
    // students(学籍番号の配列)の各要素に対してuidを探す
    for(var num in students){
        Object.keys(data).forEach((element, index, key, snapshot) => {  //DB内を全探索して一致する学籍番号を探す
            let numFromDB = data[element].mainData.studentNum;
    
            if(numFromDB == num){   //一致したらその人のuidを保存
                console.log('ヒットしました:' + element.value);
                stuUidValue = data[element].mainData.userUid  //uidを取得
                uidArray.push(stuUidValue);
            }
            // 一致する学籍番号が存在しないとき

        });
    }

    // subjectのDBを作成、基本情報を格納
    const subjRef1 = ref(database, 'subjects/' + subjUid + '/mainData/');
    await set(subjRef1, {
        subjectName : subjNameInput,
        subjectId : subjUid,
        managerId : uidValue
    });

    // 各生徒のuidをDBに格納
    const subjRef2 = ref(database, 'subjects/' + subjUid + '/participants');
    for(var id in uidArray){
        await set(subjRef2, {
            uid : id
        });
    }

    // 作成時間をDBに格納
    const subjRef3 = ref(database, 'subjects/' + subjUid + '/baseData/');
    await set(subjRef3, {
        makeDate : createTime
    });
   
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
window.addStu = addStu;
window.addSubj = addSubj;
window.moveToHome = moveToHome;
window.moveToTest = moveToTest;
window.moveToProf = moveToProf;
window.moveToSet = moveToSet;
window.logout = logout;
export{ viewSubjectArea, viewMainArea, saveProf, addStu, addSubj, moveToHome, moveToTest, moveToProf, moveToSet }
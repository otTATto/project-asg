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
var uidValue;   //ログイン者のuidを格納
var nameInput;
var stuNumInput;
var univInput;
var facInput;
var depInput;
var stuNumArray = [];     //参加生徒の学籍番号を格納
var stuUidArray = [];   //参加生徒のuidの配列(累計のすべての履修者の分)
var addStuUidArray = [];    //追加する生徒のuidの配列
var stuUidValue;   //参加生徒のuid


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
    var teaNum = data.studentNum;
    var teaUniv = data.belonging.univ;
    var teaFac = data.belonging.fac;
    var teaDep = data.belonging.dep;

    console.log('Name:' + teaName);
    console.log('univ:' + teaUniv);


    // uidValueをhtmlに反映
    var uid = document.getElementById('uid');
    var uid2 = document.createElement('div');
    uid2.innerHTML = ' ID2・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + uidValue + '</span>';
    uid.appendChild(uid2);

    var teaNameShow = document.getElementById('teaName');
    var teaNameShow2 = document.createElement('div'); 
    teaNameShow2.innerHTML = '名前・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + teaName + '</span>';
    teaNameShow.appendChild(teaNameShow2);

    var teaNumShow = document.getElementById('teaNum');
    var teaNumShow2 = document.createElement('div');
    teaNumShow2.innerHTML = '学籍番号・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + teaNum + '</span>';
    teaNumShow.appendChild(teaNumShow2);

    var teaUnivShow = document.getElementById('teaUniv');
    var teaUnivShow2 = document.createElement('div');
    teaUnivShow2.innerHTML = '大学・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + teaUniv + '</span>';
    teaUnivShow.appendChild(teaUnivShow2);

    var teaFacShow = document.getElementById('teaFac');
    var teaFacShow2 = document.createElement('div');
    teaFacShow2.innerHTML = '学部・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + teaFac + '</span>';
    teaFacShow.appendChild(teaFacShow2);

    var teaDepShow = document.getElementById('teaDep');
    var teaDepShow2 = document.createElement('div');
    teaDepShow2.innerHTML = '学科・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + teaDep + '</span>';
    teaDepShow.appendChild(teaDepShow2);

})

//自分の担当教科を探す→その教科のボタンを作る
window.addEventListener('load', async function(){
    // DBから担当教科を探す
    var subjectsList = document.getElementById('subjects');   //表示エリア(親クラス)
    const subjRef = ref(database, 'subjects/');
    var subjSnapshot = await get(subjRef);
    var subjData = subjSnapshot.val();
    Object.keys(subjData).forEach((element, index, key, snapshot) => {
        let manaIdFromDB = subjData[element].mainData.managerId;

        if(manaIdFromDB == uidValue){   //一致したら
            var subjName = subjData[element].mainData.subjectName;  //教科の名前を取得
            var subjUid = subjData[element].mainData.subjectId; //教科のuidを取得
            console.log('教科名：' + subjName);
            var subject = document.createElement('div');   //子クラス
            subject.innerHTML = '<button onclick="viewSubject(\'' + subjUid + '\')" type="button" data-bs-toggle="modal" data-bs-target="#subjectViewAndEditModal" class="list-group-item list-group-item-action">' +
                                    '<div class="f-Zen-Kaku-Gothic-New fw-bold fs-5 c-black">' + 
                                        subjName +
                                    '</div>' +
                                '</button>';
            subjectsList.appendChild(subject);
        }
    });
}) 

async function viewSubject(subjUid){  //教科の詳細を表示する、ボタンを押したら実行
    // 基本情報(教科名)を取得
    var subjRef = ref(database, 'subjects/' + subjUid + '/mainData/');
    var subjSnapshot = await get(subjRef);
    var subjData = subjSnapshot.val();
    var subjName = subjData.subjectName;    //教科名

    // モーダルの作成
    var subjectModal = document.getElementById('subjectViewAndEditModal');      //表示エリア(親クラス)
    subjectModal.innerHTML = '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">' +
                             '<div class="modal-content br-20">' +
                                '<div class="modal-header">' +
                                    '<h1 class="c-pink modal-title fs-5 f-Zen-Kaku-Gothic-New fw-exbold" id="subjectViewAndEditModalLabel">' +
                                        '<i class="fa-solid fa-file-lines"></i>' +
                                            '担当科目を確認・編集する' +
                                    '</h1>' +
                                    '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                                '</div>' + 
                                '<div class="modal-body f-Zen-Kaku-Gothic-New">' + 

                                    '<div class="px-3">' +

                                        '<div class="bg-secondary-subtle py-1 br-10">' +
                                            '<div class="f-Zen-Kaku-Gothic-New text-secondary text-center">' +
                                                'アスタリスク(<span class="c-pink">*</span>)は必須項目です。' +
                                            '</div>' +
                                        '</div>' +

                                        '<div class="mt-4 f-Zen-Kaku-Gothic-New fw-bold c-black" style="font-size: 21px;">' + 
                                            '<i class="fa-solid fa-hashtag"></i>' +
                                                '基本情報' +
                                        '</div>' +

                                        '<div class="mt-3 f-Zen-Kaku-Gothic-New fw-bold text-secondary">' + 
                                            '教科名<span class="c-pink">*</span>' +
                                        '</div>' +
                                        '<div id="subjNameInput" class="mt-1">' +
                                            '<input class="form-control br-10" placeholder="(例)宗教学１">' +
                                        '</div>' +

                                        '<div class="mt-4 f-Zen-Kaku-Gothic-New fw-bold c-black" style="font-size: 21px;">' + 
                                            '<i class="fa-solid fa-hashtag"></i>' +
                                                '履修者情報' +
                                        '</div>' +

                                        '<div class="mt-2 f-Zen-Kaku-Gothic-New fw-bold text-secondary">' +
                                            '学籍番号で履修者を追加する' +
                                        '</div>' +

                                        '<div class="mt-1">' +
                                            '<input id="participantInput" class="form-control br-10" placeholder="(例) 6321003, 6321020-63210034, 6321088">' +
                                        '</div>' +

                                        '<div class="mt-1 bg-success-subtle px-2 py-1 br-10">' +
                                            '<div class="f-Zen-Kaku-Gothic-New text-secondary text-center">' +
                                                'カンマ(<span class="c-pink">,</span>)で区切ることで複数人を登録したり、ハイフン(<span class="c-pink">-</span>)を用いて連続した学籍番号を登録することができます。' +
                                            '</div>' +
                                        '</div>' +

                                        '<div class="mt-2 mb-3">' +
                                            '<div onclick="addStu()" type="button" class="c-blue d-grid col-8 py-2 py-lg-1 mx-auto br-20 be-big-sm make-letters-distance" style="border: 1.5px solid rgb(68, 112, 158);">' +
                                                '<div class="f-Zen-Kaku-Gothic-New text-center fw-bold">' +
                                                    '<i class="fa-solid fa-plus"></i>' + 
                                                        '学生を追加する' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +

                                        '<div class="mt-2 f-Zen-Kaku-Gothic-New fw-bold text-secondary">' + 
                                            '現在、登録されている履修者一覧' +
                                        '</div>' +

                                        '<table class="mt-1 table table-hover table-striped">' +
                                            '<thead>' +
                                                '<tr>' +
                                                    '<th scope="col" class="text-end fw-exbold" style="color: rgb(110, 110, 176);">#</th>' +
                                                    '<th scope="col" class="fw-exbold text-secondary text-center">学籍番号</th>' +
                                                    '<th scope="col" class="fw-exbold text-secondary text-center">氏名</th>' +
                                                    '<th scope="col" class="fw-exbold text-secondary text-center">学科</th>' +
                                                    '<th scope="col" class="fw-exbold text-secondary text-center">学年</th>' +
                                                    '<th scope="col" class="fw-exbold text-secondary text-center">解除</th>' +
                                                '</tr>' +
                                            '</thead>' +
                                            '<tbody class="table-group-divider" id="changeParticipants">' +
                                                    
                                            '</tbody>'
                                        '</table>' +
                                            
                                    '</div>' +

                                    '<div class="my-4 mb-2 d-grid gap-2 col-10 mx-auto">' + 
                                        '<button onclick="" class="btn btn-outline-danger btn-lg br-30 f-Zen-Kaku-Gothic-New fw-exbold" type="button">' +
                                            '科目を削除する' +
                                        '</button>' +
                                    '</div>' +

                                '</div>' + 
                                '<div class="modal-footer f-Zen-Maru-Gothic">' +
                                    '<div class="mt-1 mb-2 d-grid gap-2 col-10 mx-auto">' +
                                        '<button onclick="" class="btn btn-outline-primary btn-lg br-30 f-Zen-Kaku-Gothic-New fw-exbold" type="button">' +
                                            '更新する' +
                                        '</button>' +
                                    '</div>' +
                                    '<div class="d-grid col-4 mx-auto">' +
                                        '<button type="button" class="btn btn-secondary br-30" data-bs-dismiss="modal">' +
                                            '閉じる' +
                                        '</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '</div>';
    // 現在履修者のtable表示

}

// window.addEventListener('load', async function(){      // 自分の担当教科を表示 
//     // DBから自分が担当教科になっているものを探す→
//     var subjectsList = document.getElementById('subjects');   //表示エリア(親クラス)
//     const subjRef = ref(database, 'subjects/');
//     var subjSnapshot = await get(subjRef);
//     var subjData = subjSnapshot.val();
//     Object.keys(subjData).forEach((element, index, key, snapshot) => {
//         let manaIdFromDB = subjData[element].mainData.managerId;

//         if(manaIdFromDB == uidValue){   //一致したら
//             console.log('ヒットしました:' + element.value);
//             var subjName = subjData[element].mainData.subjectName;  //教科の名前を取得
//             var subjUid = subjData[element].mainData.subjectId; //教科のuidを取得(もしかしたらelementだけでいい？)
//             var subject = document.createElement('div');   //子クラス
//             subject.innerHTML = '<button type="button" data-bs-toggle="modal" data-bs-target="#subjectViewAndEditModal" class="list-group-item list-group-item-action"><div class="f-Zen-Kaku-Gothic-New fw-bold fs-5 c-black">' + subjName + '</div></button>';
//             subjectsList.appendChild(subject);   //エリアに追加

//             // 科目の詳細欄を更新
//             // テスト(変数名が一緒でも行けるか)
//             // 教科の名前
//             var subjNameArea = document.getElementById('subjNameInput');
//             subjNameArea.innerHTML = '<input class="form-control br-10" value="' + subjName + '">';
//             var num = 1;

//             // 教科の履修者の表示(未テスト)             //viewSubject()部分
//                 // 教科の履修者ごとに情報を取得
//                 var subjParticiRef = ref(database, 'subjects/' + subjUid + '/participants/');
//                 var subjParticiSnapshot = get(subjParticiRef);
//                 var subjParticiData = subjParticiSnapshot.val();
//                 var stuParticiRef = ref(database, 'users/students/');
//                 var stuParticiSnapshot = get(stuParticiRef);
//                 var stuParticiData = stuParticiSnapshot.val();
//                 Object.keys(subjParticiData).forEach((element, index, key, snapshot) => {
//                     let particiName = stuParticiData[element].mainData.studentName;
//                     let particiNum = stuParticiData[element].mainData.studentNum;
//                     let particiDep = stuParticiData[element].mainData.belonging.dep;
//                     let particiGrade = stuParticiData[element].mainData.belonging.grade;
//                 // 取得した属性を表示
//                     var participant = document.createElement('div');    //子クラス
//                     participant.innerHTML = '<tr>        <th scope="row" class="text-end" style="color: rgb(110, 110, 176);">' + num + '</th>        <td class="text-center">' + particiNum + '</td>        <td class="text-center">' + particiName + '</td>        <td class="text-center">' + particiDep + '</td>        <td class="text-center">' + particiGrade + '</td>        <td class="text-center">            <div onclick="" type="button" class="text-danger br-20 be-big-lg" style="border: 1px solid red;"><i class="fa-solid fa-trash"></i></div>        </td>    </tr>'
//                     particiArea.appendChild(participant);
//                     num += 1;
//                 });   

//         }
//     });

// })

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
    nameInput = document.getElementById('teaNameInput').value;
    stuNumInput = document.getElementById('teaNumInput').value;
    univInput = document.getElementById('univ').value;
    facInput = document.getElementById('faculty').value;
    depInput = document.getElementById('depature').value;

    //DBに上書き
    const userRef1 = ref(database, 'users/teachers/' + uidValue + '/mainData/');
    await update(userRef1, {
        studentNum : stuNumInput,
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
async function addStu(){
    // テキストエリアを「,」「-」で分解
    var stuNumsInput = document.getElementById('participantInput').value;

    // 「,」だったら前後の二つの数字を配列に追加
    var stuNumArrayInput = stuNumsInput.split(',');
    console.log('要素数：' + stuNumArrayInput.length);
    for(var num in stuNumArrayInput){
        stuNumArrayInput[num] = parseInt(stuNumArrayInput[num]);   //num型に変換
        console.log(stuNumArrayInput[num]);
    }
    // console.log(stuNumArrayInput);
    // console.log(typeof(stuNumArrayInput));
    // 「-」だったらnum1~num2までのすべての数字を配列に追加


    // stuNumArrayInput の各要素に対応したuidを stuUidArray(DBに登録時使う)、addStuUidArray(新規のみ入れる、表示に使う)に追加
    addStuUidArray = [];    //初期化
    for(var num of stuNumArrayInput){
        var Ref = ref(database, 'users/students/');
        var snapshot = await get(Ref);
        var data = snapshot.val();
        Object.keys(data).forEach((element, index, key, snapshot) => {  //DB内を全探索して一致する学籍番号を探す
            let numFromDB = data[element].mainData.studentNum;
    
            if(numFromDB == num){   //一致したらその人のuidを保存
                console.log('ヒットしました:');
                stuUidValue = data[element].mainData.userUid  //uidを取得
                stuUidArray.push(stuUidValue);    //uidArrayに追加
                addStuUidArray.push(stuUidValue);
                console.log('stuUidArrayの要素数:' + stuUidArray.length);
                console.log('addStuUidArrayの要素数:' + addStuUidArray.length);
           
            }
            // 一致する学籍番号が存在しないとき

        });
    } 

    // htmlに参加者を表示、反映させる
    var stuRef = ref(database, 'users/students/');
    var snapshot = await get(stuRef);
    var data = snapshot.val();
    var stuNumFromDB;
    var stuNameFromDB;
    var stuDepFromDB;
    var stuGradeFromDB;
    var num = 1;  //インデックス
    var particiArea = document.getElementById('addParticipants');//親クラス
    for(var stu of addStuUidArray){
        // stuUidArrayの各要素(各生徒)について、学籍番号、氏名、学科、学年を取得
        stuNumFromDB = data[stu].mainData.studentNum;
        stuNameFromDB = data[stu].mainData.studentName;
        stuDepFromDB = data[stu].mainData.belonging.dep;
        stuGradeFromDB = data[stu].mainData.belonging.grade;
        // 取得した属性を表示
        var participant = document.createElement('tr');    //子クラス
        participant.innerHTML = '<tr>        <th scope="row" class="text-end" style="color: rgb(110, 110, 176);">' + num + '</th>        <td class="text-center">' + stuNumFromDB + '</td>        <td class="text-center">' + stuNameFromDB + '</td>        <td class="text-center">' + stuDepFromDB + '</td>        <td class="text-center">' + stuGradeFromDB + '</td>        <td class="text-center">            <div onclick="" type="button" class="text-danger br-20 be-big-lg" style="border: 1px solid red;"><i class="fa-solid fa-trash"></i></div>        </td>    </tr>'
        particiArea.appendChild(participant);
    }
    return;
}

//「科目情報エリア」の「科目を追加する」機能
async function addSubj(){
    // 担当者のuidを取得(uidValue)

    //テキストエリアから科目名を取得
    const subjNameInput = document.getElementById('addTestNameInput').value;

    // 教科のuidを作成
    const subjUid = generateUuid();

    // 作成時間を取得
    const createTime = Date.now();

    // subjectのDBを作成、基本情報を格納
    const subjRef1 = ref(database, 'subjects/' + subjUid + '/mainData/');
    await set(subjRef1, {
        subjectName : subjNameInput,
        subjectId : subjUid,
        managerId : uidValue
    });

    // 各生徒のuidをDBに格納
    for(var id of stuUidArray){
        const subjRef2 = ref(database, 'subjects/' + subjUid + '/participants/' + id + '/');
        await set(subjRef2, {
            uid : id
        });
    }

    // 作成時間をDBに格納
    const subjRef3 = ref(database, 'subjects/' + subjUid + '/baseData/');
    await set(subjRef3, {
        makeDate : createTime
    });
   
    // 戻る
    window.location.href = './profile.html?uid=' + uidValue;
}

// 科目の編集「更新する」を押したときに実行
function updateSubj(){
    // テキストボックスから教科名を取得

    // もともといた履修者を配列に入れる

    // 追加の履修者を配列に入れる

    // 配列の要素(履修者)を表示させる
}

// 「科目を削除する」を押したときに実行

// 履修者の「解除」ボタンを押したときに実行

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
window.viewSubject = viewSubject;
window.saveProf = saveProf;
window.addStu = addStu;
window.addSubj = addSubj;
window.moveToHome = moveToHome;
window.moveToTest = moveToTest;
window.moveToProf = moveToProf;
window.moveToSet = moveToSet;
window.logout = logout;
export{ viewSubjectArea, viewMainArea, viewSubject, saveProf, addStu, addSubj, moveToHome, moveToTest, moveToProf, moveToSet }
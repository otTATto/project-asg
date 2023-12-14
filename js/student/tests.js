// テストの詳細モーダル内の「試験画面へ進む」ボタンを押したときに実行
import { queryDivider, generateUuid } from '../set.js';

var uidValue;   //自分(生徒)のuidを格納
// 起動時に実行
window.addEventListener('load', function(){
    // クエリからuidを取得
    uidValue = queryDivider()[0];
    console.log("get uid: " + uidValue);

})

window.addEventListener('load', async function(){      // 自分の担当教科を表示 
    // DBから自分が担当教科になっているものを探す
    var subjectsList = document.getElementById('subjects');   //表示エリア(親クラス)
    const subjRef = ref(database, 'subjects/');
    var subjSnapshot = await get(subjRef);
    var subjData = subjSnapshot.val();
    Object.keys(subjData).forEach((element, index, key, snapshot) => {
        let manaIdFromDB = subjData[element].mainData.managerId;

        if(manaIdFromDB == uidValue){   //一致したら
            console.log('ヒットしました:' + element.value);
            var subjName = subjData[element].mainData.subjectName;  //教科の名前を取得
            var subjUid = subjData[element].mainData.subjectId; //教科のuidを取得(もしかしたらelementだけでいい？)
            var subject = document.createElement('div');   //子クラス
            subject.innerHTML = '<button type="button" data-bs-toggle="modal" data-bs-target="#subjectViewAndEditModal" class="list-group-item list-group-item-action"><div class="f-Zen-Kaku-Gothic-New fw-bold fs-5 c-black">' + subjName + '</div></button>';
            subjectsList.appendChild(subject);   //エリアに追加

            // 科目の詳細欄を更新
            // テスト(変数名が一緒でも行けるか)
            // 教科の名前
            var subjNameArea = document.getElementById('subjNameInput');
            subjNameArea.innerHTML = '<input class="form-control br-10" value="' + subjName + '">';
            var num = 1;

            // 教科の履修者の表示(未テスト)
                // 教科の履修者ごとに情報を取得
                var subjParticiRef = ref(database, 'subjects/' + subjUid + '/participants/');
                var subjParticiSnapshot = get(subjParticiRef);
                var subjParticiData = subjParticiSnapshot.val();
                var stuParticiRef = ref(database, 'users/students/');
                var stuParticiSnapshot = get(stuParticiRef);
                var stuParticiData = stuParticiSnapshot.val();
                Object.keys(subjParticiData).forEach((element, index, key, snapshot) => {
                    let particiName = stuParticiData[element].mainData.studentName;
                    let particiNum = stuParticiData[element].mainData.studentNum;
                    let particiDep = stuParticiData[element].mainData.belonging.dep;
                    let particiGrade = stuParticiData[element].mainData.belonging.grade;
                // 取得した属性を表示
                    var participant = document.createElement('div');    //子クラス
                    participant.innerHTML = '<tr>        <th scope="row" class="text-end" style="color: rgb(110, 110, 176);">' + num + '</th>        <td class="text-center">' + particiNum + '</td>        <td class="text-center">' + particiName + '</td>        <td class="text-center">' + particiDep + '</td>        <td class="text-center">' + particiGrade + '</td>        <td class="text-center">            <div onclick="" type="button" class="text-danger br-20 be-big-lg" style="border: 1px solid red;"><i class="fa-solid fa-trash"></i></div>        </td>    </tr>'
                    particiArea.appendChild(participant);//appendchildでhtmlの方に選択肢追加
                    num += 1;
                });   

        }
    });

})

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
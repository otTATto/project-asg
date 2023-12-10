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

//profile.html への遷移
function moveToProf(){
    window.location.href = './profile.html?uid=' + uidValue;
}

window.supervise = supervise;
window.moveToProf = moveToProf;
export{ supervise, moveToProf }
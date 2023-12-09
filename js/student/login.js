// ナビにおける「サインイン」ボタンを押したときに実行
function viewSigninArea(){
    // 「ログインエリア」を非表示・「サインインエリア」を表示
    $('#loginArea').removeClass('visible').addClass('unvisible');
    $('#signinArea').removeClass('unvisible').addClass('visible');
}

// ナビにおける「ログイン」ボタンを押したときに実行
function viewLoginArea(){
    // 「ログインエリア」を表示・「サインインエリア」を非表示
    $('#loginArea').removeClass('unvisible').addClass('visible');
    $('#signinArea').removeClass('visible').addClass('unvisible');
}

// 「サインインエリア」の「1st step」における「次へ」ボタンを押したときに実行
function moveTo2(){
    // 「1st ステップ エリア」を非表示・「2nd ステップ エリア」を表示・「3rd ステップ エリア」を非表示
    $('#firstStepArea').removeClass('visible').addClass('unvisible');
    $('#secondStepArea').removeClass('unvisible').addClass('visible');
    $('#thirdStepArea').removeClass('visible').addClass('unvisible');
}

// 「サインインエリア」の「2st step」における「次へ」ボタンを押したときに実行
function moveTo3(){
    // 「1st ステップ エリア」を非表示・「2nd ステップ エリア」を非表示・「3rd ステップ エリア」を表示
    $('#firstStepArea').removeClass('visible').addClass('unvisible');
    $('#secondStepArea').removeClass('visible').addClass('unvisible');
    $('#thirdStepArea').removeClass('unvisible').addClass('visible');
}

// 「サインインエリア」の「2st step」における「戻る」ボタンを押したときに実行
function backTo1(){
    // 「1st ステップ エリア」を表示・「2nd ステップ エリア」を非表示・「3rd ステップ エリア」を非表示
    $('#firstStepArea').removeClass('unvisible').addClass('visible');
    $('#secondStepArea').removeClass('visible').addClass('unvisible');
    $('#thirdStepArea').removeClass('visible').addClass('unvisible');
}

// 「サインインエリア」の「3rd step」における「次へ」ボタンを押したときに実行
function moveToMypage(){
    // 各情報をデータベースに格納
    

    // マイページへの遷移
    window.location.href = './mypage.html';

}

// 「サインインエリア」の「3rd step」における「戻る」ボタンを押したときに実行
function backTo2(){
    // 「1st ステップ エリア」を非表示・「2nd ステップ エリア」を表示・「3rd ステップ エリア」を非表示
    $('#firstStepArea').removeClass('visible').addClass('unvisible');
    $('#secondStepArea').removeClass('unvisible').addClass('visible');
    $('#thirdStepArea').removeClass('visible').addClass('unvisible');
}

// 関数のエクスポート
window.viewSigninArea = viewSigninArea;
window.viewLoginArea = viewLoginArea;
window.moveTo2 = moveTo2;
window.moveTo3 = moveTo3;
window.backTo1 = backTo1;
window.moveToMypage = moveToMypage;
window.backTo2 = backTo2;
export{ viewSigninArea, viewLoginArea, moveTo2, moveTo3, backTo1, moveToMypage, backTo2 }
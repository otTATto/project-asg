// テストの詳細モーダル内の「試験画面へ進む」ボタンを押したときに実行
function moveToExam(){

    // ページ遷移
    window.location.href = './exam.html';
    
}

window.moveToExam = moveToExam;
export{ moveToExam }
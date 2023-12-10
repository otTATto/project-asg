import { queryDivider, generateUuid } from '../set.js';

//ページが読み込まれたときに実行
window.addEventListener('load', async function(){
  // クエリからuidを取得
  const uidValue = queryDivider()[0];
  console.log("get uid: " + uidValue);

  //uid から学籍番号を取得
  

  // uidValueをhtmlに反映
  var uid = document.getElementById('uid');
  uid.innerHTML = ' ID・<span class="f-Zen-Maru-Gothic fw-bold c-black">' + uidValue + '</span>';
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

//「科目情報エリア」の「科目を追加する」機能
function addSub(){
    //テキストエリアから科目名を取得
    const subNameInput = document.getElementById('testNameInput').value;

    // 履修者の学籍番号を取得

    // 学籍番号からuidを取得

    // 担当者のuidを取得

    // 
}

window.viewSubjectArea = viewSubjectArea;
window.viewMainArea = viewMainArea;
window.addSub = addSub;
export{ viewSubjectArea, viewMainArea, addSub }
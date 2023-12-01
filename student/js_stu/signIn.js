function send(){
    var stuNumValue = document.getElementById('studentNumInput').value;
    var nameValue = document.getElementById('nameInput').value;
    var facultyValue = document.getElementById('faculty').value;

    //テキストをデータベースに上げる
    const dataRef = ref(database, 'student/' + stuNumValue + '/');  //第一引数：database(l20), 第2：パス
    set(dataRef, {
        //text : textValue,
        stuNum : stuNumValue,
        stuName : nameValue,
        faculty : facultyValue,

    });
}

window.send = send;
export{send};
// Firebase SDKs
    // Import the functions
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";
    import { getDatabase, ref, set, get, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Firebase configuration
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
// Firebase SDKs (ここまで)

// 必要な関数をインポート
import { queryDivider, generateUuid } from '../set.js';
import { differenceToCurrentUnix, differenceFromCurrentUnix, convertISO8601ToDateArray, convertUnixToDateArray, convertDateArrayToUnix, convertUnixToISO8601,convertISO8601ToUnix } from '../time.js';
import { getStudentNum, getStudentName, getStudentFac, getStudentDep, getStudentGrade, getSubjectName, getTestName, getTestDate, getTestLimit } from '../get.js';


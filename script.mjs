import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore,collection, addDoc ,getDocs } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAk2EV_FBcri18AbmhwQECMqSMIs1Kd56Y",
  authDomain: "signup-7e3f9.firebaseapp.com",
  projectId: "signup-7e3f9",
  storageBucket: "signup-7e3f9.appspot.com",
  messagingSenderId: "353076194026",
  appId: "1:353076194026:web:ad5765c9f799c884b78593"
};

const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
let name = document.getElementById('name')
let email = document.getElementById('email')
let website = document.getElementById('website')
let image = document.getElementById('imageLink')
let info = document.getElementById('cards')

document.getElementById('enroll').addEventListener('click', async() => {
    try {
    let gender = document.querySelector(".gender:checked")
        let selectedLang = []
        let lang = document.querySelectorAll(".lang:checked")
        lang.forEach(checkbox => {
            selectedLang.push(checkbox.value);
        });
  const docRef = await addDoc(collection(db, "enroll"), {
    name: name.value,
    email: email.value,
    website: website.value,
    image:image.value,
    gender:gender.value,
    languages:selectedLang,
  });
  console.log("Document written with ID: ", docRef.id);
  window.location.reload();
} 
catch (e) {
    console.error("Error adding document: ", e);
}
});

const querySnapshot = await getDocs(collection(db, "enroll"));
querySnapshot.forEach((doc) => {
            info.innerHTML += ` <div id="cc">
            <div class="ct">
            <span>${doc.data().name}</span><br>
            <span>${doc.data().gender}</span><br>
            <span>${doc.data().email}</span><br>
            <a href="${doc.data().website}" >${doc.data().website}</a><br>
            <span>${doc.data().languages.join(' , ')}</span>
            </div>
            <div class="image-container">
            <img src="${doc.data().image}" alt="">
            </div>
            </div>`
        });
document.getElementById('clear').addEventListener('click', () => {
    name.value = "";
    email.value = "";
    website.value = "";
    image.value = "";
    document.querySelectorAll('.gender').forEach(radio => radio.checked = false);
    document.querySelectorAll('.lang').forEach(checkbox => checkbox.checked = false);
});

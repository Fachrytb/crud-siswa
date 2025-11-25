// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCjXlgysJkN-2s3Gu0forgp7as5-9NqCkI",
  authDomain: "pasar-b04a7.firebaseapp.com",
  databaseURL: "https://pasar-b04a7-default-rtdb.firebaseio.com",
  projectId: "pasar-b04a7",
  storageBucket: "pasar-b04a7.appspot.com",
  messagingSenderId: "508470916587",
  appId: "1:508470916587:web:460e9a1612e92b712e15ae",
  measurementId: "G-33T7CQCWBX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi untuk mengambil daftar biodata
export async function ambilDaftarBio() {
  try {
    const refDokumen = collection(db, "Bio");
    const kueri = query(refDokumen, orderBy("nama"));
    const cuplikankueri = await getDocs(kueri);

    let hasil = [];
    cuplikankueri.forEach((dok) => {
      hasil.push({
        id: dok.id,
        nama: dok.data().nama || '',
        alamat: dok.data().alamat || '',
        nohp: dok.data().nohp || '',
        jk: dok.data().jk || '',
        agama: dok.data().agama || '',
        tgllahir: dok.data().tgllahir || '',
        hobi: dok.data().hobi || '',
        cita: dok.data().cita || '',
      });
    });

    return hasil;
  } catch (error) {
    console.error("Error mengambil data: ", error);
    return [];
  }
}

// Fungsi untuk menambah data siswa
export async function tambahDataSiswa(data) {
  try {
    await addDoc(collection(db, "Bio"), data);
    return true;
  } catch (error) {
    console.error("Error menambah data: ", error);
    return false;
  }
}

// Fungsi untuk menghapus data
export async function hapusdata(docId) {
  try {
    await deleteDoc(doc(db, "Bio", docId));
    return true;
  } catch (error) {
    console.error("Error menghapus data: ", error);
    return false;
  }
}

// Fungsi untuk memformat angka
export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
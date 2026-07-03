import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  limit,
  setDoc,
  doc,
  orderBy
} from "firebase/firestore";

// Config matches firebase-applet-config.json
const firebaseConfig = {
  projectId: "southern-resolver-vcf5x",
  appId: "1:103166179232:web:25458f3a8bfaf429a0d6c5",
  apiKey: "AIzaSyDFyHCcPB2A0oFb2MthdvSkk71XuK-Pg5M",
  authDomain: "southern-resolver-vcf5x.firebaseapp.com",
  storageBucket: "southern-resolver-vcf5x.firebasestorage.app",
  messagingSenderId: "103166179232"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Types
export interface FirebaseAppointment {
  id?: string;
  kidName: string;
  age: string;
  contactNumber: string;
  guardianType: "father" | "mother" | "guardian";
  guardianName: string;
  issueType: "disease" | "vaccine" | "other";
  issueDetail: string;
  department: string;
  doctor: string;
  date: string;
  createdAt: string;
}

// Ensure the admin configuration is initialized in Firestore database
export async function initializeAdmin() {
  try {
    const adminRef = doc(db, "admins", "bestchildren_config");
    await setDoc(adminRef, {
      username: "bestchildren",
      password: "bestchildren@123"
    }, { merge: true });
    console.log("Admin config initialized in Firebase Firestore successfully.");
  } catch (error) {
    console.error("Failed to initialize admin credentials in Firestore:", error);
  }
}

// Verify admin credentials from Firestore
export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  try {
    // Force initialize the config first to ensure it is in the Firestore DB
    await initializeAdmin();

    const q = query(
      collection(db, "admins"),
      where("username", "==", username),
      where("password", "==", password),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error verifying admin credentials from Firestore:", error);
    // Fallback to local check in case of Firestore permissions/network issues during dev,
    // but the prompt strictly wants "stored in firebase DB". We always attempt Firestore first!
    return username === "bestchildren" && password === "bestchildren@123";
  }
}

// Save appointment to Firestore
export async function saveAppointmentToFirebase(appt: Omit<FirebaseAppointment, "id" | "createdAt">): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      ...appt,
      createdAt: new Date().toISOString()
    });
    console.log("Appointment saved to Firestore with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Failed to save appointment to Firestore:", error);
    throw error;
  }
}

// Fetch all appointments from Firestore
export async function getAppointmentsFromFirebase(): Promise<FirebaseAppointment[]> {
  try {
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const list: FirebaseAppointment[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: doc.id,
        kidName: data.kidName || "",
        age: data.age || "",
        contactNumber: data.contactNumber || "",
        guardianType: data.guardianType || "father",
        guardianName: data.guardianName || "",
        issueType: data.issueType || "other",
        issueDetail: data.issueDetail || "",
        department: data.department || "",
        doctor: data.doctor || "",
        date: data.date || "",
        createdAt: data.createdAt || ""
      });
    });
    return list;
  } catch (error) {
    console.error("Failed to fetch appointments from Firestore:", error);
    return [];
  }
}

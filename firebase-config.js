// Firebase Configuration
// Replace these values with your actual Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to register student
async function registerStudent(formData) {
    try {
        const docRef = await db.collection('students').add({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            course: formData.course,
            registeredAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Student registered with ID:", docRef.id);
        alert("Registration successful!");
        return true;
    } catch (error) {
        console.error("Error registering student:", error);
        alert("Registration failed. Please try again.");
        return false;
    }
}

// Function to register company
async function registerCompany(formData) {
    try {
        const docRef = await db.collection('companies').add({
            companyName: formData.companyName,
            contactPerson: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            website: formData.website,
            industry: formData.industry,
            registeredAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Company registered with ID:", docRef.id);
        alert("Company registration successful!");
        return true;
    } catch (error) {
        console.error("Error registering company:", error);
        alert("Registration failed. Please try again.");
        return false;
    }
}

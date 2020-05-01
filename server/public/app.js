// // Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
// 	apiKey: "AIzaSyC2W6VcgO7hyo7DaNdVV-v62rsUVxBahtw",
// 	authDomain: "readly-c7224.firebaseapp.com",
// 	projectId: "readly-c7224",
// });

const db = firebase.firestore();

//add data to database
db.collection("users")
	.add({
		first: "Ada",
		last: "Lovelace",
		born: 1815,
	})
	.then(function (docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function (error) {
		console.error("Error adding document: ", error);
	});

//read data
db.collection("users")
	.get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`);
		});
	});

//########################

// document.addEventListener("DOMContentLoaded", (event) => {
// 	const app = firebase.app();

// 	console.log(app, "app");
// });
// function googleLogin() {
// 	const provider = new firebase.auth.GoogleAuthProvider();

// 	firebase
// 		.auth()
// 		.signInWithPopup(provider)
// 		.then((result) => {
// 			const user = result.user;
// 			document.write(`Hello ${user.displayName}`);
// 			document.close();

// 			console.log(user);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// }

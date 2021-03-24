import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDHjeAy--xz0jRh93YYQLXGZjKw1_1Qcec',
	authDomain: 'facebook-mini-react-app.firebaseapp.com',
	projectId: 'facebook-mini-react-app',
	storageBucket: 'facebook-mini-react-app.appspot.com',
	messagingSenderId: '420581055588',
	appId: '1:420581055588:web:6c00bc8ec9f7963fe01371',
	measurementId: 'G-WYLJ7810SL',
};
export const createUserProfileDocument = async (userAuth, additional) => {
	if (!userAuth) return;
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	if (!snapShot.exists) {
		const { email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				createdAt,
				email,
				...additional,
			});
		} catch (err) {
			console.log('error creating user', err.message);
		}
	}
	return userRef;
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

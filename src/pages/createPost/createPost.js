import React, { useState } from 'react';
import FormInput from '../../components/form-input/form-input';
import Button from '../../components/Button/Button';
import firebase, { firestore } from '../../firebase/firebase.utils';
import { useHistory } from 'react-router-dom';
import './createPost.scss';
const CreatePost = ({ userUid, currentUser }) => {
	const [text, setText] = useState('');
	const [body, setBody] = useState('');
	console.log(currentUser);
	const history = useHistory();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const postRef = await firestore.collection('posts').doc();

		// const postRef = await firestore
		// 	.collection('posts')
		// 	.doc('gxHZYxCYuSzvYDeIdnyJ');
		// const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

		// const data = await postRef.update({
		// 	likes: arrayUnion({
		// 		isLike: true,
		// 		likedUserId: currentUser.id,
		// 		likedBy: currentUser.displayName + 'qwqwqwqwqw',
		// 	}),
		// });

		// likes: [
		// 	{
		// 		isLike: false,
		// 		likedUserId: currentUser.id,
		// 		likedBy: currentUser.displayName,
		// 	},
		// ],
		// displayName: currentUser.displayName,
		// comment: [
		// 	{
		// 		message: 'message stand here',
		// 		commentedUserId: currentUser.id,
		// 		commentedBy: currentUser.displayName,
		// 		createdAt: createdAt
		// 	},
		// ],

		const createdAt = new Date();
		const data = await postRef.set({
			text: text,
			body: body,
			likes: [],
			displayName: currentUser.displayName,
			comment: [],
			createdAt,
			userId: currentUser.id,
		});
		history.push('/');
		// console.log(data);
	};
	const getSnap = async () => {
		// const postRef = await firestore.collection('posts').doc();
		// const postRef = await firestore
		// 	.collection('posts')
		// 	.doc('gxHZYxCYuSzvYDeIdnyJ');
		// const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
		// const data = await postRef.update({
		// 	likes: arrayRemove({
		// 		isLike: true,
		// 		likedBy: 'random',
		// 	}),
		// });
		// const snapshot = await
		// firestore.collection('posts').onSnapshot((snapshot) => {
		// 	const posts = snapshot.docs
		// 		.filter((doc) => doc.data().username === 'dummy')
		// 		.map((doc) => {
		// 			console.log(
		// 				doc.data(), "MMMMMMMMMMMM"
		// 			);
		// 			// return { id: doc.id, ...doc.data() };
		// 		});
		// });
		// 	let posts = snapshot.docs.map((doc) => {
		// 		// console.log(doc.id, '=>', doc.data(), 'CCCCCC');
		// 		return { id: doc.id, ...doc.data() };
		// 	});
		// 	console.log(posts);
		// 	console.log(posts.likes.filter((like) => like.likedBy == 'random'));
		// 	// console.log(posts);
		// 	// console.log(doc.id, '=>', doc.data(), 'CCCCCC');
		// });
		// console.log(posts.data().likes)
		// .filter(doc => doc.data().likes === slug)
		// .map(doc => {
		//   return { id: doc.id, ...doc.data() }
		// });
		// })
		// const data = await snapshot.where('likes', 'array-contains-any').get();
		// console.log(data);
		// snapshot.forEach((doc) => {
		// 	let liked;
		// 	// console.log(doc.data().likes);
		// 	liked = doc.data().likes;
		// 	// if (doc.data().likes.find((like) => like.likedBy === 'random')) {
		// 	// 	console.log(doc.id, '=>', doc.data(), 'CCCCCC');
		// 	// }
		// 	console.log(liked.filter((like, i) => i === 2));
		// });
		// // console.log(likes);

		// const postRef = await firestore
		// 	.collection('posts')
		// 	.where('likes')
		// 	.get();
		// console.log(postRef, 'sqsqsq');
	};

	React.useEffect(() => {
		getSnap();
	}, []);

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		if (name === 'text') {
			setText(value);
		}
		if (name === 'body') {
			setBody(value);
		}
	};
	return (
		<div className='create-post'>
			<div className='container'>
				<form onSubmit={handleSubmit}>
					<FormInput
						name='text'
						onChange={handleChange}
						value={text}
						type='text'
						label='Text'
						required
					/>
					<label htmlFor='body'>Body</label>
					<textarea
						name='body'
						value={body}
						required
						onChange={handleChange}
						className='textarea'
						rows='4'
					></textarea>
					<div className='buttons'>
						<Button type='submit'>Create Post</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreatePost;

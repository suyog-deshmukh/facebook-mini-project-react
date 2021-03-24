import React, { useState } from 'react';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input';
import Button from '../../components/Button/Button';
import firebase, { firestore } from '../../firebase/firebase.utils';
import './editPost.scss';
const EditPost = (props) => {
	const [text, setText] = useState('');
	const [body, setBody] = useState('');
	// console.log(currentUser);
	const { editPost } = useParams();
	const history = useHistory();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const postRef = await firestore.collection('posts').doc(editPost).update({
			text: text,
			body: body,
		});
		history.push('/');

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
	};

	React.useEffect(() => {
		const getSnap = async () => {
			const postRef = await firestore.collection('posts').doc(editPost).get();
			setText(postRef.data().text);
			setBody(postRef.data().body);
		};
		getSnap();
	}, [editPost]);

	const handleChange = async (event) => {
		event.preventDefault();
		const { name, value } = event.target;

		if (name === 'text') {
			setText(value);
		}
		if (name === 'body') {
			setBody(value);
		}
		console.log(text, body);
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
						<Button type='submit'>Edit Post</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withRouter(EditPost);

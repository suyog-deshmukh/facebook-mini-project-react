import React, { useState } from 'react';
import firebase, { firestore } from '../../firebase/firebase.utils';
import './commentBox.scss';

const CommentBox = ({ currentUser }) => {
	const [comment, setComment] = useState('');
	const handlerSubmit = async (event) => {
		event.preventDefault();
		const postRef = await firestore
			.collection('posts')
			.doc('gxHZYxCYuSzvYDeIdnyJ');
		const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

		await postRef.update({
			comment: arrayUnion({
				message: comment,
				messagerId: currentUser.id,
				messagerName: currentUser.displayName,
			}),
		});
	};

	const handlerChange = (event) => {
		event.preventDefault();
		const { value } = event.target;
		setComment(value);
	};

	return (
		<div>
			<form onSubmit={handlerSubmit}>
				<div className='comment-box-group'>
					<input
						onChange={handlerChange}
						className='comment-input'
						type='text'
					/>
					<button className='comment-send' type='submit'>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};
export default CommentBox;

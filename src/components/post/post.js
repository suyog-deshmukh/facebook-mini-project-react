import React, { useEffect } from 'react';
import './post.scss';
import { withRouter, useHistory } from 'react-router-dom';
import { firestore } from '../../firebase/firebase.utils';
import CommentBox from '../commentBox/commentBox';
import Messages from '../messages/messages';

const Post = ({ post, match, onDeleteRecord, currentUser }) => {
	const history = useHistory();

	console.log(post.comment, 'messages');
	// useEffect(() => {}, []);

	const [showMessage, setShowMessage] = React.useState(false);
	return (
		<div className='post'>
			<div className='top-bar'>Created By-{post.displayName}</div>
			<div className='title'>{post.text}</div>
			<div className='body'>{post.body}</div>

			<div className='bottom-bar'>
				{match.path === '/' ? (
					<div className='user-button'>
						<button className='button like-button'>Like Button</button>
						<button
							className='button comment-button'
							// onClick={() => {
							// 	setShowMessage(!showMessage);
							// }}
						>
							message Button
						</button>
					</div>
				) : (
					<div className='admin-button'>
						<button
							className='button'
							onClick={() => history.push(`my-posts/edit/${post.id}`)}
						>
							Edit
						</button>
						<button className='button' onClick={onDeleteRecord}>
							Delete
						</button>
					</div>
				)}
				{/* {showMessage ? (
					<div className={`${showMessage ? 'bottom-hight' : ''} showMessages`}>
						<CommentBox currentUser={currentUser} />
						{post.comment
							? post.comment((comment, i) => (
									<Messages message={comment} key={i} />
							  ))
							: null}
					</div>
				) : null} */}
			</div>
		</div>
	);
};

export default withRouter(Post);

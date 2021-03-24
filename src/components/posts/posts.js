import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { useHistory, withRouter } from 'react-router-dom';
import './posts.scss';
import Post from '../post/post';
import { firestore } from '../../firebase/firebase.utils';
const Posts = ({ currentUser }) => {
	const [posts, setPosts] = useState(null);
	const [like, setLike] = React.useState(false);

	const history = useHistory();

	const fetchPosts = async () => {
		// const fetchPosts = await fetch(
		// 	'https://jsonplaceholder.typicode.com/posts'
		// );
		// const data = await fetchPosts.json();
		// setPosts(data.filter((post, i) => i < 10));
		const postsRef = firestore.collection('posts');
		const snapShot = await postsRef.get();
		let posts = [];
		snapShot.forEach((doc) => {
			console.log({ id: doc.id, ...doc.data() });
			posts.push({ id: doc.id, ...doc.data() });
		});
		setPosts(posts);
	};
	if (currentUser) {
		console.log(currentUser);
		const fetchLikes = async () => {
			firestore.collection('posts').onSnapshot((snapshot) => {
				const posts = snapshot.docs
					.filter((doc) => doc.data().likes)
					.map((doc) => {
						return { id: doc.id, ...doc.data() };
					});
				console.log(posts);

				// let posts = snapshot.docs
				// 	.filter(
				// 		(doc) => {
				// 			console.log(doc.data().likes)
				// 			// doc.data().likes.userId == 'd1JiicZcffbwsS4XFHtFtS4RRF53'
				// 		}
				// 	)
				// 	console.log(posts)
				// .map((doc) => {
				// 	console.log(doc.data());
				// 	// doc.data().userId, "MMMMMMMMMMMM"

				// 	// return { id: doc.id, ...doc.data() };
				// });
			});

			// let posts = snapshot.docs.map((doc) => {
			// 	// console.log(doc.id, '=>', doc.data(), 'CCCCCC');
			// 	return { id: doc.id, ...doc.data().likes };
			// });
			// console.log(posts);
			// console.log(
			// 	posts.find((like) => {
			// 		console.log(like,like.userId, currentUser.id);

			// 	})
			// );
			// console.log(doc.id, '=>', doc.data(), 'CCCCCC');
			// });
		};
		// fetchLikes();
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div className='posts'>
			<button
				className='create-post'
				onClick={() => {
					console.log('Hii');
					history.push('/create-post');
				}}
			>
				Create Post
			</button>
			{/* <Button
				className='create-post'
				onClick={() => {
					console.log('Hii');
					history.push('/create-post');
				}}
			>
				Create Post
			</Button> */}
			{posts
				? posts.map((post) => (
						<Post key={post.id} post={post} currentUser={currentUser} />
				  ))
				: null}
		</div>
	);
};

export default withRouter(Posts);

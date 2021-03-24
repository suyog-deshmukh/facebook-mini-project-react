import React from 'react';
import './myPosts.scss';
import Post from '../../components/post/post';
import { firestore } from '../../firebase/firebase.utils';

const MyPosts = ({ currentUser }) => {
	const [myPosts, setMyPosts] = React.useState(null);

	React.useEffect(() => {
		const fetchMyPosts = async () => {
			// const fetchMyPosts = await fetch(
			// 	'https://jsonplaceholder.typicode.com/myPosts'
			// );
			// const data = await fetchMyPosts.json();
			// setMyPosts(data.filter((post, i) => i < 10));
			const myPostsRef = firestore.collection('posts');
			const snapShot = await myPostsRef
				.where('userId', '==', currentUser.id)
				.get();
			let myPosts = [];
			snapShot.forEach((doc) => {
				console.log({ id: doc.id, ...doc.data() }, 'MY___POSTS');
				myPosts.push({ id: doc.id, ...doc.data() });
			});
			setMyPosts(myPosts);
		};
		fetchMyPosts();
	}, [currentUser.id]);
	const onDeleteRecord = async (id) => {
		console.log(id);
		await firestore.collection('posts').doc(id).delete();
		const myPostsRef = firestore.collection('posts');
		const snapShot = await myPostsRef
			.where('userId', '==', currentUser.id)
			.get();
		let myPosts = [];
		snapShot.forEach((doc) => {
			console.log({ id: doc.id, ...doc.data() }, 'MY___POSTS');
			myPosts.push({ id: doc.id, ...doc.data() });
		});
		setMyPosts(myPosts);
	};
	return (
		<div>
			{myPosts
				? myPosts.map((post) => (
						<Post
							key={post.id}
							post={post}
							onDeleteRecord={() => onDeleteRecord(post.id)}
						/>
				  ))
				: null}
		</div>
	);
};

export default MyPosts;

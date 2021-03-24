import './App.css';
import { Switch, Route } from 'react-router-dom';
import {
	auth,
	createUserProfileDocument,
	firestore,
} from './firebase/firebase.utils';
import HomePage from './pages/HomePage/HomePage';
import MyPosts from './pages/myPosts/myPosts';
import Header from './components/Header/Header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import React from 'react';
import CreatePost from './pages/createPost/createPost';
import EditPost from './pages/editPost/editPost';
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUser: null,
		};
	}
	userUid;
	componentDidMount() {
		this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				this.userUid = userAuth.uid;
				try {
					const userRef = await createUserProfileDocument(userAuth);
					userRef.onSnapshot((snapshot) => {
						this.setState({
							currentUser: { id: snapshot.id, ...snapshot.data() },
						});
					});
				} catch (err) {
					console.log(err);
				}
			} else {
				this.setState({
					currentUser: userAuth,
				});
			}

			const getSnap = await firestore.collection('posts').get();

			getSnap.forEach((doc) => {
				console.log(doc.id, '=>', doc.data().likes.userId);
			});

			// this.props.onSetCurrentUser({ currentUser: user });
			// console.log(user);
		});
	}
	componentWillUnmount() {
		this.unSubscribeFromAuth();
	}
	render() {
		return (
			<div className='App'>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route
						exact
						path='/'
						render={() => <HomePage currentUser={this.state.currentUser} />}
					/>
					<Route exact path='/signin' component={SignInAndSignUp} />
					<Route
						exact
						path='/my-posts'
						render={() => <MyPosts currentUser={this.state.currentUser} />}
					/>
					<Route
						path='/my-posts/edit/:editPost'
						render={() => (
							<EditPost
								userUid={this.userUid}
								currentUser={this.state.currentUser}
							/>
						)}
					/>
					<Route
						exact
						path='/create-post'
						render={() => (
							<CreatePost
								userUid={this.userUid}
								currentUser={this.state.currentUser}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;

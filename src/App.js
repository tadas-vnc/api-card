import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
function Post(prop){
  return(
    <div className='post'>
      <div className='poster'>{prop.poster}</div>
      <hr></hr>
      <h2>{prop.title}</h2>
      <p>{prop.content}</p>
    </div>
  )
}
let once = true;
function App() {
  const [posts, setPosts] = useState([]);
  let [users, setUsers] = useState([]);
  let [unparsedPosts, setUnparsedPosts] = useState([]);
  let [fetched, setFetched] = useState(false);
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts").then(data=>{return data.json();}).then(data=>{
      setUnparsedPosts(data);
    })
    fetch("https://jsonplaceholder.typicode.com/users").then(data=>{return data.json();}).then(data=>{
      setUsers(data);
    })
  },[])

  useEffect(()=>{
    if(users.length != 0 && unparsedPosts.length != 0 && !fetched){
      console.log(users)
      console.log(unparsedPosts)
      console.log("Successfully fetched")
      setFetched(true);
    }
  },[users,unparsedPosts])
  return (
    <div className="App">
      { 
        unparsedPosts.map(post=>{
          return (<Post title={post.title} content={post.body} poster={(users[post.userId]?.name || "Unknown")} key={post.id}></Post>)
        })
      }
    </div>
  );
}

export default App;

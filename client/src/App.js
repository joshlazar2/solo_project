import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import OneUser from './components/OneUser';
import SearchResults from './components/SearchResults';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/editPost/:id' element={<EditPost />} />
        <Route path='/oneUser/:user_id' element={<OneUser />} />
        <Route path='/searchResults/:firstName/:lastName' element={<SearchResults />} />
      </Routes>
    </div>
  );
}

export default App;

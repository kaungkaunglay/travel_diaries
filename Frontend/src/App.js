import './App.css';
import Header from './header/Header';
import {Route, Routes} from 'react-router-dom';
import Home from './Home/home';
import Diaries from './diaries/Diaries';
import Auth from './auth/Auth';
import Add from './diaries/Add';
import DiariesUpdate from './diaries/DiariesUpdate';
import Profile from './profile/profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store';
function App() {
  const dispatch = useDispatch(); 
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login()); 
    }
  }, [localStorage]);
  return (
    <div>
      <header>
          <Header/>
      </header>
      <section>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/diaries' element={<Diaries/>}/>
          <Route path='/auth' element={<Auth/>}/>
       {
        isLoggedIn && <> 
         <Route path='/add' element={<Add/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/post/:id' element={<DiariesUpdate/>}/>
        </>
       }
        </Routes>
      </section>
    </div>

  );
}

export default App;

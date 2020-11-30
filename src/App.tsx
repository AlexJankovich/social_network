import 'antd/dist/antd.css';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import s from './App.module.scss';
import {Preloader} from './common/preloader/Preloader';
import {DialogsConnectContainer} from './components/Dialogs/dialogsConnectContainer';
import {HeaderContainer} from './components/Header/HeaderContainer';
import {Login} from './components/Login/Login';
import {NavBar} from './components/Navbar/Navbar';
import {ProfileContainer} from './components/Profile/ProfileContainer';
import {UsersHookContainer} from './components/Users/UsersHookContainer';
import {InitializeApp} from './Redux/App-reducer';
import {AppStateType} from './Redux/redux-store';

const App = React.memo(() => {

  const appProps = useSelector<AppStateType>(state => state.App.initialized);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(InitializeApp());
  }, [dispatch]);

  return (<>
      <BrowserRouter>
        <div className={s.pageWrapper}>
          <HeaderContainer/>
          <div className={s.content}>
            <div className={s.contentContainer}>
              <div className={s.box}>
                <div className={s.navbar}>
                  <NavBar/>
                </div>
                <div className={s.main}>
                  {!appProps ? <div className='appPreloader'><Preloader/></div> : null}
                  <Route path='/Dialogs'
                         render={() => <DialogsConnectContainer/>}/>
                  <Route path='/Profile/:userId?'
                         render={() => <ProfileContainer/>}/>
                  <Route path='/users'
                         render={() => <UsersHookContainer/>}/>
                  <Route path='/login'
                         render={() => <Login/>}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
    ;
});

export default App;

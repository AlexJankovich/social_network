import React, {useEffect} from 'react';
import s from './App.module.scss';
import {NavBar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import {DialogsConnectContainer} from "./components/Dialogs/dialogsConnectContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {UsersHookContainer} from './components/Users/UsersHookContainer';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./Redux/redux-store";
import {InitializeApp} from "./Redux/App-reducer";
import {Preloader} from "./common/preloader/Preloader";
// import {Layout} from 'antd'
import 'antd/dist/antd.css';

// const {Header, Footer, Content, Sider} = Layout;

const App = React.memo(() => {

    const appProps = useSelector<AppStateType>(state => state.App.initialized)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(InitializeApp())
    }, [dispatch])

    return (<>
            {/*<BrowserRouter>*/}
            {/*    <Layout>*/}
            {/*        <Header>*/}
            {/*            header*/}
            {/*            <HeaderContainer/>*/}
            {/*        </Header>*/}
            {/*        <Layout>*/}
            {/*            <Sider>*/}
            {/*                Navbar*/}
            {/*                <NavBar/>*/}
            {/*            </Sider>*/}
            {/*            <Content>*/}
            {/*                content*/}
            {/*                {!appProps ? <div className='appPreloader'><Preloader/></div> : null}*/}
            {/*                <Route path='/Dialogs'*/}
            {/*                       render={() => <DialogsConnectContainer/>}/>*/}
            {/*                <Route path='/Profile/:userId?'*/}
            {/*                       render={() => <ProfileContainer/>}/>*/}
            {/*                <Route path='/users'*/}
            {/*                       render={() => <UsersHookContainer/>}/>*/}
            {/*                <Route path='/login'*/}
            {/*                       render={() => <Login/>}/>*/}
            {/*            </Content>*/}
            {/*        </Layout>*/}
            {/*        <Footer>*/}
            {/*            Footer*/}
            {/*        </Footer>*/}
            {/*    </Layout>*/}
            {/*</BrowserRouter>*/}

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
})

export default App;

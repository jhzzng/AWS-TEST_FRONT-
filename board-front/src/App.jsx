import { useState } from 'react'
import './App.css'
import { Routes, Route} from 'react-router-dom';
import Header from './component/Header';
import BoardDetail from './component/BoardDetail';
import BoardList from './component/BoardList';
import BoardModify from './component/BoardModify';
import BoardWrite from './component/BoardWrite';
import Login from './component/Login';
import Join from './component/Join';
function App() {
  
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/boardDetail/:num" element={<BoardDetail/>}/>
      <Route path="/" element={<BoardList/>}/>
      <Route path="/boardModify/:num" element={<BoardModify/>}/>
      <Route path="/boardWrite" element={<BoardWrite/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/join" element={<Join/>}/>
    </Routes>
    </>
  )
}

export default App

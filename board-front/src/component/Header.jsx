import { useSelector, useDispatch } from "react-redux";
import { initState } from '../reducer';
import { useNavigate } from 'react-router-dom';
import './Header.css'
export default function Header() {
    const user = useSelector(state=>state.persistedReducer.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = (e) => {
       e.preventDefault();
       dispatch({type:"USER", payload:{...initState}});
       navigate("/login");
    }

    return (
        <div id="header">
            <img src="/kosta.png" width="100px" height="100px"/>&nbsp;
                {user.id? <>
                            <b>{user.name}</b>&nbsp;&nbsp;
                            <a href="#" className="a" onClick={logout}>로그아웃</a>
                          </> :
                    <a href="/login" className="a" >로그인</a>
                }&nbsp;&nbsp;&nbsp;
                <a href="/join" className="a">회원가입</a>&nbsp;&nbsp;&nbsp;
                <a href="/" className="a">게시판목록</a><br/><br/>
        </div>
        )
}
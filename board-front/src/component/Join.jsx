import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import { Modal } from "antd";
import axios from "axios";
import { url } from "../config";
import './Join.css'
export default function Join() {
    const [user, setUser] = useState({id:'',name:'',passowrd:'',email:'',address:'',detailAddress:''});
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const edit = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }
    const themeObj = {
        bgColor: "", 			// 바탕 배경색
        searchBgColor: "", 		// 검색창 배경색
        contentBgColor: "", 		// 본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        pageBgColor: "", 		// 페이지 배경색
        textColor: "", 			// 기본 글자색
        queryTextColor: "", 		// 검색창 글자색
        postcodeTextColor: "", 	// 우편번호 글자색
        emphTextColor: "", 		// 강조 글자색
        outlineColor: "" 		// 테두리
    };

    const postCodeStyle = {
        width: '360px',
        height: '480px',
    };    

    const completeHandler = (data) => {
        const { address } = data;
        setUser({...user, address:address});
    };

    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE') {
            setIsOpen(false);
        } else if (state === 'COMPLETE_CLOSE') {
            setIsOpen(false);
        }
    };    

    const checkDoubleId = (e) => {
        e.preventDefault();
        axios.post(`${url}/memberDoubleId`, {id:user.id})
            .then(res=> {
                console.log(res)
                if(res.data==true) {
                    alert("사용중인 아이디입니다");
                } else {
                    alert("사용 가능한 아이디입니다");
                }
            })
    }

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${url}/join`,user)
            .then(res=> {
                console.log(res)
                if(res.data==true) {
                    navigate("/login")
                } else {
                    alert("회원가입 실패")
                }
            }).catch(err=> {
                console.log(err)
            })
    }

    return (
        <>
            <div className="center"><h3>회원가입</h3></div>
            <form onSubmit={submit}>
                <table border="1" className="container">
                    <tbody>
                    <tr><th>아이디</th>
                    <td>
                        <input type="text" name="id" id="id" onChange={edit} />&nbsp;
                        <button onClick={checkDoubleId}>중복</button>
                    </td></tr>
                    <tr><th>이름</th>
                    <td>
                        <input type="text" name="name" onChange={edit}/>
                    </td></tr>
                    <tr><th>비밀번호</th>
                    <td>
                        <input type="password" name="password" onChange={edit}/>
                    </td></tr>
                    <tr><th>이메일</th>
                        <td><input type="text" name="email" onChange={edit}/>
                    </td></tr>
                    <tr><th>주소</th>
                        <td><input type="button" value="주소 찾기" onClick={()=>setIsOpen(!isOpen)}/><br/>
                            <input type="text" id="address" name="address" placeholder="주소" value={user.address} readOnly/><br/>
                            <input type="text" id="detailAddress" name="detailAddress" placeholder="상세주소" onChange={edit}/>
                        </td></tr>
                    <tr><td colSpan="2" className="center">
                        <input type="submit" value="회원가입"/>
                    </td></tr>
                    </tbody>
                    </table>
            </form>
            { isOpen &&
            <Modal title="주소입력"
                open={isOpen} footer={null} >
                <DaumPostcode onComplete={completeHandler} onClose={closeHandler}/>
            </Modal>}
        </>
    )
}
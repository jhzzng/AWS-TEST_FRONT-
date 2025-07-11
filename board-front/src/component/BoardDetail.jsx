import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";
import { url } from "../config";
import './BoardDetail.css';
export default function BoardDetail() {
    const [board, setBoard] = useState({num:'',title:'',content:'',imgFileName:null,fileName:null});
    const user = useSelector(state=>state.persistedReducer.user);
    const [like, setLike] = useState(false);
    const { num } = useParams();

    useEffect(()=> {
        axios.post(`${url}/detail`, {id:user.id,num:num})
            .then(res=> {
                console.log(res)
                setBoard(res.data.board);
                setLike(res.data.isLike);
            })
            .catch(err=> {
                console.log(err)
            })

    },[])

    const likeClick = () => {
        axios.post(`${url}/like`,{id:user.id,num:num})
            .then(res=> {
                console.log(res);
                setLike(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return (
        <>
            <h2>게사판 글 상세</h2>
            <table border="1">
                <tbody>
                <tr>
                    <td className="td_left"><label>글쓴이</label></td>
                    <td className="td_right"><span>{board.writer}</span></td>
                </tr>
                <tr>
                    <td className="td_left"><label>제목</label></td>
                    <td className="td_right"><span>{board.title}</span></td>
                </tr>
                <tr>
                    <td className="td_left"><label>내용</label></td>
                    <td className="td_right"><div id="content">{board.content}</div></td>
                </tr>
                {
                    board.imgFileName != null?
                    <tr>
                        <td className="td_left"><label>이미지</label></td>
                        <td className="td_right">
                            <img src={`${url}/image?filename=${board.imgFileName }`} width="100px" />
                        </td>
                    </tr> :''
                }
                {
                    board.fileName !=null?
                    <tr>
                        <td className="td_left"><label>파일다운로드</label></td>
                        <td className="td_right">
                            <a href={`${url}/filedown?filename=${board.fileName }`}>{board.fileName}</a>
                        </td>
                    </tr> :''
                }
                </tbody>
            </table>
            <div id="commandCell">
                { user.id==board.writer && 
                    <>
                        <a href={`/boardModify/${board.num}`}>수정</a>&nbsp;&nbsp;&nbsp;
                    </>
                }
                <a href="/">목록</a>&nbsp;&nbsp;&nbsp;
                { user.id?
                    <img src={like? "/redheart.png":"/blackheart.png"} onClick={likeClick}
                        width="30px" height="30px" style={{marginTop:"5px"}} />:''
                }
            </div>        
        </>
    )
}
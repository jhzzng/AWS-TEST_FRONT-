import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { url } from "../config";
import './BoardModify.css';
export default function BoardModify() {
    const [board, setBoard] = useState({num:'',title:'',content:'',imgFileName:'',fileName:''});
    const [ifile, setIfile] = useState(null);
    const [dfile, setDfile] = useState(null);
    const { num } = useParams();
    const navigate = useNavigate();

	const  readURL = (input) => {
		if(input.target.files && input.target.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				document.getElementById("preview").src = e.target.result;
			}
			reader.readAsDataURL(input.target.files[0]);
            setIfile(input.target.files[0]);
		}
	}    

    const submit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("num", board.num);
        formData.append("title", board.title);
        formData.append("content", board.content);
        formData.append("writer", board.writer);
        if(ifile!=null) formData.append("ifile",ifile);
        if(dfile!=null) formData.append("dfile",dfile);

        axios.post(`${url}/modify`,formData)
            .then(res=> res.data)
            .then(data=> {
                navigate(`/boardDetail/${data.num}`);
            })
            .catch(err=> {
                console.log(err)
            })

    }

    useEffect(()=>{
        axios.get(`${url}/detail?num=${num}`)
            .then(res=> {
                console.log(res.data)
                setBoard(res.data);
            })
            .catch(err=>{
                console.log(err)
            })
    },[])

    const dFileChange = (e) => {
        setBoard({...board, fileName:e.target.files[0].name});
        setDfile(e.target.files[0]);
    }

    const edit = (e) => {
        setBoard({...board, [e.target.name]:e.target.value});
    }

    return (
        <>
            <h2>게시판글수정</h2>
            <form onSubmit={submit}>
                <table>
                    <tbody>
                    <tr>
                        <td className="td_left"><label>글쓴이</label></td>
                        <td className="td_right">
                            <input type="text" name="writer" defaultValue={board.writer } readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td className="td_left"><label>제목</label></td>
                        <td className="td_right">
                            <input name="title" type="text" required="required" defaultValue={board.title} onChange={edit}/></td>
                    </tr>
                    <tr>
                        <td className="td_left"><label>내용</label></td>
                        <td><textarea name="content"
                            cols="40" rows="15" required="required" defaultValue={board.content} onChange={edit}></textarea></td>
                    </tr>
                    <tr>
                        <td className="td_left"><label>이미지</label></td>
                        <td className="td_right">
                            <img src={board.imgFileName? `${url}/image?filename=${board.imgFileName}`:'/plus.png'}
                                 width="100px" id="preview" onClick={()=>document.getElementById('ifile').click()} />
                            <input type="file" name="ifile" id="ifile" accept="image/*" style={{display: "none"}}
                                onChange={readURL}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="td_left"><label>파일 첨부</label></td>
                        <td className="td_right">
                            <span id="dfilename" onClick={()=>document.getElementById('dfile').click()}>
                                {board.fileName? board.fileName:'파일없음'}
                            </span>
                            <input type="file" name="dfile" id="dfile" style={{display: "none"}}
                                onChange={dFileChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <section id="commandCell">
                    <input type="submit" value="수정"/>&nbsp;&nbsp;
                        <a href="/">목록</a>&nbsp;&nbsp;&nbsp;
                </section>
            </form>
        </>
    )
}
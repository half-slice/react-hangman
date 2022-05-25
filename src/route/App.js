import { useState,useEffect } from 'react';
import engWord from "../eng.txt";
import HangMan from "../component/HangManPixel"

function App() {
  const [word,setWord] = useState([]);
  const [index,setIndex] = useState("");
  const [targetWord,setTargetWord] = useState("");
  const [hideWord,setHideWord] = useState("");
  const [loading,setLoading] = useState(true);
  const [life,setLife] = useState(0);
  
  const [level,setLevel] = useState("easy");

  useEffect(()=>{
    getWord();
  },[]);

  const getWord = async() => {
    await fetch(engWord)
      .then(eng => eng.text())
      .then(eng => {
        setWord(eng.split(",\r\n"));
        setLoading(false);
      });
  }

  //랜덤 단어 출력
  const getRandom = () => {
    let w = word[Math.floor(Math.random()*word.length)].split("");
    let h = [];
    let l = w.length;
    for(let i=0; i<w.length; i++){
      h.push("_");
    }
    
    //나중에 레벨 생기면 그때가서 작업
    // if(l<=5){
    //   setLife(4)
    // }
    // else if(l<=8){
    //   setLife(6)
    // }
    // else if(l>=9){
    //   setLife(8)
    // }

    setTargetWord(w);
    setHideWord(h);
    setLife(7);
    console.log(w);
  } 

  //타이핑 인식
  const onTyping = (event) => {
    const {target : {value},
    } = event;
    setIndex(value);
  }

  //시작버튼 클릭
  const onSubmit = (event) => {
    event.preventDefault();
    getRandom();
  }

  //레벨 확인
  const onChange = (event) => {
    const {
      target : {value},
    } = event;
    setLevel(value);
  }

  const onChecking =() => {
    if(targetWord.indexOf(index)!=-1){
      let x = hideWord.map((v,i)=>{
        if(targetWord[i]==index){
          return index
        }
        return v;
      })
      setHideWord(x);
      if(x.indexOf("_")==-1){
        getRandom();
      }
    }
    else{
      alert("wrong");
      setLife(life-1);
      if(life==0){
        alert("you lose");
        setTargetWord("");
        
      }
    }
  }

  //정답적는 입력문 함수
  const onKeyDown = (e) => {
    if(e.key=="Enter"){
      onChecking()
    }
    setIndex("");
  }

  return (
    <div>
      {loading ? (
        <h1>Lading...</h1>
      ) : (
        <div>
          <h1>hangman Game</h1>
          <form onSubmit={onSubmit}>
            <select value = {level} onChange={onChange}>
              <option value="easy">easy</option>
              <option value="normal">normal</option>
              <option value="hard">hard</option>
            </select>
            <button type="submit">{targetWord ? "change" : "start"}</button>
          </form>
          <hr/>
          {targetWord && (
            <>
            <div>
              {hideWord}
              <ul />
              <input
                type="text"
                maxLength="1"
                onKeyDown={onKeyDown}
                value={index}
                onChange={onTyping} 
              />
              <ul />
            </div>
            <HangMan life={life}/>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
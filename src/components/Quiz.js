import { useEffect, useState } from "react"
import useSound from "use-sound";
import play from '../sounds/play.mp3'
import correct from '../sounds/correct.mp3'
import wrong from '../sounds/wrong.mp3'
 function Quiz({data,setstop,setQuestionNumber,questionNumber}){
     const [question,setQuestion]=useState(null)
     const [selectedAnswer,setselectedAnswer]=useState(null)
     const [className,setClassName]=useState("answer active")
     const [letsPlay]=useSound(play)
     const [correctPlay]=useSound(correct)
     const [wrongPlay]=useSound(wrong)
     useEffect(()=>{
        letsPlay()
     },[letsPlay])
     useEffect(()=>{
            setQuestion(data[questionNumber-1])
     },[data,questionNumber])
 
     const delay=(duration,callback)=>{
            setTimeout(()=>{
                callback()
            },duration)
     }

     const handleClick=(a)=>{
        setselectedAnswer(a);
        setClassName("answer active");
        delay(3000,()=> setClassName(a.correct ? "answer correct" : "answer incorrect"))
        delay(6000,()=>{
            if(a.correct){
                setQuestionNumber(prev=>prev+1)
                correctPlay()
            }else{
                setstop(true)
                wrongPlay()
            }
        })
     }
    return(
        <div className="quiz">
            <div className="question">{question?.question}  </div>
            <div className="answers">
                {question?.answers.map((a)=>(
                    <div className={selectedAnswer === a ? className:"answer"} onClick={()=>handleClick(a)}>
                        {a.text}
                    </div>
                ))}
                    
                  
            </div>
        </div>
    )
}

export default Quiz
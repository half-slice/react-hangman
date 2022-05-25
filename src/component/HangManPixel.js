import react, { useEffect, useState } from "react"

const  HangManPixel = ({ life }) => {
    const [hangPixel,setHangPixel] = useState("");

    useEffect(()=>{
        let x="";
        switch(life){
            case 7:
                setHangPixel("");
                break;
            case 6:
                setHangPixel(`
                _______
                |     |  
                | 
                | 
                |
                |
                |
                |_______
                `)
                break;
            case 5:
                setHangPixel(`
                _______
                |     |  
                |     0
                |
                |
                |
                |
                |_______
                `)
                break;
            case 4:
                setHangPixel(`
                _______
                |     |  
                |     0
                |     ㅜ
                |
                |
                |
                |_______
                `)
                break;
            case 3:
                setHangPixel(`
                _______
                |     |  
                |     0
                |   / ㅜㄱ
                |
                |
                |
                |_______
                `)
                break;
            case 2:
                setHangPixel(`
                _______
                |     |  
                |     0
                |   / ㅜㄱ
                |     |
                |
                |
                |_______
                `)
                break;
            case 1:
                setHangPixel(`
                _______
                |     |  
                |     0
                |   / ㅜㄱ
                |     |
                |     ㅅ
                |
                |_______
                `)
                break;
            case 0:
                setHangPixel(`
                _______
                |     |  
                |     0
                |   / ㅜㄱ
                |     |
                |     ㅅ
                |    |  |
                |_______
                `)
                break;
        }
    },[ life ])

    return(
        <div>
            <h3>Life : {life}</h3>
            <ul/>
            <h4 className="hangman">
                {hangPixel}
            </h4>
        </div>
    )
}

export default HangManPixel;
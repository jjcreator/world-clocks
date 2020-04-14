import React, {useState, useEffect, useRef} from 'react'
import styles from "./clockStyles.module.css"

function Clock(props) {
    const hourHandRef = useRef(null);
    const minuteHandRef = useRef(null);
    const secondHandRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(new Date());
    const [animation, setAnimation] = useState("");

    useEffect(()=> {
        const myInterval =
        setInterval(()=> {
            let myHour = new Date();
            setCurrentTime(myHour);
        }, 1000);
        return function cleanup() {
            clearInterval(myInterval)
        }
        
    }, []);

    useEffect(()=> {
        let currentHour = currentTime.getHours();
        let currentMinute = currentTime.getMinutes();
        let currentSecond = currentTime.getSeconds();
        if (currentHour === 0 || currentMinute === 0 || currentSecond === 0) {
            setAnimation(styles.noAnimation)
        }
        else {
            setAnimation("")}
        hourHandRef.current.style.transform = `rotate(${currentHour * 30}deg)`;
        minuteHandRef.current.style.transform = `rotate(${currentMinute * 6}deg)`;
        secondHandRef.current.style.transform = `rotate(${currentSecond * 6}deg)`;
        
    }, [currentTime]);

    const createDials = () => {
        let emptyJSX = [];
        for (let i = 0; i < 12; i++) {
            let dialStyle = {
                transform: `rotate(${i *  30}deg)`,
            }

            let specialDialStyle = {
                marginTop: "10px"
            }

            i === 0 || i === 3 ||  i === 6 || i === 9 ? 
            specialDialStyle.marginTop = "10px" : specialDialStyle.marginTop = "-10px";

            let thisDial = 
            <div className={`${styles.dialHand}`} style={dialStyle} key={i}>
                <div className={styles.dial} style={specialDialStyle} key={i}></div>
            </div>
            emptyJSX.push(thisDial)
        }
        return emptyJSX;
    }

    return (
        <>
        
        <div>{currentTime.toLocaleTimeString()}</div>
        <div className={styles.clockFace}>
            {createDials()}
            <div ref={hourHandRef} className={`${styles.clockHand} ${styles.hourHand} ${animation}`}/>
            <div ref={minuteHandRef} className={`${styles.clockHand} ${styles.minuteHand} ${animation}`}/>
            <div ref={secondHandRef} className={`${styles.clockHand} ${styles.secondHand} ${animation}`}/>
        </div>
        </>
    )
}

export default Clock

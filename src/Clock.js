import React, {useState, useEffect, useRef} from 'react'
import styles from "./clockStyles.module.css"

function Clock(props) {
    const hourHandRef = useRef(null);
    const minuteHandRef = useRef(null);
    const secondHandRef = useRef(null);
    const myClock = useRef(null);
    const [amHour, setAmHour] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [animation, setAnimation] = useState(styles.noAnimation);

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
        if (props.timeDifference) {
            currentHour = currentHour + props.timeDifference;
        };
        let currentMinute = currentTime.getMinutes();
        let currentSecond = currentTime.getSeconds();
        if (currentHour === 0 || currentMinute === 0 || currentSecond === 0) {
            setAnimation(styles.noAnimation);
        }
        else {
            setAnimation("")}
        hourHandRef.current.style.transform = `rotate(${currentHour * 30 + (currentMinute / 2) }deg)`;
        minuteHandRef.current.style.transform = `rotate(${currentMinute * 6}deg)`;
        secondHandRef.current.style.transform = `rotate(${currentSecond * 6}deg)`;
        if (currentHour <= 11 || currentHour >= 24) {
            setAmHour(true)
        }
        else setAmHour(false);
    }, [currentTime, props.timeDifference]);

    const createDials = () => {
        let myDials = [];
        for (let i = 0; i < 12; i++) {
            let dialStyle = {
                transform: `rotate(${i *  30}deg)`,
            }

            let specialDialStyle = {
                marginTop: "10px"
            }

            let specialHourStyle = {
                transform: `rotate(-${i * 30}deg)`
            }

            if (i === 0 || i === 3 ||  i === 6 || i === 9) {
                specialDialStyle.marginTop = "10px"
                specialHourStyle.marginTop = "5px"
            }
            else {
                specialDialStyle.marginTop = "-10px";
                specialHourStyle.marginTop = "10px"  
            }

            // if (i === 1 || i=== 5) {
            //     specialHourStyle.marginLeft = "10px"

            // }


            let thisDial = 
            <div className={`${styles.dialHand}`} style={dialStyle} key={i}>
                <div className={styles.dial} style={specialDialStyle} key={i}>
                </div>
                <div className={styles.hourNumber} style={specialHourStyle} key={`${i}hour`}>{i !== 0? i: 12}</div>
            </div>
            myDials.push(thisDial)
        }
        return myDials;
    }

    const removeHandler = () => {
        console.log(myClock.current.classList)
        myClock.current.classList.add(styles.disappear)
        props.remove(props.name);
    }

        return (
        <div className = {styles.myClock} ref={myClock}>
            <div className={styles.clockFace}>
                {createDials()}
                <div ref={hourHandRef} className={`${styles.clockHand} ${styles.hourHand} ${animation}`}/>
                <div ref={minuteHandRef} className={`${styles.clockHand} ${styles.minuteHand} ${animation}`}/>
                <div ref={secondHandRef} className={`${styles.clockHand} ${styles.secondHand} ${animation}`}/>
                <div className={styles.clockLabel}>
                    <p className={styles.amOrPm}>{amHour ? "AM" : "PM"}</p>
                </div>
                <div className={styles.remove} onClick={removeHandler}><div>X</div></div>
                      
            </div>
            <p className = {styles.timeText}>{props.name}<br/>
            </p>
        </div>
    )
}

export default Clock

import React, {useRef} from 'react'
import styles from "./navbarStyles.module.css"

function Navbar(props) {

        const selectEl = useRef(null);

        const createOptions = () => {
            let options = [];
            if (props.countryData.length === 0) {
                return (<option value={"Loading data..."}>Loading data...</option>)
            }
            else {
                for (let i=0; i<props.countryData.length; i++) {
                    options.push(<option key={i}>{props.fixName(props.countryData[i])}</option>)
                }
            }
            return options;
    }

    const clickHandler = () => {
        props.addClock(props.fixName(selectEl.current.value));
    }

    const resetHandler = () => {
        props.reset()
    }

    return (
        <nav className={styles.main}>
            <select className={styles.select} ref={selectEl}>
                {createOptions()}
            </select>
            <button className = {styles.addButton} onClick={clickHandler}>+</button>
            <button onClick={resetHandler}>Reset</button>
        </nav>
    )
}

export default Navbar

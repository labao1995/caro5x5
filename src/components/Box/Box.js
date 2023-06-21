import './Box.scss'

const Box = ({ value, handleXO }) => {
    const style = value === "X" ? "box x" : "box o"

    return (
        <button className={style} onClick={() =>
            handleXO()
        }>{value}</button>
    )
}

export default Box
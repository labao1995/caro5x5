import './Board.scss'
import Box from '../Box/Box'

const Board = (props) => {
    const { board, handleXO } = props;
    return (
        <div className='board'>
            {
                board.map((item, index) => (
                    <Box key={index} value={item} handleXO={() =>
                        handleXO(index)


                    } />
                ))
            }
        </div>
    )
}

export default Board
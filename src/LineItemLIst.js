import {FaTrashAlt} from 'react-icons/fa'

const LineItemLIst = ({item, checkHandler, deleteHandler}) => {
  return (
    <li className='item' >
        <input
            type="checkbox"
            onChange={() => checkHandler(item.id)}
            checked={item.cheacked}
        />
        <label
            onDoubleClick={() => checkHandler(item.id)}
            style={(item.cheacked) ? {textDecoration: 'line-through'} : null}
        > 
            {item.item}
        </label>
        <FaTrashAlt 
            onClick={() => deleteHandler(item.id)}
            role="button"
            tabIndex="0"
            aria-label={`Delete ${item.item}`}
        />
    </li>
  )
}

export default LineItemLIst

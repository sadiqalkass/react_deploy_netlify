import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const AddItem = ({newItem, setNewItem, submitHandler}) => {
  const inputRef = useRef();
  return (
    <form className='addForm' onSubmit={submitHandler}>
      <label htmlFor='add'>Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id='additem'
        type='text'
        placeholder='Add Item'
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        required
        />
        <button
            type='submit'
            aria-label='Add Item'
            onClick={() => inputRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem

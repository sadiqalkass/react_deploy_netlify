import React from 'react'
import LineItemLIst from './LineItemLIst'

const ItemList = ({items, checkHandler, deleteHandler}) => {
  return (
    <ul>
        {items.map(item => (
            <LineItemLIst
                key={item.id}
                item={item}
                checkHandler={checkHandler}
                deleteHandler={deleteHandler} />
        ))}
    </ul>
  )
}

export default ItemList

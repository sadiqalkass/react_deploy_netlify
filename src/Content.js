import ItemList from './ItemList'

const Content = ({items, checkHandler, deleteHandler}) => {
    return (
        <>
            {items.length ? (
               <ItemList 
                    items={items}
                    checkHandler={checkHandler}
                    deleteHandler={deleteHandler} />
            ) : (
                <p style={{marginTop: '2rem'}}>Your list is empty</p>
            )}
        </>
    )
}

export default Content

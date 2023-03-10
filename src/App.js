import React from 'react'; 
import SearchItem from './SearchItem';
import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import {useState, useEffect} from 'react'
import apiRequest from './apiRequest';

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchErr, setFetchErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not recive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchErr(null);
      }
      catch(err) {
        setFetchErr(err.message)
      }
      finally{
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItem())();
    }, 1500);
  
  }, []);
  

  const addItem =  async (item) => {
    const id = items.length ? items[items.length -1].id + 1 : 1;
    const myNewItem = { id, cheacked:false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchErr(result);
  };

  const checkHandler =  async (id) => {
    const listItems = items.map( (item) => item.id === id ? {...item, cheacked: !item.cheacked} : item);
    setItems(listItems);
    const myItem = listItems.filter((item) => item.id === id);
    const updateOption = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cheacked: myItem[0].cheacked})
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOption);
    if(result) setFetchErr(result);
    }

  const deleteHandler = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);

    const deleteOption = {method : "Delete"};
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOption);
    if(result) setFetchErr(result);

  };

 const submitHandler = (e) => {
  e.preventDefault();
  if(!newItem) return;
  console.log(newItem);
  addItem(newItem)
  setNewItem('')
 };
  return (
    <div className="App">
      <Header title={"Cheack list"}/>
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        submitHandler={submitHandler}
      />
       <SearchItem 
        search={search}
        setSearch={setSearch}
        />
      <main>
      {isLoading && <p>Loading Items...</p>}
        {fetchErr && <p style={{ color: "red" }}>{`Error: ${fetchErr}`}</p>}
        {!fetchErr && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          checkHandler={checkHandler}
          deleteHandler={deleteHandler}
        />}
      </main>
      <Footer 
        lenght={items.length}/>
    </div>
  );

}
export default App;
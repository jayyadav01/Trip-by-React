import { useRef, useState } from "react";
import "./Trip.css";
import { SimCardAlert } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true }
];

export default function App() {
  let [desc, setDesc] = useState("");
  let [select,setSelect] = useState('');
  let [finalItems,setfinalItems] = useState([... initialItems]);
  
  function handleDelete(e,id)
  {
    console.log(finalItems);
    setfinalItems(finalItems.filter(item => {
      return item.id !== id;
    }))
  }
  function handlePacked()
  {
  }
  
  return (
    <div className="App">
      <Header />
      <Form 
        desc = {desc}
        setDesc = {setDesc}
        select = {select}
        setSelect = {setSelect}
        finalItems = {finalItems}
        setfinalItems = {setfinalItems}
        />
      <PackingList 
        finalItems = {finalItems}
        handleDelete = {handleDelete}
        handlePacked = {handlePacked}
        />
      <Stats finalItems = {finalItems}/>
    </div>
  );
}


function Header() {
  return <h1> 🏝 Far Away 🧳 </h1>;
}

function Form({finalItems,setfinalItems,select,setSelect,desc,setDesc}) {
  let inputref = useRef(null);
  
  function handleSubmit(e)
  {
    e.preventDefault();
    let item = {};
    item.id = finalItems.length + 1;
    item.description = desc;
    item.quantity = select;
    item.packed = false;
    
    setfinalItems([...finalItems,item]);
    
    setSelect('1');
    setDesc('');
    inputref.current.focus();
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        {Array.from({ length: 20 }, (val, idx) => idx + 1).map((val, idx) => {
          return (
            <option key={idx} value={val}>
              {val}
            </option>
          );
        })}
      </select>

      <input
        ref={inputref}
        placeholder="item..."
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
        ></input>
      <button>ADD</button>

    </form>
  );
}

function PackingList({finalItems,handleDelete,handlePacked}) {
  return (
    <div className="list">
      <ul>
        {finalItems.map((eItem,index) => {
          return<Item key={index} item={eItem} handleDelete={handleDelete}/>;
        })}
      </ul>
    </div>
  );
}

function Stats({finalItems}) {
  let [packItems,setpackItems] = useState([initialItems[1]]);
  return (
    <footer className="stats">
      <em>💼 You have {finalItems.length} items on your list, and you already packed {packItems.length} (X%)</em>
    </footer>
  );
}

function Item({ item,handleDelete,handlePacked }) {
  let [packItems,setpackItems] = useState([initialItems[1]]);
  function handlePacked()
  {
    let pack = item;
    pack.packed = true;
    setpackItems([...packItems,pack])
    console.log(pack);
    console.log(packItems);

    
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
    
  }
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={(e) => handleDelete(e,item.id)}> ❌ </button>
      <button onClick={() => handlePacked()}> ✅ </button>  
    </li>
  );
}



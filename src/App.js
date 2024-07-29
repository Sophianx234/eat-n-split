import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends,setfriends] = useState(initialFriends)

  const [selected, setSelected] = useState(null);
  
  function handleSelection(friend){
    setSelected(friend)
    console.log(selected)

  }

  
  return (
    <div className="container">
      <FriendsList Friends={friends} handleSelection={handleSelection} selected={selected} setfriends={setfriends} />
     { selected && <FormBilling selected={selected} setSelected={setSelected} setfriends={setfriends} />}
    </div>
  );
}

function FriendsList({ Friends , handleSelection, setfriends, selected}) {
  const [addFriend, setAddFriend] = useState(null);
  const [name,setName] = useState('')
  const [image,setImage] = useState('')
  function onSubmit(e){
    e.preventDefault();
    if(!name) return ;
    if(!image) return;
    const newFriend = {
      name, image: `https://i.pravatar.cc/48?u=${image}`, id: crypto.randomUUID(),
      balance: 0,
      
      

    }
    setfriends(friends=>[...friends, newFriend])
    
    
  }
  

  return (
    <div className="friends-container">
      <ul className="friends-list">
        {Friends.map((friend) => (
          <Friend friend={friend} key={friend.id} handleSelection={handleSelection} selected={selected} />
        ))}
      </ul>
      <FormAddFriend  handleSubmit={onSubmit} setName={setName} setImage={setImage} name={name} image={image} />
      <button className="btn btn-add">Add friend</button>
    </div>
  );
}

function Friend({ friend, handleSelection, selected }) {
  return (
    <li className={`friend-item grid ${selected?.name === friend.name ? "active": null}`}>
      <img src={friend.image} alt={friend.name} className="friend-img" />
      <div className="friend-info-box">
        <p className="name">{friend.name}</p>
        <p className={friend.balance<0 ? 'red': friend.balance>0? 'green': ''}>
           {friend.balance>0? `${friend.name} owes you ${friend.balance}`: friend.balance<0? `You owe ${friend.name} ${Math.abs(friend.balance)}€`: `You and ${friend.name} are even`}
        </p>
      </div>
      <button className="btn" onClick={()=>handleSelection(friend)}>Select</button>
    </li>
  );
}

function FormBilling({selected, setSelected, setfriends}){
  const [bill, setBill] = useState('')
  const [expense, setExpense] = useState('');
  const [whoIsPaying, setWhoIsPaying] = useState('you');
    function handleSplit(e){
      e.preventDefault();
      setfriends(friends=>friends.map(friend=>selected.id === friend.id? {...friend, balance: whoIsPaying ==='you'? selected.balance+expense: selected.balance-expense}: friend))

    }
  return (
    <form className="form">
      <h1 className="form-heading">Split A Bill with {selected.name}</h1>
      <div className="inputs">
      <label >
        <p className="form-text">💰  Bill value</p>
        <input type="text" value={bill} onChange={e=>setBill(bill=>+e.target.value)}  />
      </label>
      <label >
        <p className="form-text">🧍‍♂️Your expense</p>
        <input type="text" value={expense} onChange={e=>setExpense(expense=>+e.target.value)} />
      </label>
      <label >
        <p className="form-text" >🧑‍🤝‍🧑 {selected.name}'s expense</p>
        <input type="text" disabled   className="disabled" value={bill>expense && expense>0? bill-expense: null}/>
      </label>
      <label >
        <p className="form-text">🤑 Who is paying the bill</p>
        <select  value={whoIsPaying} onChange={e=>setWhoIsPaying(whoIsPaying=>e.target.value)}>
          <option value="you">You</option>
          <option value={selected.name}>{selected.name}</option>
        </select>
      </label>

    <button className="btn btn-split" onClick={handleSplit}>Split bill</button>
      
      </div>

    </form>
  )
}

function FormAddFriend({handleSubmit,setImage,setName, name,image}){
  
  return (
    <form className="add-form" onSubmit={handleSubmit} >
      <label >
        <p className="form-text">🧑‍🤝‍🧑 Friend name</p>
        <input type="text" value={name} onChange={e=>setName(name=>e.target.value)}  />
      </label>
      <label >
        <p className="form-text">🌌image URL</p>
        <input type="text"  value={image} onChange={e=>setImage(image=>e.target.value)} />
      </label>
      <button className="btn btn-add-form">Add</button>

    </form>
  )
}
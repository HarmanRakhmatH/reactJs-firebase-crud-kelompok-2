import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { async } from '@firebase/util';


function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [newScore, setNewScore] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge), address: newAddress, score: newScore });
  };

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id)
    // const { id, age, address } = newFields
    // newFields = { age: age + 1 } // kal opakai ini harus di kasi parameter di async nya
    const newFields = { score: newScore }

    // const newFieldsAge = (usersCollectionRef, { age: newAge })

    const newFieldsSetAge = { age: Number(newAge) }
    const newSetFieldsAddress = { address: newAddress }
    // const newFieldsAddress = { score: score + addDoc(usersCollectionRef, { score: newScore }) }
    await updateDoc(userDoc, newFields)
    await updateDoc(userDoc, newSetFieldsAddress)
    await updateDoc(userDoc, newFieldsSetAge)
    // await updateDocAddress(userDoc, newSetFieldsAddress)
    // await addDoc(usersCollectionRef, { name: newName, age: newAge, address: newAddress, score: newScore });


  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)

  }
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      // console.log(data);
    }

    getUsers()
  }, []);

  return (
    <div className="App">
      <input
        placeholder='Name...'
        onChange={(event) => {
          setNewName(event.target.value)
        }}
      />
      <input
        placeholder='Age...'
        type="number"
        onChange={(event) => {
          setNewAge(event.target.value)
        }}
      />
      <input
        placeholder='address...'
        onChange={(event) => {
          setNewAddress(event.target.value)
        }}
      />
      <input
        placeholder='score...'
        onChange={(event) => {
          setNewScore(event.target.value)
        }}
      />
      <button onClick={createUser}> Create User</button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name:{user.name}</h1>
            <h1>Age:{user.age}</h1>
            <h1>Address:{user.address}</h1>
            <h1>Score:{user.score}</h1>
            <button onClick={() => {
              updateUser(user.id, user.score, user.address, user.age);
            }}
            >
              {" "}
              update User
            </button>
            <button
              onClick={() => {
                deleteUser(user.id)
              }}
            >
              {" "}
              Delete User
            </button>
            <input
              placeholder='score...'
              onChange={(event) => {
                setNewScore(event.target.value)
              }}
            />
            <input
              placeholder='address...'
              onChange={(event) => {
                setNewAddress(event.target.value)
              }}
            />
            <input
              placeholder='age...'
              type="number"
              onChange={(event) => {
                setNewAge(event.target.value)
              }}
            />
          </div>
        );
      })}
    </div >
  );
}

export default App;

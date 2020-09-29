import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState();
  console.log('🔫')

  useEffect(() =>{
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    })
  }, [input]);
  
  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    console.log('I am Working')
    setTodos([...todos, input])
    setInput('')
  }

  return (
    <div className="App">
      <h1>🔥 Todo App 🔥</h1>
      <form>
          <FormControl>
            <InputLabel>✅ Write a todo</InputLabel>  
            <Input  type="text" value={input} onChange={event => setInput(event.target.value)}/>
          </FormControl>
        <Button type="submit"  onClick={addTodo} disabled={!input} variant="contained" color="primary">
          Add Todo
        </Button>

        <ul className="todo__list">
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} />
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;

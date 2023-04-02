import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import './App.css';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
  input: {
    marginTop: '30px',
    outline: 'none',
  },
  button: {
    marginTop: '30px',
    width: '80px',
    height: '40px',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: 'yellow',
  },
  increment: {
    backgroundColor: 'green',
  },
  decrement: {
    backgroundColor: 'red',
  }
}

const counterReducer = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      state.value++;
    },
    decrement: state => {
      state.value--;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  }
});


const store = configureStore({
  reducer: {
    counter: counterReducer.reducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Counter />
  </Provider>
);



function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(2);
  const { increment, decrement, incrementByAmount } = counterReducer.actions;

  const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
    }, 2000);
  }

  return (
    <div style={styles.container}>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())} style={{ ...styles.button, ...styles.increment }}>Increment</button>
      <button onClick={() => dispatch(decrement())} style={{ ...styles.button, ...styles.decrement }}>Decrement</button>
      <input
        value={amount}
        styles={{ ...styles.input }}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={() => dispatch(incrementByAmount(Number(amount) || 0))}
        styles={{ ...styles.button, backgroundColor: 'yellow' }}
      >Add amount</button>
      <button styles={{ ...styles.button }} onClick={() => dispatch(incrementAsync(Number(amount) || 0))} />
    </div>
  );
}


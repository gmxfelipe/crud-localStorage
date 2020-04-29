import React, { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4';

const initialExpenses = [
  {id: uuid(), charge: "renda", amount: 1600 },
  {id: uuid(), charge: "forma de pagamento", amount: 400 },
  {id: uuid(), charge: "fatura do cartão de crédito", amount: 1200 }
];




function App() {
  const result = useState(initialExpenses);
  const expenses = result[0];
  const setExpenses = result[1];
  console.log(expenses, setExpenses);
  
  
  return (
    <div>
      <Alert />
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}

export default App;

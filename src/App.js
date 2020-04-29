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
  // ---------------- valores do state -------------------
  // todas as despesas, adicione despesa
  const [ expenses, setExpenses ] = useState(initialExpenses);  
  // única despesa 
  const [ charge, setCharge ] = useState('');
   // única valor 
   const [ amount, setAmount ] = useState('');
  // ----------------- funcionalidade com handle ---------------------
  const handleCharge = e => {
    console.log(`charge : ${e.target.value}`);
    
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    console.log(`amount :  ${e.target.value}`);

    setAmount(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div>
      <Alert />
      <h1>Calculadora de orçamento</h1>
      <main className="App">

      <ExpenseForm 
      charge={charge} 
      amount={amount} 
      handleAmount={handleAmount}
      handleCharge={handleCharge}
      handleSubmit={handleSubmit}
      />
      <ExpenseList expenses={expenses} />
      </main>

      <h1> 
        total gasto : <span className="total"> 
          R$ {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
      </span>
      </h1>

    </div>
  );
}

export default App;

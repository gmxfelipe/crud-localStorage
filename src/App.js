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
   // Alert
   const [alert, setAlert] = useState({ show: false })
  // ----------------- funcionalidade com handle ---------------------
  const handleCharge = e => {
    
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    // console.log(`amount :  ${e.target.value}`);

    setAmount(e.target.value)
  }

  // Função de Alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }

  // Método post do crud e funções de alert ao inserir dado
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0){
      const singleExpense = {id: uuid(), charge, amount};
      setExpenses([ ...expenses, singleExpense ]);
      handleAlert({ type: "success", text: "Item adicionado com sucesso." })
      setCharge('');
      setAmount('');
    } else {
      // lidar com alerta chamado
      handleAlert({ type: 'danger', text: `Ensira algum dado nos campos para adicionar a lista.` })
    }
    
  }

  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
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
            return (acc += parseInt(curr.amount));
          }, 0)}
      </span>
      </h1>

    </div>
  );
}

export default App;

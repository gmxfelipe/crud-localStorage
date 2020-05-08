import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4';

// const initialExpenses = [
//   {id: uuid(), charge: "renda", amount: 1600 },
//   {id: uuid(), charge: "forma de pagamento", amount: 400 },
//   {id: uuid(), charge: "fatura do cartão de crédito", amount: 1200 }
// ];

// -----------------------------------------------------
// useEffect let's perform side effects 
// runs after every render
// first paramater - callback function (runs after render)
// second paramater - array - for letting react know when to run useEffect 
// react re-renders when state has changed or props 
// -----------------------------------------------------


const initialExpenses = localStorage.getItem('expenses') 
? JSON.parse(localStorage.getItem("expenses"))
: [];


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
   // PUT (editar)
   const [edit, setEdit] = useState(false)
   // Editar item da lista 
   const [id, setId] = useState(0); 
  // ----------------- funcionalidade com useEffect  ---------------------
  useEffect(() => {
    console.log('');
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses]);
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

  // Método POST do crud e funções de alert ao inserir dado
  const handleSubmit = e => {
    e.preventDefault();
    if(charge !== '' && amount > 0){

      if(edit){
        let tempExpenses = expenses.map( item => {
          return item.id === id ?{...item, charge, amount} : item 
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "Item editado com sucesso." })

      } else {
        const singleExpense = {id: uuid(), charge, amount};
        setExpenses([ ...expenses, singleExpense ]);
        handleAlert({ type: "success", text: "Item adicionado com sucesso." })
      }
      setCharge('');
      setAmount('');
    } else {
      // lidar com alerta chamado
      handleAlert({ type: 'danger', text: `Ensira algum dado nos campos para adicionar a lista.` })
    } 
  }

  // Limpar todos os items 
  const clearItems = () => {
    setExpenses([]);
  };

  // Função de DELETE do crud 
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: 'Item deletado com sucesso' })
  }

  // Função de PUT do crud 
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id)
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id)
  }

  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Tabela de orçamento</h1>
      <main className="App">

      <ExpenseForm 
      charge={charge} 
      amount={amount} 
      handleAmount={handleAmount}
      handleCharge={handleCharge}
      handleSubmit={handleSubmit}
      edit={edit}
      />
      <ExpenseList 
      expenses={expenses} 
      handleDelete={handleDelete} 
      handleEdit={handleEdit}
      clearItems={clearItems}
      />
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

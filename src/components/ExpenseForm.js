import React from 'react';
import { MdSend } from 'react-icons/md';

const ExpenseForm = ({ charge, amount, handleCharge, handleAmount, handleSubmit }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-center">
                    <div className="form-group">
                        <label htmlFor="charge"> Produto </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="charge" 
                        name="charge" 
                        placeholder="ex: areia"
                        value={charge}
                        onChange={handleCharge}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount"> Valor </label>
                        <input 
                        type="number" 
                        className="form-control" 
                        id="amount" 
                        name="amount" 
                        placeholder="ex: R$ 100,00"
                        value={amount}
                        onChange={handleAmount}

                        />
                    </div>
                </div>
                <button type="submit" className="btn">
                    Enviar
                    <MdSend className="btn-icon" />
                </button>
            </form>
        </div>
    )
}

export default ExpenseForm;
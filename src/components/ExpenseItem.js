import React from 'react'
import { MdEdit, MdDelete } from 'react-icons/md';


const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
const {id, charge, amount} = expense
    return (
        <div>
            <li className="item">
                <div className="info">
                    <span className="expense">{charge}</span>
                    <span className="amount">R${amount}</span>
                </div>
                <div>
                    {/* Button PUT */}
                    <button className="edit-btn" aria-label="edit button" onClick={ () => handleEdit(id)}> 
                    <MdEdit />
                    </button>
                    
                    {/* Button DELETE */}
                    <button className="clear-btn" aria-label="delete button" onClick={ () => handleDelete(id)} > 
                    <MdDelete />
                    </button>
                </div>
            </li> 
        </div>
    )
}

export default ExpenseItem;

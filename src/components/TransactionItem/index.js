// Write your code here
import './index.css'

const TransactionItem = props => {
  const {item, del} = props
  console.log(props)
  const {id, title, amount, type} = item

  const onDel = () => {
    let a
    if (type === 'INCOME') {
      a = 0 - amount
    } else {
      a = amount
    }

    del(id, a)
  }

  return (
    <li>
      <hr className="line" />
      <div className="transaction-item">
        <p>{title}</p>
        <p>Rs {amount}</p>
        <p>{type}</p>
        <button
          data-testid="delete"
          type="button"
          className="delete-btn"
          onClick={onDel}
        >
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem

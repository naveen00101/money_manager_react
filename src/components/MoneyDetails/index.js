// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props

  return (
    <div className="money-item-sec">
      <div className="bal sec">
        <div className="img-sec">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
          />
        </div>
        <div className="info">
          <p className="info-1">Your Balance</p>
          <p data-testid="balanceAmount" className="info-2">
            Rs {balance}
          </p>
        </div>
      </div>

      <div className="income sec">
        <div className="img-sec">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="balance"
          />
        </div>
        <div className="info">
          <p className="info-1">Your Income</p>
          <p data-testid="incomeAmount" className="info-2">
            Rs {income}
          </p>
        </div>
      </div>

      <div className="expenses sec">
        <div className="img-sec">
          <img
            className="icon"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="balance"
          />
        </div>
        <div className="info">
          <p className="info-1">Your Expenses</p>
          <p data-testid="expensesAmount" className="info-2">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails

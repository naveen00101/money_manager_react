import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    type: transactionTypeOptions[0].optionId,
    history: [],
  }

  onDelete = id => {
    const {history} = this.state
    const filteredHistory = history.filter(eachItem => id !== eachItem.id)

    this.setState({
      history: filteredHistory,
    })
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTypeInput = event => {
    this.setState({type: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, type} = this.state

    const historyItem = {
      id: v4(),
      title: titleInput,
      amount: Number(amountInput),
      type,
    }

    this.setState(prevState => {
      const {history} = prevState
      return {
        history: [...history, historyItem],
        titleInput: '',
        amountInput: '',
        type: '',
      }
    })
  }

  getExpenses = () => {
    const {history} = this.state
    let expenses = 0
    history.forEach(eachItem => {
      if (eachItem.type === 'EXPENSES') {
        expenses += eachItem.amount
      }
    })
    // console.log(`expenses ${expenses}`)
    return expenses
  }

  getIncome = () => {
    const {history} = this.state
    let income = 0
    history.forEach(eachItem => {
      if (eachItem.type === 'INCOME') {
        income += eachItem.amount
      }
    })
    // console.log(`income ${income}`)
    return income
  }

  getBalance = () => {
    const {history} = this.state
    let balance = 0
    let income = 0
    let expenses = 0
    history.forEach(eachItem => {
      if (eachItem.type === 'INCOME') {
        income += eachItem.amount
      } else {
        expenses += eachItem.amount
      }
    })

    balance = income - expenses

    console.log('------------------------------------------------------------')
    console.log(`expenses ${expenses}`)
    console.log(`income ${income}`)
    console.log(`balance ${balance}`)
    console.log('------------------------------------------------------------')

    return balance
  }

  render() {
    const {history, titleInput, amountInput, type} = this.state

    const income = this.getIncome()
    const expenses = this.getExpenses()
    const balance = this.getBalance()

    return (
      <div className="bg-container">
        <div className="welcome-box">
          <h1 className="greeting">Hi, Richard</h1>
          <p className="welcome">
            Welcome back to your
            <span className="highlight">Money Manager</span>
          </p>
        </div>

        <div className="money-details">
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
        </div>

        <div className="transaction-sec">
          <div className="add box">
            <form className="add-box" onSubmit={this.onAddTransaction}>
              <h1 className="h2">Add Transaction</h1>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                placeholder="TITLE"
                value={titleInput}
                id="title"
                onChange={this.onChangeTitleInput}
              />

              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                placeholder="AMOUNT"
                value={amountInput}
                id="amount"
                onChange={this.onChangeAmountInput}
              />

              <label className="label" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className="type-options"
                onChange={this.onChangeTypeInput}
                value={type}
              >
                {transactionTypeOptions.map(eachItem => (
                  <option value={eachItem.optionId} key={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>

          <div className="history box">
            <h1 className="h2">History</h1>
            <ul className="his">
              <li className="headings">
                <p className="h">Title</p>
                <p className="h">Amount</p>
                <p className="h">Type</p>
              </li>

              {history.map(eachItem => (
                <TransactionItem
                  item={eachItem}
                  del={this.onDelete}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

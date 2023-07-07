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
    type: 'INCOME',
    history: [],
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onDelete = id => {
    let a
    let t
    this.setState(prevState => ({
      history: prevState.history.filter(eachItem => {
        if (eachItem.id !== id) {
          return true
        }
        a = eachItem.amount
        t = eachItem.type
        return false
      }),
    }))

    if (t === 'INCOME') {
      this.setState(prevState => ({
        balance: prevState.balance - a,
        income: prevState.income - a,
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance + a,
        expenses: prevState.expenses - a,
      }))
    }
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
      amount: amountInput,
      type,
    }
    const a = Number(amountInput)
    console.log(typeof a)

    if (type === 'INCOME') {
      this.setState(prevState => ({
        balance: prevState.balance + a,
        income: prevState.income + a,
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance - a,
        expenses: prevState.expenses + a,
      }))
    }

    this.setState(prevState => {
      const {history} = prevState
      return {history: [...history, historyItem]}
    })
  }

  render() {
    const {history, balance, income, expenses} = this.state
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
            <h1 className="h2">Add Transaction</h1>
            <form className="add-box" onSubmit={this.onAddTransaction}>
              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                placeholder="TITLE"
                name="title"
                id="title"
                onChange={this.onChangeTitleInput}
              />

              <label className="label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                placeholder="AMOUNT"
                name="amount"
                id="amount"
                onChange={this.onChangeAmountInput}
              />

              <label className="label" htmlFor="title">
                TYPE
              </label>
              <select
                className="type-options"
                onChange={this.onChangeTypeInput}
              >
                {transactionTypeOptions.map(eachItem => {
                  if (eachItem.optionId === 'INCOME') {
                    return (
                      <option value={eachItem.optionId} selected>
                        {eachItem.displayText}
                      </option>
                    )
                  }
                  return (
                    <option value={eachItem.optionId}>
                      {eachItem.displayText}
                    </option>
                  )
                })}
              </select>

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>

          <div className="history box">
            <h1 className="h2">History</h1>
            <div className="his">
              <div className="headings">
                <p className="h">Title</p>
                <p className="h">Amount</p>
                <p className="h">Type</p>
              </div>
              <ul>
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
      </div>
    )
  }
}

export default MoneyManager

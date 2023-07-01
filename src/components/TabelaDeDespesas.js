import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions/index';

class TabelaDeDespesas extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleDelete = ({ target }) => {
    const { dispatch, expenses } = this.props;
    const id = Number(target.id);
    dispatch(deleteExpense(id, expenses));
  }

  convertExpenses() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const { exchangeRates } = expenses[0];
      return expenses.reduce((acc, { value, currency }) => {
        const actualCurrency = Object.entries(exchangeRates)
          .find((item) => item[1].code === currency);
        const actualValue = actualCurrency[1].ask * value;
        acc += actualValue;
        return acc;
      }, 0);
    }
  }

  render() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      console.log(expenses[0].exchangeRates[expenses[0].currency].ask);
    }
    return (
      <table>
        <tbody>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>{(expense.exchangeRates[expense.currency].name).split('/')[0]}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {Number(expense.exchangeRates[expense.currency].ask * expense.value)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  id={ expense.id }
                  onClick={ this.handleDelete }
                  data-testid="delete-btn"
                  type="button"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

TabelaDeDespesas.propTypes = {
  dispatch: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(TabelaDeDespesas);

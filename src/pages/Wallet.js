import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, dispatchWalletInfo } from '../actions';
import Header from '../components/Header';
import TabelaDeDespesas from '../components/TabelaDeDespesas';

const metodoDePagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

const categoriaDeDespesa = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const {
      id, value, currency, method, tag, description,
    } = this.state;
    const walletInfo = { id, value, currency, method, tag, description };
    dispatch(dispatchWalletInfo(walletInfo));
    console.log(dispatchWalletInfo);
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
    }));
  };

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  generateSelect(id, label, array) {
    return (
      <label htmlFor={ id }>
        {label}
        <select id={ id } onChange={ this.handleChange }>
          { array.length > 0 && array.map((info) => (
            <option
              id={ id }
              key={ info }
              value={ info }
            >
              {info}

            </option>)) }
        </select>
      </label>
    );
  }

  render() {
    const { description, value } = this.state;
    const { moedas } = this.props;
    return (
      <form>
        TrybeWallet
        <br />
        <Header />
        <div>
          <label htmlFor="minhaDespesa">
            Valor
            <input
              value={ value }
              type="text"
              id="minhaDespesa"
              data-testid="value-input"
              name="value"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="minhaMoeda">
            Moeda
            <select
              id="minhaMoeda"
              name="currency"
              onChange={ this.handleChange }
            >
              { moedas.map((currencies, index) => (
                <option key={ index }>{currencies}</option>
              ))}
            </select>
          </label>
          <label htmlFor="meuPagamento">
            Método de Pagamento
            <select
              id="meuPagamento"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              { metodoDePagamento.map((methods, index) => (
                <option key={ index }>{methods}</option>
              )) }
            </select>
          </label>
          <label htmlFor="minhaCategoria">
            Categoria
            <select
              onChange={ this.handleChange }
              data-testid="tag-input"
              id="minhaCategoria"
              name="tag"
            >
              { categoriaDeDespesa.map((categories, index) => (
                <option key={ index }>{categories}</option>
              )) }
            </select>
          </label>
          <label htmlFor="minhaDescricao">
            Descrição
            <input
              value={ description }
              type="text"
              id="minhaDescricao"
              data-testid="description-input"
              name="description"
              onChange={ this.handleChange }
            />
          </label>
          <button
            onClick={ this.handleSubmit }
            type="button"
          >
            Adicionar Despesa
          </button>
        </div>
        <TabelaDeDespesas />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
  expenses: state.wallet.expenses,
  conversao: state.wallet.conversao,
});

Wallet.propTypes = {
  moedas: propTypes.func.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);

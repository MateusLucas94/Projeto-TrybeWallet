import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.somaDeDespesas = this.somaDeDespesas.bind(this);
    this.state = {
      email: '',
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      email: user.email,
    });
  }

  somaDeDespesas() {
    const { expenses } = this.props;
    console.log(expenses);
    if (expenses && expenses.length > 0) {
      const { exchangeRates } = expenses[0];
      const filtarDataSemUSDT = Object
        .values(exchangeRates).filter((moeda) => moeda.codein !== 'BRLT');
      const listaDeConversao = filtarDataSemUSDT.map(({ code, ask }) => ({
        code,
        ask,
      }));
      return expenses.reduce((acc, { value, currency }) => {
        const conversao = listaDeConversao.filter((item) => item.code === currency);
        const actualValue = conversao[0].ask * value;

        acc += actualValue;
        return acc;
      }, 0);
    }
  }

  render() {
    const { email } = this.state;
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <th>
            <h4
              data-testid="email-field"
            >
              { email }
            </h4>
          </th>
          <th><h4>R$</h4></th>
          <th>
            <h4
              data-testid="total-field"
            >
              {`${expenses.length > 0 ? this.somaDeDespesas().toFixed(2) : 0}`}
            </h4>
          </th>
          <th>
            <h4
              data-testid="header-currency-field"
            >
              BRL
            </h4>
          </th>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
  expenses: state.wallet.expenses,

});

Header.propTypes = PropTypes.objectOf(PropTypes.any).isRequired;

export default connect(mapStateToProps)(Header);

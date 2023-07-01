import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserInfo } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      senha: '',
    };
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { email } = this.state;
    const { setUserInfo, history } = this.props;
    setUserInfo(email);
    history.push('/carteira');
  }

  render() {
    const { email, senha } = this.state;
    const seis = 6;
    return (
      <form>
        Login
        <br />
        <input
          placeholder="Email"
          name="email"
          onChange={ this.handleChange }
          value={ email }
          type="text"
          data-testid="email-input"
        />
        <br />
        <input
          placeholder="Senha"
          name="senha"
          onChange={ this.handleChange }
          value={ senha }
          type="password"
          data-testid="password-input"
        />
        <br />
        <button
          onClick={ this.handleSubmit }
          disabled={
            !(senha.length >= seis && email.includes('@') && email.includes('.com'))
          }
          type="button"
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (store) => dispatch(getUserInfo(store)),
});

Login.propTypes = {
  setUserInfo: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

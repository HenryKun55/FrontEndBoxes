import React, { Component } from 'react';

import './styles.css';
import logo from '../../assets/logo.png'

import api from '../../services/api'

export default class Main extends Component {

  state = {
    box: '',
    error: ''
  }

  handleSubmit = async e => {
    e.preventDefault()

    const { box } = this.state

    if(box.length > 3){
      try{
        const response = await api.post('box', {
          title: this.state.box
        })

        this.props.history.push(`/box/${response.data._id}`)
      }catch(err){
        this.setState({ error: 'Houve um erro, tente novamente.'})
      }
    }else{
      this.setState({ error: 'A box precisa de ter mais de 3 caracteres.'})
    }

  }

  render() {
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img alt="logo" src={logo}></img>
                {this.state.error && (<p>{this.state.error}</p>)}
                <input 
                  placeholder="Criar um box"
                  value={this.state.box} 
                  onChange={e => this.setState({ box: e.target.value })}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    )
  }
}

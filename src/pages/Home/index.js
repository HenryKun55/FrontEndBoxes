import React, { Component } from 'react';

import {MdInsertDriveFile} from 'react-icons/md'
import { withStyles } from '@material-ui/core/styles';
import { distanceInWords } from 'date-fns'

import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone'
import socket from 'socket.io-client'

import pt from 'date-fns/locale/pt'

import './styles.css';
import logo from '../../assets/logo.png'

import api from '../../services/api'

export default class Home extends Component {

  state = {
    box: {}
  }

  async componentDidMount(){
    this.newFiles()

    const boxId = this.props.match.params.id
    const response = await api.get(`box/${boxId}`)

    this.setState({ box: response.data})
  }

  newFiles = () => {
    const boxId = this.props.match.params.id
    const io = socket(api.defaults.baseURL)

    io.emit('connectRoom', boxId)

    io.on('file', file => {
      this.setState({ 
        box: {
           ...this.state.box , 
           files: [
             file, 
             ...this.state.box.files
            ]
          } 
        })
    })
  }

  handleUpload = (files) => {
    files.forEach(file => {
      const data = new FormData()
      const boxId = this.props.match.params.id

      data.append("file", file)

      api.post(`box/${boxId}/file`, data)
    })
  }

  render() {
    return (
        <div id="box-container">
            <header>
              <img alt="" src={logo}></img>
              <h1>{this.state.box.title ? this.state.box.title : (<StyledProgress/>)}</h1>
            </header>

            <Dropzone onDropAccepted={this.handleUpload}>{
                ({getRootProps, getInputProps}) => (
                  <div className="upload" {... getRootProps()}>
                    <input {... getInputProps()}/>

                    <p>Arraste ou clique para adicionar um arquivo</p>
                  </div>
                )
            }</Dropzone>

            <ul>
              {this.state.box.files && this.state.box.files.map( file => (
                <li key={file._id}> 
                <a className="fileInfo" href={file.url} target="_blank" rel="noopener noreferrer">
                  <MdInsertDriveFile size={24} color="rgb(187, 90, 90)"/>
                  <strong>{file.title}</strong>
                </a>
                <span> há {" "}
                {distanceInWords(file.createdAt, new Date(), {
                  locale: pt
                })}</span>
              </li>
              )) }
            </ul>
        </div>
    )
  }
}

const StyledProgress = withStyles({
  root: {
    color: 'rgb(187, 90, 90)',
  }
})(CircularProgress);

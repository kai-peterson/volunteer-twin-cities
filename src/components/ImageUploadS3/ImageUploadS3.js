import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button } from '@material-ui/core';

import './ImageUploadS3.css'

class ImageUploadS3 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: "",
      error: false,
      errorMessage: ""
    }
  }
  handleChange = (ev) => {
    this.setState({ success: false, url: "" });
  }
  handleDifferentUpload = () => {
    this.setState({success: false, error: false})
  }
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];

    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    console.log("Filename=", fileName);
    console.log("Filetype=", fileType);
    axios.post('/s3Controller', {
      fileName: fileName,
      fileType: fileType
    })
      .then(response => {
        const returnData = response.data.data.returnData;
        const signedRequest = returnData.signedRequest;
        const url = returnData.url;
        this.setState({ url: url })
        console.log("Recieved a signed request ", signedRequest);
        console.log('returnData for axios.post to /sign_s3:', returnData);
        const options = {
          headers: {
            'Content-Type': fileType,
            'Access-Control-Allow-Origin': true,
          }
        };
        console.log("About to axios.put, signedRequest=", signedRequest);
        console.log("About to axios.put, file=", file);
        console.log("About to axios.put, options=", options);
        axios.put(signedRequest, file, options)
          .then(result => {
            console.log("Response from s3", result)
            this.setState({ success: true });
            this.props.handleImageChange(url)
          })
          .catch(error => {
            console.log("Received error on axios.put, ", JSON.stringify(error));
            alert("ERROR ", JSON.stringify(error));
          })
      })
      .catch(error => {
        alert(JSON.stringify(error));
      })
  }
  render() {
    const SuccessMessage = () => (
      <div className="image-upload-container">
        <h3 style={{color: 'green', marginBottom: '0px'}}>SUCCESSFUL UPLOAD</h3>
        {/* <a href={this.state.url}>Access the file here</a> */}
        <br/>
        <Button onClick={this.handleDifferentUpload} variant="contained">Upload new image</Button>
      </div>
    )
    const ErrorMessage = () => (
      <div className="image-upload-container">
        <h3 style={{color: 'red', marginBottom: '0px'}}>FAILED UPLOAD</h3>
        <span style={{color: 'red', backgroundColor: 'black'}}>ERROR: </span>
        <span>{this.state.errorMessage}</span>
        <br/>
        <Button onClick={this.handleDifferentUpload} variant="contained">Upload new image</Button>
        <br/>
      </div>
    )
    return (
      <>
        <div className="imageUpload">
          {this.state.success ? <SuccessMessage/> : null}
          {this.state.error ? <ErrorMessage/> : null}
          {!this.state.success && !this.state.error &&
            <div className="image-upload-container">
              <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file" />
              <br />
              <button className="upload-button" onClick={this.handleUpload}>UPLOAD</button>
            </div>
          }
        </div>
      </>
    );
  }
}

export default connect()(ImageUploadS3);
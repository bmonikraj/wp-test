import React from 'react';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      otpDisabled: true,
      phoneSubmit: 'Submit',
      email: '',
      password: '',
      phone: '',
      otp: '',
      alertShow: false,
      alertVariant: 'danger',
      alertHeading: '',
      alertMessage: ''
    }
    this.handleEmailLogin = this.handleEmailLogin.bind(this);
    this.handlePhoneLogin = this.handlePhoneLogin.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  handleEmailLogin() {    
    if(this.state.email === '' || this.state.password === ''){
        this.setState({
          alertHeading: 'Empty Fields',
          alertMessage: 'Email or Password can not be empty',
          alertVariant: 'warning',
          alertShow: true
        })
    }
    else{
      const getParams = (obj) => {
        const params = new URLSearchParams();
        const keys = Object.keys(obj);
        for(let k of keys){
            params.append(k, obj[k]);
        }
        return params;
      }
      var _this_ = this;
      Axios({
        method: 'post',
        url: '/login-email',
        data: getParams({
          email: this.state.email,
          password: this.state.password
        }),
        config: {
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
      })
      .then(function(r){
        if(r.status === 200){
          if(r.data.status === 'success'){
            _this_.setState({
              alertHeading: 'Success',
              alertMessage: 'Login successful',
              alertVariant: 'success',
              alertShow: true
            })
            _this_.clearText()
          }
          else{
            _this_.setState({
              alertHeading: 'Failed',
              alertMessage: 'Login failed',
              alertVariant: 'secondary',
              alertShow: true
            })
          }
        }
        else{
          _this_.setState({
            alertHeading: 'System Error',
            alertMessage: 'Error occurred with our system. Please contact administrator',
            alertVariant: 'danger',
            alertShow: true
          })
        }
      })
      .catch(function(e){
        _this_.setState({
          alertHeading: 'System Error',
          alertMessage: 'Error occurred with our system. Please contact administrator',
          alertVariant: 'danger',
          alertShow: true
        })
      })
    }
  }

  handlePhoneLogin() {
    if(this.state.phoneSubmit === 'Submit'){
      if(this.state.phone === ''){
        this.setState({
          alertHeading: 'Empty Fields',
          alertMessage: 'Phone Number can not be empty',
          alertVariant: 'warning',
          alertShow: true
        })
      }
      else{
        const getParams = (obj) => {
        const params = new URLSearchParams();
        const keys = Object.keys(obj);
        for(let k of keys){
            params.append(k, obj[k]);
        }
        return params;
        }
        var _this_ = this;
        Axios({
          method: 'post',
          url: '/login-phone',
          data: getParams({
            phone: this.state.phone
          }),
          config: {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }
        })
        .then(function(r){
        if(r.status === 200){
          if(r.data.status === 'success'){
            _this_.setState({
              alertHeading: 'OTP Sent',
              alertMessage: 'OTP sent successfully to '+r.data.phone,
              alertVariant: 'success',
              alertShow: true,
              otpDisabled: false,
              phoneSubmit: 'Verify'
            })
          }
          else{
            _this_.setState({
              alertHeading: 'Login failed',
              alertMessage: 'Phone number not valid',
              alertVariant: 'secondary',
              alertShow: true
            })
          }
        }
        else{
          _this_.setState({
            alertHeading: 'System Error',
            alertMessage: 'Error occurred with our system. Please contact administrator',
            alertVariant: 'danger',
            alertShow: true
          })
        }
      })
      .catch(function(e){
        _this_.setState({
          alertHeading: 'System Error',
          alertMessage: 'Error occurred with our system. Please contact administrator',
          alertVariant: 'danger',
          alertShow: true
        })
      })
      }
    }
    else{
      if(this.state.otp === ''){
        this.setState({
          alertHeading: 'Empty Fields',
          alertMessage: 'OTP can not be empty',
          alertVariant: 'warning',
          alertShow: true
        })
      }
      else{
        const getParams = (obj) => {
        const params = new URLSearchParams();
        const keys = Object.keys(obj);
        for(let k of keys){
            params.append(k, obj[k]);
        }
        return params;
        }
        var _this_ = this;
        Axios({
          method: 'post',
          url: '/otp-verify',
          data: getParams({
            phone: this.state.phone,
            otp: this.state.otp
          }),
          config: {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
          }
        })
        .then(function(r){
        if(r.status === 200){
          if(r.data.status === 'success'){
            _this_.setState({
              alertHeading: 'Success',
              alertMessage: 'Login successful',
              alertVariant: 'success',
              alertShow: true
            })
            _this_.clearText()
          }
          else{
            _this_.setState({
              alertHeading: 'Failed',
              alertMessage: 'OTP verification failed',
              alertVariant: 'secondary',
              alertShow: true
            })
          }
        }
        else{
          _this_.setState({
            alertHeading: 'System Error',
            alertMessage: 'Error occurred with our system. Please contact administrator',
            alertVariant: 'danger',
            alertShow: true
          })
        }
      })
      .catch(function(e){
        _this_.setState({
          alertHeading: 'System Error',
          alertMessage: 'Error occurred with our system. Please contact administrator',
          alertVariant: 'danger',
          alertShow: true
        })
      })
      }
    }
  }

  clearText() {
    this.setState({
      email: '',
      password: '',
      phone: '',
      otp: '',
      otpDisabled: true,
      phoneSubmit: 'Submit'
    })
  }

  render() {
    return (
      <div className="appRoot">
        <Container>
          <Row>
            <Col className="appContainer" xs={{span:10, offset:1}} md={{span:6, offset:3}}>
            <Tabs defaultActiveKey="email" id="uncontrolled-tab-example">
              <Tab eventKey="email" title="Email">
                <br/>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={this.state.email} type="email" placeholder="Enter email"
                      onChange={e => this.setState({email: e.target.value})}
                    />
                  </Form.Group>
  
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={this.state.password} type="password" placeholder="Password" 
                      onChange={e => this.setState({password: e.target.value})}
                    />
                    <Form.Text>We trust your typing skills. No confirmation required</Form.Text>
                  </Form.Group>
                  <div className="right-btn">
                    <Button variant="primary" onClick={this.handleEmailLogin}>
                      Login
                    </Button>
                  </div>
                </Form>
              </Tab>
              <Tab eventKey="phone" title="Phone">
                <br/>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Phone Number (IN)</Form.Label>
                    <Form.Control value={this.state.phone} type="text" pattern="[789][0-9]{9}" placeholder="Enter phone number" 
                      onChange={e => this.setState({phone: e.target.value})}
                    />
                  </Form.Group>
  
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control value={this.state.otp} disabled={this.state.otpDisabled} type="text" placeholder="Enter OTP" 
                      onChange={e => this.setState({otp: e.target.value})}
                    />
                    <Form.Text>Valid for 10 mins</Form.Text>
                  </Form.Group>
                  <div className="right-btn">
                    <Button variant="primary" onClick={this.handlePhoneLogin}>
                      {this.state.phoneSubmit}
                    </Button>
                  </div>
                </Form>
              </Tab>
            </Tabs>
            </Col>
          </Row>
        </Container>
        {
          this.state.alertShow && 
          <Alert className="appAlert" variant={this.state.alertVariant} onClose={() => this.setState({alertShow: false})} dismissible>
            <Alert.Heading>{this.state.alertHeading}</Alert.Heading>
            <p>
              {this.state.alertMessage}
            </p>
          </Alert>
        }
      </div>
    );
  }
}

export default App;

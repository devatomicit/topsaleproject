import React from 'react'
import Joi from 'joi-browser'
import {
  Col,
  Container,
  Row,
  Form,
  InputGroup,
  FormControl,
} from 'react-bootstrap'

import BaseForm from '../components/common/BaseForm'
import * as loginService from '../services/authService'
import { isAuthenticated } from '../utils/helper'
import { toast } from 'react-toastify'
import AuthContext from '../contexts/AuthContext'
import { t } from '../utils/helper'
import Input from '../components/common/Input'

class LoginScreen extends BaseForm {
  state = {
    isProcessing: false,
    didSendCode: false,
    data: {mobile: '' },
    errors: {},
  }

  schema = {
   // name: Joi.string().min(5).required().label(t('user_name')),
    mobile: Joi.string().required().label(t('mobile')),
  }

  componentDidMount() {
   // if (isAuthenticated()) return this.props.history.replace('/')
  }

  doSubmit = async () => {
    try {
      this.setState({ isProcessing: true })
      const { message } = await this.onLogin()
      toast.success(message)
      this.setState({ didSendCode: true, isProcessing: false })
    } catch (ex) {
      toast.error(ex.message || ex.toString())
      this.setState({ isProcessing: false })
    }
  }

  onLogin = async () => {
    const { name, mobile } = this.state.data
    return await loginService.login(name, `+974${mobile}`)
  }

  onVerifySucceed = () => {
    this.context.onChangeState(true)
    this.props.history.replace('/')
  }

  onResendCode = async () => {}

  render() {
    const { didSendCode, errors } = this.state
    const {mobile } = this.state.data

    return (
      <div className="d-flex justify-content-center alight-items-center py-2">
      <Container className="py-3">
      <Container className="h-100">
        <Row className="h-100">
          <Col
            className="m-auto bg-light card shadow-sm p-4 my-5"
            md={6}
            lg={4}
          >
            <h1 className="h3 text-center mb-4 text-secondary">{t('login')}</h1>
            {didSendCode ? (
              <VerifyForm
                mobile={mobile}
                onVerifySucceed={this.onVerifySucceed}
                onResendCode={this.onResendCode}
              />
            ) : (
              <Form onSubmit={this.handleSubmit}>
                {/* {this.renderInput('name', t('user_name'), 'text', {
                  autoFocus: true,
                })} */}
                <label htmlFor="mobile">{t('mobile')}</label>
                <InputGroup controlId="formName" style={{ direction: 'ltr' }}>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">+974</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="mobile"
                    type="tel"
                    name="mobile"
                    // placeholder="66466622"
                    value={mobile}
                    onChange={this.handleChange}
                    className={errors['mobile'] && 'border-danger'}
                  />
                </InputGroup>
                {errors['mobile'] && (
                  <Form.Text className="text-danger">
                    {errors['mobile']}
                  </Form.Text>
                )}
                <br />
                {/* <Input
                  type="mobile"
                  name="mobile"
                  value={mobile}
                  label={t('mobile')}
                  onChange={this.handleChange}
                  error={errors['mobile']}
                /> */}
                {/* {this.renderInput('mobile', t('mobile'), 'mobile')} */}
                {this.renderButton(t('login'))}
              </Form>
            )}
          </Col>
        </Row>
      </Container>
      </Container>
      </div>
      
    )
  }
}

class VerifyForm extends BaseForm {
  state = {
    isProcessing: false,
    data: { code: '' },
    errors: {},
  }

  schema = {
    code: Joi.string().required().label(t('code')),
  }

  doSubmit = async () => {
    try {
      this.setState({ isProcessing: true })
      const { name, mobile, onVerifySucceed } = this.props
      const { code } = this.state.data

      const { token, userId, message } = await loginService.verify(
        name,
        `+974${mobile}`,
        code
      )
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      toast.success(message)
      onVerifySucceed()
    } catch (ex) {
      toast.error(ex.message || ex.toString())
      this.setState({ isProcessing: false })
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderInput('code', t('verification_code'), 'text', {
          autoFocus: true,
        })}
        {this.renderButton(t('verify'))}
      </Form>
    )
  }
}

LoginScreen.contextType = AuthContext

export default LoginScreen

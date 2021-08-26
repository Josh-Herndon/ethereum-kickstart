import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
import 'semantic-ui-css/semantic.min.css';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    status: '',
    loading: false,
    color: 'blue'
  };

  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({loading: true, errorMessage: '', color: "yellow", status: 'Processing request...'});

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });

      this.setState({color: "green", status: 'Campaign successfully created!'});
      setTimeout(() => {Router.pushRoute('/')}, 2000);
    } catch (err) {
      this.setState({errorMessage: err.message, status: ''});
    }

    this.setState({loading: false});
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.status}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
            label="wei"
            labelPosition="right"
            placeholder="100"
            value={this.state.minimumContribution}
            onChange={e => this.setState({minimumContribution: e.target.value})}
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Message success color={this.state.color} content={this.state.status} />
          <Button loading={this.state.loading} primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;

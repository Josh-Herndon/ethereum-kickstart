import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import campaignConnection from '../ethereum/campaign';
import {Router} from '../routes.js';

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = campaignConnection(this.props.address);

    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods
      .approveRequest(this.props.id)
      .send({from: accounts[0]});
    } catch (err) {
      console.log(err.message);
    }

    Router.pushRoute(`/campaigns/${this.props.address}/requests`);
  };

  onFinalize = async () => {
    const campaign = campaignConnection(this.props.address);

    const accounts = await web3.eth.getAccounts();
    try {
      await campaign.methods
      .finalizeRequest(this.props.id)
      .send({from: accounts[0]});
    } catch (err) {
      console.log(err.message);
    }

    Router.pushRoute(`/campaigns/${this.props.address}/requests`);
  };

  render() {
    const {Row, Cell} = Table;
    const {id, request, approversCount} = this.props;
    const readyToFinalize = request.approvalCount > approversCount/2;
    console.log(request.complete);
    console.log(request.approvalCount);
    console.log(approversCount);

    return (
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>Approve</Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="red" basic onClick={this.onFinalize}>Finalize</Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;

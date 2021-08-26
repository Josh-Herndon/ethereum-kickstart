import React, {Component} from 'react';
import web3 from '../../ethereum/web3';
import {Card, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import campaignConnection from '../../ethereum/campaign';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';
import 'semantic-ui-css/semantic.min.css';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = campaignConnection(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description: 'The manager created this campaign and can create requests to withdraw money.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute at least this much wei to become an approver.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description: 'A request attempts to withdraw money from the contract. Requests must be approved by contributors.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: approversCount,
        meta: 'Number of Contributors',
        description: 'The number of people that have contributed to this campaign.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much money this campaign has available to spend.',
        style: {overflowWrap: 'break-word'}
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign at {this.props.address}</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;

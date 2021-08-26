import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const previousFactoryAddresses = ['0xfbaC9d5e76E0c1a126EE11830a47573322ec1F01']

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x724AaE204Bd843b1195DE904e835bC488af27E5c'
);

export default instance;

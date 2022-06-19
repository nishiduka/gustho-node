import Checkout from './Checkout/swagger.json';
import Clients from './Clients/swagger.json';
import Users from './Users/swagger.json';

export default {
  ...Checkout,
  ...Clients,
  ...Users,
};

let SteamCommunity = require('steamcommunity');

const community = new SteamCommunity();
/*accountName: 'your Steam account name',
  password: 'your Steam password',
  steamguard: 'your Steam Guard value', // only required if logging in with a Steam Guard authorization (does not work anymore, see below)
  authCode: 'your Steam Guard email code',*/
community.login(
  { accountName: 'gausis', password: 'Th3n3w3r4!' },
  (details, errors) => {
    console.log('successLogin', details, errors);
  },
);

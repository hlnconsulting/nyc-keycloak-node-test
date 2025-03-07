const KcAdminClient = require('keycloak-admin').default;

async function getGroupMembers() {
  const kcAdminClient = new KcAdminClient({
    baseUrl: 'https://myvaccinerecord.cityofnewyork.us/auth',
    realmName: 'nyc-cir-uat',
  });

  // Authenticate with Keycloak
  await kcAdminClient.auth({
    grantType: 'client_credentials',
    clientId: 'caremesh',
    clientSecret: 'your-password-here'
  });

  // Get the group
  const group = await kcAdminClient.groups.findOne({
    id: '5691be20-2b06-4761-b9ca-f2ff6d9964ff',
  });

  if (group.length === 0) {
    console.log('group not found');
    return;
  }

  // Get members of the group
  const members = await kcAdminClient.groups.listMembers({
    id: group.id,
    max: -1
  });

  console.log('members:', members);
}

getGroupMembers().catch((err) => {
  console.error('Error fetching group members:', err);
});
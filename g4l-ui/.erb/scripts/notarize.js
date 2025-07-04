const { notarize } = require('@electron/notarize');
const { build } = require('../../package.json');

exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  // Remove the CI check to ensure notarization happens locally
  // if (process.env.CI !== 'true') {
  //   console.warn('Skipping notarizing step. Packaging is not running in CI');
  //   return;
  // }

  console.log('Notarizing macOS application...');
  
  // Get these from environment variables or hardcode them for testing
  const appleId = process.env.APPLE_ID || 'thegrizbot@gmail.com';
  const appPassword = process.env.APPLE_APP_SPECIFIC_PASSWORD || 'ogml-fgml-xjrj-vxrw';
  const teamId = process.env.APPLE_TEAM_ID || 'P8L4LGS728';
  
  if (!appleId || !appPassword) {
    console.warn('Skipping notarizing step. APPLE_ID and APPLE_APP_SPECIFIC_PASSWORD must be set');
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  await notarize({
    appBundleId: build.appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: appleId,
    appleIdPassword: appPassword,
    teamId: teamId
  });
  
  console.log('Notarization complete!');
};
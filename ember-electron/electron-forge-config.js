const path = require('path');
const rootPath = path.join('./');

function getCodesignIdentity() {
  if (process.platform !== 'darwin') {
      return;
  }

  if (process.env.CODESIGN_IDENTITY) {
      return process.env.CODESIGN_IDENTITY;
  } else {
      console.log('Codesigning identity can not be found, release build will fail');
      console.log('To fix, set CODESIGN_IDENTITY');
  }
}

function getBundleId() {
  if (process.platform !== 'darwin') {
      return;
  }

  if (process.env.BUNDLE_ID) {
      return process.env.BUNDLE_ID;
  } else {
      console.log('bundle id can not be found, release build will fail');
      console.log('To fix, set BUNDLE_ID');
  }
}

module.exports = {
  "make_targets": {
    "win32": [
      "squirrel"
    ],
    "darwin": [
      "zip"
    ],
    "linux": [
      "deb",
      "rpm"
    ]
  },
  "electronPackagerConfig": {
    "packageManager": "yarn",
    name: "Shopper",
    icon: path.join(rootPath, 'ember-electron', 'resources', 'shopper'),
    versionString: {
      CompanyName: 'Acme Ltd',
      FileDescription: 'Shpoper for Desktop',
      ProductName: 'Shopper',
      InternalName: 'Shopper'
    },
    "osxSign": {
      "identity": getCodesignIdentity()
    },
    "appBundleId": getBundleId(),
    "appCategoryType": "app-category-type=public.app-category.developer-tools",
  },
  "electronWinstallerConfig": {
    "name": "shopper"
  },
  "electronInstallerDebian": {},
  "electronInstallerRedhat": {},
  "github_repository": {
    "owner": "",
    "name": ""
  },
  "windowsStoreConfig": {
    "packageName": "",
    "name": "shopper"
  },
  electronInstallerDMG: {
    title: 'Shopper',
    icon: path.join(rootPath, 'ember-electron', 'resources', 'shopper.icns'),
    iconsize: 100,
    window: {
        size: {
            width: 600,
            height: 571
        }
    }
},
};
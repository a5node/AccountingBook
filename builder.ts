import { build, Platform } from 'electron-builder';

build({
  // targets: Platform.MAC.createTarget(),
  // targets: Platform.WINDOWS.createTarget(),
  // targets: Platform.LINUX.createTarget(),
  config: {
    appId: 'abook.com',
    productName: 'ABook',
    copyright: 'Copyright © 2023 ${author}',
    publish: null,
    npmRebuild: true,
    // // force arch build if using electron-rebuild
    // beforeBuild: async context => {
    //   const { appDir, electronVersion, arch } = context;
    //   await electronRebuild.rebuild({ buildPath: appDir, electronVersion, arch });
    //   return false;
    // },
    appImage: {
      artifactName: '${name}-${version}.${ext}',
    },

    afterSign: 'scripts/notarize.js',
    artifactName: '${productName}-${version}-${platform}-${arch}.${ext}',
    asar: true,
    // folder app.asar.unpacked
    asarUnpack: [
      //
      // '**/*.{node,dll}',
      // '**\\*.{node,dll}',
    ],
    // Where getting of files for build. Folder app.asar
    files: [
      {
        from: '.',
        filter: [
          //
          'apps/**/*',
          'package.json',
          'prisma/**/*',
          '!prisma/dev.db',
          'node_modules/prisma/build/**/*',
        ],
      },
    ],
    // Add something files into application
    extraFiles: ['.env'],
    // Add something files into resources folder
    extraResources: [
      //
      'node_modules/.prisma/**/*',
      'node_modules/@prisma/**/*',
      'prisma/dev.db',
    ],
    // There needs to put of the build application.
    directories: {
      output: 'release/${version}',
      buildResources: 'resources',
    },
    // Windows configuration
    win: {
      artifactName: '${productName}-Windows-${version}-setup.${ext}',
      signingHashAlgorithms: ['sha256'],
      target: [
        {
          target: 'nsis',
          arch: ['x64'],
        },
        {
          target: 'zip',
        },
      ],
      icon: 'icon.ico',
    },
    // Config for the windows installer
    nsis: {
      artifactName: '${productName}-nsis-${version}-setup.${ext}',
      installerIcon: 'icon.ico',
      shortcutName: '${productName}',
      uninstallDisplayName: '${productName}',
      createDesktopShortcut: 'always',
      oneClick: false,
      perMachine: false,
      allowToChangeInstallationDirectory: true,
      deleteAppDataOnUninstall: true,
    },
    // Mac OS configuration
    mac: {
      identity: null,
      artifactName: '${productName}-Mac-${version}-Installer.${ext}',
      entitlementsInherit: 'entitlements.mac.plist',
      target: ['default', 'dmg'],
      icon: 'icon.icns',
      hardenedRuntime: true,
      gatekeeperAssess: true,
      extendInfo: [
        { NSCameraUsageDescription: "Application requests access to the device's camera." },
        { NSMicrophoneUsageDescription: "Application requests access to the device's microphone." },
        { NSDocumentsFolderUsageDescription: "Application requests access to the user's Documents folder." },
        { NSDownloadsFolderUsageDescription: "Application requests access to the user's Downloads folder." },
      ],
    },
    //  Linux configuration
    linux: {
      artifactName: '${productName}-Linux-${version}.${ext}',
      icon: 'icon.ico',
      category: 'Development',
      maintainer: '${appId}',
      target: ['AppImage', 'deb', 'rpm', 'snap'],
      desktop: {
        StartupNotify: 'false',
        Encoding: 'UTF-8',
        MimeType: 'x-scheme-handler/deeplink',
      },
    },
    // Config for OSX dmg
    dmg: {
      artifactName: '${productName}-dmg-${version}.${ext}',
      iconSize: 100,
      contents: [
        { x: 130, y: 220 },
        { x: 410, y: 220, type: 'link', path: '/Applications' },
      ],
      window: {
        width: 500,
        height: 500,
      },
    },
    deb: {
      depends: ['gconf2', 'gconf-service', 'libnotify4', 'libappindicator1', 'libxtst6', 'libnss3', 'libsecret-1-0'],
    },
  },
});

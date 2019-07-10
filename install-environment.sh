#!/bin/bash
cd $HOME
git clone https://github.com/HonestBlocks/swastha-blockchain.git
cd swastha-blockchain/Swastha-Blockchain
npm install
cd ..
cd ..
curl -O -k https://hyperledger.github.io/composer/latest/prereqs-ubuntu.sh
chmod u+x prereqs-ubuntu.sh
sudo apt-get install -y software-properties-common
npm install -g composer-cli@0.20
npm install -g composer-rest-server@0.20
npm install -g generator-hyperledger-composer@0.20
npm install -g yo
npm install -g composer-playground@0.20
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
export FABRIC_VERSION=hlfv12
chmod +x downloadFabric.sh
chmod +x startFabric.sh
chmod +x createPeerAdminCard.sh
chmod +x stopFabric.sh
chmod +x teardownFabric.sh
./downloadFabric.sh


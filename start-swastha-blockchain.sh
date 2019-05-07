#!/bin/bash
cd $HOME
figlet welcome to swastha blockchain
echo "I hope prerequisites are installed properly"
cd fabric-dev-servers
./stopFabric.sh
./teardownFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
cd .. 
cd swastha-blockchain
composer network install --card PeerAdmin@hlfv1 --archiveFile swastha-blockchain.bna
composer network start --networkName swastha-blockchain --networkVersion 0.0.2-deploy.9 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card
composer network ping --card admin@swastha-blockchain
composer-rest-server -c admin@swastha-blockchain -n never -u true -d n -w true



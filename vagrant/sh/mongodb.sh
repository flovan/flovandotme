#!/bin/bash

echo '# MONGODB -------------------------------------------'

# Install mongo
sudo apt-get install -y mongodb-org
# sudo cp /vagrant/mongod.conf /etc/mongod.conf

# Restart it
sudo service mongod restart

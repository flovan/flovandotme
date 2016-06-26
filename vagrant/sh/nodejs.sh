#!/bin/bash

echo '# NODEJS --------------------------------------------'

# Install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
source /home/vagrant/.nvm/nvm.sh

# Install node
nvm install node
nvm use node
# chown -R vagrant:vagrant /home/vagrant/.nvm

# Update npm
npm update -g npm

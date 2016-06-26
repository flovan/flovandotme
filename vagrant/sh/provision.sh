#!/usr/bin/env bash
# Some bits stolen of https://github.com/cbumgard/nodejs-vagrant

if [ -e '/etc/vagrant-provisioned' ]
then
    echo 'Vagrant provisioning already completed. Skipping...'
    exit 0
else
    echo 'Starting Vagrant provisioning process...'
fi

# Ask for the administrator password upfront
# sudo -v

# Keep-alive: update existing `sudo` time stamp until bootstrapping has finished
# while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

/vagrant/sh/core.sh
/vagrant/sh/nodejs.sh
/vagrant/sh/mongodb.sh
/vagrant/sh/github.sh

touch /etc/vagrant-provisioned
echo '-----------------------------------------------------'
echo 'Vagrant instance running at: 192.168.33.10'

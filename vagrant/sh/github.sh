#!/bin/bash

echo '# GIT -----------------------------------------------'

# Git config
su vagrant -c 'git config --global color.ui true'

echo "Run 'vagrant ssh' then set your git config manually, e.g.:"
echo "`ssh-keygen -t rsa`"
echo "(Copy the contents of `~/.ssh/id_rsa.pub` into your GitHub account: https://github.com/settings/ssh)"
echo "Run the following command to configure the user:"
echo "`git config --global user.name <your name>`"
echo "`git config --global user.email <your email>`"

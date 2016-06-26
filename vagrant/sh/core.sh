#!/bin/bash

echo '# CORE PROVISIONING ---------------------------------'

# Update existing tools
sudo apt-get update

# Install essentials
sudo apt-get install -y make git curl vim

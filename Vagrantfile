Vagrant.configure(2) do |config|
	# Tell vagrant which base box to use
	config.vm.box = 'ubuntu/trusty64'

	# Create a forwarded port mapping
	config.vm.network 'forwarded_port', guest: 3000, host: 3000

	# Create a private network
	config.vm.network 'private_network', ip: '192.168.33.10'

	# Share an additional folder to the guest VM
	config.vm.synced_folder './vagrant', '/vagrant'

	# Fine-tune the VM provider
	config.vm.provider 'virtualbox' do |vb|
		# vb.gui = true
		vb.memory = '1024'
		vb.name = 'flovan.local'
	end

	# Bootstrap the machine
	config.vm.provision :shell, :path => 'Vagrant/sh/provision.sh'
end

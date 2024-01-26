#!/bin/bash

# this 3 checks (if) are not necessary but should be convenient
if [ "$1" == "-h" ]; then
  echo "Usage: `basename $0` \"text message\""
  exit 0
fi

if [ -z "$1" ]
  then
    echo "Add an Ip addres as second arguments"
    exit 0
fi



sudo echo "sshd : $1"  >>  /etc/hosts.deny
sudo ufw deny from $1
sudo ufw reload
sudo echo "DenyUsers $2"  >>  /etc/ssh/sshd_config
sudo systemctl restart sshd
sudo systemctl restart ssh
telegram-send "user: $2 with $1 has been Blocked"
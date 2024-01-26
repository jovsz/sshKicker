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

if [ "$#" -ne 1 ]; then
    echo "You can pass only one argument."
    exit 0
fi


sudo echo "shd : $1"  >>  /etc/hosts.deny
sudo systemctl restart sshd
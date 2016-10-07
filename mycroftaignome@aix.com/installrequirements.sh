#!/bin/bash

declare -A osInfo;
osInfo[/etc/redhat-release]=yum
osInfo[/etc/SuSE-release]=zypp
osInfo[/etc/debian_version]=apt-get

for f in ${!osInfo[@]}
do
if [[ -f $f ]]; then
	if [[ ${osInfo[$f]} == "apt-get" ]]; then
 	   echo Package manager: ${osInfo[$f]}
		PKG_OK=$(dpkg-query -W --showformat='${Status}\n' python-dbus|grep "install ok installed")
		echo Checking for python-dbus: $PKG_OK
 	   if [ "" == "$PKG_OK" ]; then
		echo "python-dbus package not installed. Setting up python-dbus."
 	 	gksudo apt-get --force-yes --yes install python-dbus
 	   fi
		PKG_OK=$(dpkg-query -W --showformat='${Status}\n' gettext|grep "install ok installed")
		echo Checking for gettext: $PKG_OK
 	   if [ "" == "$PKG_OK" ]; then
 	 	echo "gettext package not installed. Setting up gettext."
 	 	gksudo apt-get --force-yes --yes install gettext
 	   fi
		PKG_OK=$(dpkg-query -W --showformat='${Status}\n' python-gobject|grep "install ok installed")
		echo Checking for python-gobject: $PKG_OK
 	   if [ "" == "$PKG_OK" ]; then
  		echo "python-gobject package not installed. Setting up python-gobject."
  		gksudo apt-get --force-yes --yes install python-gobject
 	   fi
		PKG_OK=$(dpkg-query -W --showformat='${Status}\n' python-gtk2|grep "install ok installed")
		echo Checking for python-gtk2: $PKG_OK
 	   if [ "" == "$PKG_OK" ]; then
 	 	echo "python-gtk2 package not installed. Setting up python-gtk2."
 	 	gksudo apt-get --force-yes --yes install python-gtk2
    	   fi
		pkexec pip install websocket-client
 		pkexec chmod -R 777 /home/$USER/.local/share/gnome-shell/extensions/mycroftaignome@aix.com/ > /dev/null
		pkexec chmod -R 777 /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/ > /dev/null

	elif [[ ${osInfo[$f]} == "yum" ]]; then
 	   echo Package manager: ${osInfo[$f]}
 	 	pkexec pip install websocket-client
		pkexec dnf install dbus-python -y
		pkexec chmod -R 777 /home/$USER/.local/share/gnome-shell/extensions/mycroftaignome@aix.com/ > /dev/null
		pkexec chmod -R 777 /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/ > /dev/null
	fi
fi
done
notify-send "Mycroft Extension Install Completed. Restart Session"
exit

#!/bin/bash

PKG_OK=$(dpkg-query -W --showformat='${Status}\n' python-dbus|grep "install ok installed")
echo Checking for python-dbus: $PKG_OK
if [ "" == "$PKG_OK" ]; then
  echo "python-dbus package not installed. Setting up python-dbus."
  sudo apt-get --force-yes --yes install python-dbus
fi
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' gettext|grep "install ok installed")
echo Checking for gettext: $PKG_OK
if [ "" == "$PKG_OK" ]; then
  echo "gettext package not installed. Setting up gettext."
  sudo apt-get --force-yes --yes install gettext
fi
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' python-gobject|grep "install ok installed")
echo Checking for python-gobject: $PKG_OK
if [ "" == "$PKG_OK" ]; then
  echo "python-gobject package not installed. Setting up python-gobject."
  sudo apt-get --force-yes --yes install python-gobject
fi
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' python-gtk2|grep "install ok installed")
echo Checking for python-gtk2: $PKG_OK
if [ "" == "$PKG_OK" ]; then
  echo "python-gtk2 package not installed. Setting up python-gtk2."
  sudo apt-get --force-yes --yes install python-gtk2
fi

sudo cp -R /usr/lib/python2.7/dist-packages/dbus* /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/
sudo cp -R /usr/lib/python2.7/dist-packages/dbus/* /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/
sudo cp -R /usr/lib/python2.7/dist-packages/_dbus* /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/
sudo cp -R /usr/lib/python2.7/dist-packages/gi* /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/
sudo cp -R /usr/lib/python2.7/dist-packages/gi/* /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/
sudo cp -R /usr/lib/python2.7/dist-packages/glib* /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/
sudo cp -R /usr/lib/python2.7/dist-packages/glib/* /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/
sudo cp -R /usr/lib/python2.7/dist-packages/gobject* /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/
sudo cp -R /usr/lib/python2.7/dist-packages/gobject/* /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/
sudo chmod -R 777 /home/$USER/.virtualenvs/mycroft/lib/python2.7/site-packages/ > /dev/null
mkdir /home/$USER/mycroft-core/mycroft/client/gui
cp guignome.py /home/$USER/mycroft-core/mycroft/client/gui/
cp listener.py /home/$USER/mycroft-core/mycroft/client/speech/
cp start.sh /home/$USER/mycroft-core/
cp -R mycroftaignome@aix.com* /home/$USER/.local/share/gnome-shell/extensions
sudo chmod -R 777 /home/$USER/.local/share/gnome-shell/extensions/mycroftaignome@aix.com/ > /dev/null

echo "Gnome Shell Extension Installation Completed... Restart Session > Enable Extension From Gnome Tweak Tool"

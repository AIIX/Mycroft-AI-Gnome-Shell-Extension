#!/bin/bash

workon mycroft
cd /home/$USER/mycroft-core-master/
./mycroft.sh start
espeak -ven+m4 "Initialized"
python /home/$USER/.local/share/gnome-shell/extensions/mycroftaignome@aix.com/Connectmycroft.py

#!/bin/bash

workon mycroft
cd /home/$USER/mycroft-core-master/
espeak "Mycroft Ai Is Starting.... Please Wait"
./start.sh service & ./start.sh skills & ./start.sh voice sleep 10 && espeak "Mycroft Ai Service Has Started"


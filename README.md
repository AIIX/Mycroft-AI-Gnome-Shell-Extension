# Mycroft-AI-Gnome-Shell-Extension
###Gnome Shell GUI Extension for Mycroft Ai 

## [Under Developement Expect Bugs]

#####Please Note: This Extension is currently in Development Alpha. Version: 0.1. Parts of this extension are unstable and are not recommended to be used in a production system. List of Known Issue's has been provided. 

#####Please Note: This Extension is dependent on Mycroft Ai Core. mycroft-core-master is required to be present in your '/home/$user' Directory for this extension to work.

0. Changelog
1. Installing The Extension
2. Installing The Extension Requirements
3. Setting Up Mycroft Ai Gnome Shell Extension
4. Testing For Bugs & Reporting Format
5. Known Issues
6. Version 0.2 To Do List

### [0] Changelog:
  1. Added Voice Query Support
  2. Changed GUI: Request & Reply in Single Box
  3. Start & Stop Service within Single Frame. 

### [1] Installing The Extension:

  1. Download Mycroft-AI Gnome Shell Extension Master Zip
  2. Unpack Mycroft-AI Gnome Shell Extension Master Zip
  3. Copy Folder 'mycroftaignome@aix.com' from Mycroft-AI Gnome Shell Extension Master Zip to your '/home/$user/.local/share/gnome-shell/extensions' Folder
  4. Copy File 'Start.sh' From Mycroft-AI Gnome Shell Extension Master Zip to your '/home/$user/mycroft-core-master' folder. (Do Backup the orignal 'Start.sh' File)
  5. Copy Folder 'GUI' From Mycroft-AI Gnome Shell Extension Master Zip to your '/home/$user/mycroft-core-master/mycroft/client' folder
  6. Copy from '/usr/lib/python' Dist Packages to '/home/$user/.virtualenvs/mycroft/lib/python2.7/site-packages':
      *dbus folder
      *dbus bindings file
      *dbus glib binding file
      *gi folder
      *glib folder
      *gobject folder
  7. Copy & Replace Listener.py from main download folder to '/home/$user/mycroft-core-master/mycroft/client/speech' 

### [2] Installing The Extension Requirements
  
   1. Open Terminal and Run: 'sudo apt install python-dbus gettext python-goobject'
   2. Open Terminal and Run: 'pip install pydbus'

###[3] Setting Up Mycroft Ai Gnome Shell Extension

  1. Provide Executable Permisions To Following Scripts:
      *'/home/$user/.local/share/gnome-shell/extensions/MycroftServiceStart.sh'
      *'/home/$user/.local/share/gnome-shell/extensions/MycroftServiceStartGui.sh'
      *'/home/$user/.local/share/gnome-shell/extensions/MycroftServiceStop.sh'
  2. Enable Mycroft-AI Gnome Shell Extension:
      *From Terminal = 'gnome-shell-extension-tool -e mycroftaignome@aix.com
      *From Gnome Tweak Tool -> Extension Tab
  3. Start Mycroft Service:
      *Please Note: Mycroft Service takes 30 to 60 seconds to Start. (Even after Status shows: Running). So wait a moment!!
      *Please Note: If Mycroft AI Service Continues to Show Status Unknown after Clicking Start. Debug and Report error.
  4. Stopping Mycroft Service: Will kill all python background running applications (Use Stop Button Carefully!!)

###[4] Known Issues
  1. Text/Query when typed does not register: This error is due to DBUS flooding and Hacky Python GUI Code. (Working on Fix).
  2. Query such as Weather or *Skill with multiline output does not give complete output only the last line said by Mycroft is shown. (Requires Help of Skill Dev).
  
###[5] Testing For Bugs & Reporting
  1. Use Tools To Debug:
      * Looking Glass (Gnome Default)
      * journalctl /usr/bin/gnome-shell -f -o cat for Gnome Shell Debugging
      * Dbus-monitor
      * Bustle (Dbus-monitor in Gui)
      * D-feet
  
  2. Do not post issues about known bugs. (I already know about them and will try to fix by next release!!). Thanks!
  3. Please see all steps are followed and if you still get error's post an Issue with all Log's from Looking Glass, journalctl, Dbus-monitor or Bustle and D-feet.
  
###[6] Version 0.2 To Do List
  1. Fix Known Issues
  2. Implement Webkit to Call Graphical Results

# Request Your Help & Contributors To Improve Extension 

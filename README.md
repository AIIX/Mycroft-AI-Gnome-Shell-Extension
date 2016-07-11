# Mycroft-AI-Gnome-Shell-Extension
###Gnome Shell Extension for Mycroft Ai 

###### Please Note: This Extension is dependent on Mycroft Ai Core. mycroft-core is required to be present in your '/home/$user' Directory for this extension to work. 

0. Changelog
1. Installing The Extension
2. Testing For Bugs & Reporting Format

### [0] Changelog:
  1. Release Version 0.1.2
  2. One script install for Gnome/Ubuntu based distributions
  3. Updated User Interface
  4. Added: (Experimental) Text reactive animation
  5. Added: (Experimental) Pin to Notifications
  6. Added: Copy to Clipboard
  7. Text Bugs Fixed


### [1] Installing The Extension: 

(Script Method):

  1. Download Mycroft-AI Gnome Shell Extension Master Zip
  2. Unpack Mycroft-AI Gnome Shell Extension Master Zip
  3. Run installextension.sh
  
(Manual Installation):

  1. Open Terminal and Run: 'sudo apt install python-dbus gettext python-gobject python-gtk2'
  2. Copy Folder 'mycroftaignome@aix.com' from Mycroft-AI Gnome Shell Extension Master Zip to your '/home/$user/.local/share/gnome-shell/extensions' Folder
  3. Manually Please copy the following files from '/usr/lib/python2.7/dist-packages/' to '/home/
$user/.virtualenvs/mycroft/lib/python2.7/site-packages'
         1. _dbus_bindings.x86_64-linux-gnu.so File
         2. _dbus_glib_bindings.x86_64-linux-gnu.so File
         3. Dbus Folder
         4. Glib Folder
         5. Gi Folder
  4. Make 'gui' folder in your '/home/$USER/mycroft-core/mycroft/client/{here}'
  5. Copy 'guignome.py' From Mycroft-AI Gnome Shell Extension Master Zip to your '/home/$user/mycroft-core-master/mycroft/client/gui' folder
  6. Copy File 'Start.sh' From Mycroft-AI Gnome Shell Extension Master Zip to your '/home/$user/mycroft-core' folder. (Do Backup the orignal 'Start.sh' File)
  7. Copy & Replace Listener.py from main download folder to '/home/$user/mycroft-core/mycroft/client/speech' 
  8. Provide Executable Permisions To Following Scripts:
      *'/home/$user/.local/share/gnome-shell/extensions/MycroftServiceStart.sh'
      *'/home/$user/.local/share/gnome-shell/extensions/MycroftServiceStartGui.sh'
      *'/home/$user/.local/share/gnome-shell/extensions/MycroftServiceStop.sh'
  9. Enable Mycroft-AI Gnome Shell Extension:
      *From Terminal = 'gnome-shell-extension-tool -e mycroftaignome@aix.com
      *From Gnome Tweak Tool -> Extension Tab
  10. Start Mycroft Service:
      *Please Note: Mycroft Service takes 30 to 60 seconds to Start.
      *Please Note: If Mycroft AI Service Continues to Show Status Unknown after Clicking Start. Debug and Report error.

###[2] Testing For Bugs & Reporting
  1. Use Tools To Debug:
      * Looking Glass (Gnome Default)
      * journalctl /usr/bin/gnome-shell -f -o cat for Gnome Shell Debugging
      * Dbus-monitor
      * Bustle (Dbus-monitor in Gui)
      * D-feet
  
  2. Please see all steps are followed and if you still get error's post an Issue with all Log's from Looking Glass, journalctl, Dbus-monitor or Bustle and D-feet.

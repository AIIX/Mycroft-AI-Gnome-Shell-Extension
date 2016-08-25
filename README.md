# Mycroft-AI-Gnome-Shell-Extension
###Gnome Shell Extension for Mycroft Ai 

###### Please Note: This Extension is dependent on Mycroft Ai Core. mycroft-core is required to be present in your '/home/$user' Directory for this extension to work. 

1. Changelog
2. Installing The Extension
3. Testing For Bugs & Reporting Format

### [1] Changelog:

  Release Version 0.1.3
  1. Removed all modifications to Mycroft-Core files Extension works as a standalone with its own client to communicate with Mycroft-Core
  2. Updated to use Websockets to communicate with Mycroft inplace of Dbus
  3. Installation of Dependencies for Ubuntu/Debian based Gnome Systems built into the extension
  4. Installation of Dependencies for Fedora based Gnome Systems built into the extension
  5. Install Zip using Gnome-Tweak-Tool

  # Release Version 0.1.2
  * One script install for Gnome/Ubuntu based distributions
  * Updated User Interface
  * Added: (Experimental) Text reactive animation
  * Added: (Experimental) Pin to Notifications
  * Added: Copy to Clipboard
  * Text Bugs Fixed


### [2] Installing The Extension: 
(Direct Zip Install Method 0.1.3):
  1. Download Mycroft-AI Gnome Shell Extension Master Zip
  2. Unpack Mycroft-AI Gnome Shell Extension Master Zip
  3. Go to Gnome-Tweak-Tool -> Install mycroftaignome@aix.com.zip
  4. Restart Session
  5. Activate Mycroft Ai Gnome Shell Extension
  6. Open Extension -> Click Install Dependencies 

(Script Method Version 0.1.2):

  1. Download Mycroft-AI Gnome Shell Extension Master Zip
  2. Unpack Mycroft-AI Gnome Shell Extension Master Zip
  3. Run installextension.sh
  4. Restart Session
  5. Enable from Gnome Tweak Tool
  
(Manual Installation 0.1.2):

  1. Open Terminal and Run: 
  
          'sudo apt install python-dbus gettext python-gobject python-gtk2'

  2. Copy Folder 'mycroftaignome@aix.com' from Mycroft-AI Gnome Shell Extension Master Zip to your '/home/$user/.local/share/gnome-shell/extensions' Folder
  
  3. Manually Please copy the following files from '/usr/lib/python2.7/dist-packages/' to '/home/
$user/.virtualenvs/mycroft/lib/python2.7/site-packages'

         1. _dbus_bindings.x86_64-linux-gnu.so File
         2. _dbus_glib_bindings.x86_64-linux-gnu.so File
         3. Dbus Folder
         4. Glib Folder
         5. Gi Folder

  4. Make 'gui' folder in your '/home/$USER/mycroft-core/mycroft/client/{here}'
  
  5. Copy 'guignome.py' From Mycroft-AI Gnome Shell Extension Master Zip to your '/home/$user/mycroft-core/mycroft/client/gui' folder
  
  6. Copy File 'Start.sh' From Mycroft-AI Gnome Shell Extension Master Zip to your '/home/$user/mycroft-core' folder. (Do Backup the orignal 'Start.sh' File)
  
  7. Copy & Replace Listener.py from main download folder to '/home/$user/mycroft-core/mycroft/client/speech' 
  
  8. Provide Executable Permisions To Following Scripts:
  
        *'/home/$user/.local/share/gnome-shell/extensions/MycroftServiceStart.sh'
        *'/home/$user/.local/share/gnome-shell/extensions/MycroftServiceStartGui.sh'
        *'/home/$user/.local/share/gnome-shell/extensions/MycroftServiceStop.sh'

  9. Enable Mycroft-AI Gnome Shell Extension:
  
        *From Terminal = 'gnome-shell-extension-tool -e mycroftaignome@aix.com
        *From Gnome Tweak Tool -> Extension Tab
  
  Start Mycroft Service:
        *Please Note: Mycroft Service takes 30 to 60 seconds to Start.
        *Please Note: If Mycroft AI Service Continues to Show Status Unknown after Clicking Start. Debug and Report error.

###[3] Testing For Bugs & Reporting
  1. Use Tools To Debug:
        * Looking Glass (Gnome Default)
        * journalctl /usr/bin/gnome-shell -f -o cat for Gnome Shell Debugging
        * Dbus-monitor
        * Bustle (Dbus-monitor in Gui)
        * D-feet
  
  2. Please see all steps are followed and if you still get error's post an Issue with all Log's from Looking Glass, journalctl, Dbus-monitor or Bustle and D-feet.

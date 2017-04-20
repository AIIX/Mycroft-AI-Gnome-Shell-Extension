 # MycroftAIGnomeShellExtension
 ### Gnome Shell Extension for Mycroft Ai 
  
###### Please Note: This Extension is dependent on Mycroft Ai Core. mycroftcore is required to be present in your '/home/$user' Directory for this extension to work. 
  
1. Changelog
2. Installing The Extension
3. Testing For Bugs & Reporting Format

### [1] Changelog:

  #### Release Version 0.1.3
  + Removed all modifications to MycroftCore files Extension works as a standalone with its own client to communicate with MycroftCore
  + Updated to use Websockets to communicate with Mycroft inplace of Dbus
  + Installation of Dependencies for Ubuntu/Debian based Gnome Systems built into the extension
  + Installation of Dependencies for Fedora based Gnome Systems built into the extension
  + Install Zip using GnomeTweakTool

  Release Version 0.1.2
  + One script install for Gnome/Ubuntu based distributions
  + Updated User Interface
  + Added: (Experimental) Text reactive animation
  + Added: (Experimental) Pin to Notifications
  + Added: Copy to Clipboard
  + Text Bugs Fixed


### [2] Installing The Extension: 
(Direct Zip Install Method 0.1.3):
  1. Download MycroftAI Gnome Shell Extension Master Zip
  2. Unpack MycroftAI Gnome Shell Extension Master Zip
  3. Go to GnomeTweakTool > Install mycroftaignome@aix.com.zip
  4. Restart Session
  5. Activate Mycroft Ai Gnome Shell Extension
  6. Open Extension > Click Install Dependencies 

(Script Method Version 0.1.2):

  1. Download MycroftAI Gnome Shell Extension Master Zip
  2. Unpack MycroftAI Gnome Shell Extension Master Zip
  3. Run installextension.sh
  4. Restart Session
  5. Enable from Gnome Tweak Tool
  
(Manual Installation 0.1.3):
  1. Download MycroftAI Gnome Shell Extension Master Zip
  2. Unpack MycroftAI Gnome Shell Extension Master Zip
  3. Go to GnomeTweakTool > Install mycroftaignome@aix.com.zip
  4. Restart Session
  5. Activate Mycroft Ai Gnome Shell Extension
  6. Goto /home/(Your Username)/.local/share/gnomeshell/extensions/mycroftaignome@aix.com/
  7. Run ./installrequirements.sh (Check script for dependencies) 

(Manual Installation 0.1.2):

  1. Open Terminal and Run: 
  
          'sudo apt install pythondbus gettext pythongobject pythongtk2'

  2. Copy Folder 'mycroftaignome@aix.com' from MycroftAI Gnome Shell Extension Master Zip to your '/home/$user/.local/share/gnomeshell/extensions' Folder
  
  3. Manually Please copy the following files from '/usr/lib/python2.7/distpackages/' to '/home/
$user/.virtualenvs/mycroft/lib/python2.7/sitepackages'

         1. _dbus_bindings.x86_64linuxgnu.so File
         2. _dbus_glib_bindings.x86_64linuxgnu.so File
         3. Dbus Folder
         4. Glib Folder
         5. Gi Folder

  4. Make 'gui' folder in your '/home/$USER/mycroftcore/mycroft/client/{here}'
  
  5. Copy 'guignome.py' From MycroftAI Gnome Shell Extension Master Zip to your '/home/$user/mycroftcore/mycroft/client/gui' folder
  
  6. Copy File 'Start.sh' From MycroftAI Gnome Shell Extension Master Zip to your '/home/$user/mycroftcore' folder. (Do Backup the orignal 'Start.sh' File)
  
  7. Copy & Replace Listener.py from main download folder to '/home/$user/mycroftcore/mycroft/client/speech' 
  
  8. Provide Executable Permisions To Following Scripts:
  
        *'/home/$user/.local/share/gnomeshell/extensions/MycroftServiceStart.sh'
        *'/home/$user/.local/share/gnomeshell/extensions/MycroftServiceStartGui.sh'
        *'/home/$user/.local/share/gnomeshell/extensions/MycroftServiceStop.sh'

  9. Enable MycroftAI Gnome Shell Extension:
  
        *From Terminal = 'gnomeshellextensiontool e mycroftaignome@aix.com
        *From Gnome Tweak Tool > Extension Tab
  
  Start Mycroft Service:
        *Please Note: Mycroft Service takes 30 to 60 seconds to Start.
        *Please Note: If Mycroft AI Service Continues to Show Status Unknown after Clicking Start. Debug and Report error.

### [3] Testing For Bugs & Reporting
  1. Use Tools To Debug:
        * Looking Glass (Gnome Default)
        * journalctl /usr/bin/gnomeshell f o cat for Gnome Shell Debugging
        * Dbusmonitor
        * Bustle (Dbusmonitor in Gui)
        * Dfeet
  
  2. Please see all steps are followed and if you still get error's post an Issue with all Log's from Looking Glass, journalctl, Dbusmonitor or Bustle and Dfeet.

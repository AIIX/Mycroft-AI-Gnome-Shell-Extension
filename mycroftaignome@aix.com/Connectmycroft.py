import websocket
import time
import sys
import json
import re
import dbus
from traceback import print_exc
import dbus.mainloop.glib
import threading
	
from gi.repository import GLib
guioutputstring = ''
result = ''

def on_message(ws, message): #Filters result from mycroft
    query = message
    nstr = re.sub(r'[?|$|.|!]',r'', query)	
    nestr = re.sub(r'[^a-zA-Z0-9-+ ]',r'',nstr)
    debugquery = nestr
    if "speak" in debugquery:
           resultmodifier = debugquery
           result = resultmodifier.split('utterance ')[1]
           print result
	   global result	
	   dbusout()

def getInput (queryInput):
    print "getInput Query Input : " + queryInput
  
def on_error(ws, error):
    print error

def on_close(ws):
    print "### closed ###"


def catchInput(queryInput): #Gets User Input from the extension via dbus sends it to mycroft via websockets
            object = bus.get_object("org.gnome.Shell","/com/mycroftaignome/MycroftGnomeResult")
	    line = object.sendQuery(guioutputstring, dbus_interface = "com.mycroftaignome.MycroftAiGnomeBox")	
	    ws.send(json.dumps({"message_type": "recognizer_loop:utterance", "metadata": {'utterances': [line.strip()]}}))
	    	
def dbusout(): #Sends the reply received from mycroft to the extension via dbus 
	bus = dbus.SessionBus()
	remote_object = bus.get_object("org.gnome.Shell","/com/mycroftaignome/MycroftGnomeResult")  
	setText = remote_object.setText(result, dbus_interface = "com.mycroftaignome.MycroftAiGnomeBox")

if __name__ == "__main__": #DBus & WS Main Loop
    dbus.mainloop.glib.DBusGMainLoop(set_as_default=True)
    bus = dbus.SessionBus()
    try:
    	websocket.enableTrace(True)
    	ws = websocket.WebSocketApp("ws://localhost:8000/events/ws",
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)

	wst = threading.Thread(target=ws.run_forever)
	wst.daemon = True
    	wst.start()

        object = bus.get_object("org.gnome.Shell","/com/mycroftaignome/MycroftGnomeResult")
	object.connect_to_signal("signalQueryReady", getInput, dbus_interface="com.mycroftaignome.MycroftAiGnomeBox")

    except dbus.DBusException:
		traceback.print_exc()
		print ("Error")
		sys.exit(1)

    bus.add_signal_receiver(catchInput, dbus_interface = "com.mycroftaignome.MycroftAiGnomeBox", signal_name = "signalQueryReady")
    loop = GLib.MainLoop()
    loop.run()

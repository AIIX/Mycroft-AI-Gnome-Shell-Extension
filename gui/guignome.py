import sys
import dbus
from threading import Thread, Lock

from mycroft.messagebus.client.ws import WebsocketClient
from mycroft.messagebus.message import Message
from mycroft.tts import tts_factory
from mycroft.util.log import getLogger

from xml.dom import minidom
import os

from traceback import print_exc
import dbus.mainloop.glib

from gi.repository import GLib

tts = tts_factory.create()
client = None
mutex = Lock()
logger = getLogger("CLIClient")
guioutputstring = ''

def handle_speak(event):
    mutex.acquire()
    client.emit(Message("recognizer_loop:audio_output_start"))
    try:
        utterance = event.metadata.get('utterance')
        logger.info("Speak: " + utterance)
	global guioutputstring	
	guioutputstring = utterance
	logger.info("guioutputstring: " + guioutputstring)	
	dbusout()	
	tts.execute(utterance)		
    finally:
        mutex.release()
        client.emit(Message("recognizer_loop:audio_output_end"))


def connect():
    client.run_forever()
            

def dbusout(): #sends the reply received from mycroft to the extension via dbus 
	bus = dbus.SessionBus()
	remote_object = bus.get_object("org.gnome.Shell","/com/mycroftaignome/MycroftGnomeResult")  
	setText = remote_object.setText(guioutputstring,dbus_interface = "com.mycroftaignome.MycroftAiGnomeBox")
	print ('lol'+remote_object.ListNames()[0])
	
def getInput (queryInput):
	print "getInput Query Input : " + queryInput
	

def catchInput(queryInput): #gets the text entered by the user of the extension to client.emit 
	bus = dbus.SessionBus()
	remote_object = bus.get_object("org.gnome.Shell","/com/mycroftaignome/MycroftGnomeResult")  
	getText = remote_object.sendQuery(guioutputstring,dbus_interface = "com.mycroftaignome.MycroftAiGnomeBox")	
	print getText	
 	global client
	client = WebsocketClient()
	client.on('speak', handle_speak)
	event_thread = Thread(target=connect)
	event_thread.setDaemon(True)
	event_thread.start()
	try:
		while True:
       			print("Input:")
      	 		queryInput= object.sendQuery(guioutputstring,dbus_interface = "com.mycroftaignome.MycroftAiGnomeBox")
      			client.emit(
      		          Message("recognizer_loop:utterance",
      		                  metadata={'utterances': [queryInput]}))
			break
    	except KeyboardInterrupt, e:
        	logger.exception(e)
        	event_thread.exit()
		sys.exit()		

if __name__ == "__main__":	#dbus mainloop #signal recieved when user sends text to mycroft from the extension
        	dbus.mainloop.glib.DBusGMainLoop(set_as_default=True)
		bus = dbus.SessionBus()
		try:
			print("1")			
			object = bus.get_object("org.gnome.Shell","/com/mycroftaignome/MycroftGnomeResult")
			object.connect_to_signal("signalQueryReady", getInput, dbus_interface="com.mycroftaignome.MycroftAiGnomeBox")
		except dbus.DBusException:
			traceback.print_exc()
			print ("Error")
			sys.exit(1)
		bus.add_signal_receiver(catchInput,dbus_interface = "com.mycroftaignome.MycroftAiGnomeBox", signal_name = "signalQueryReady")


		loop = GLib.MainLoop()
		loop.run()


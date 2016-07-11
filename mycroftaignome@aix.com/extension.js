/*
 * MycroftAi extension for gnome-shell
 * Copyright (c) 2016 Aditya Mehra <aix.m@outlook.com>
 *
 * Portions originate from the gnome-shell source code, Mycroft Ai source code, Copyright (c)
 * its respectives authors.
 * 
 * This project is released under the GNU GPL v3 License.
 * See License for details.
 *	
 */

/* -*- Imported Libraries -*- */

const Clutter = imports.gi.Clutter;
const Config = imports.misc.config;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;
const Gdk = imports.gi.Gdk;
const GdkPixbuf = imports.gi.GdkPixbuf;
const Cogl = imports.gi.Cogl;
const Lang = imports.lang;
const St = imports.gi.St;
const Shell = imports.gi.Shell;
const Meta = imports.gi.Meta;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const Gio = imports.gi.Gio;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;
const Gettext = imports.gettext.domain('mycroftai-shell-extension');
const _ = Gettext.gettext;
const N_ = function(x) { return x; };

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;
const Tweener = imports.ui.tweener;
const Pango = imports.gi.Pango;
const JSUnit = imports.jsUnit;
const Webkit = imports.gi.WebKit2;
const GtkClutter = imports.gi.GtkClutter;
const MessageTray = imports.ui.messageTray;

function MycroftAiGnomeBoxExtension(extensionMeta) {
    this._init(extensionMeta);
}

let dbusInst = null;
let dbusId = null;

/* DBus Methods */
const MycroftAiGnomeResultIface = '<node> \
<interface name="com.mycroftaignome.MycroftAiGnomeBox"> \
<method name="emitSignal"/> \
<method name="setText"> \
    <arg type="s" direction="in" /> \
</method> \
<method name="sendQuery"> \
    <arg type="s" direction="out" /> \
</method> \
<method name="getvoiceQuery"> \
    <arg type="s" direction="in" /> \
</method> \
<method name="weatherWiget"> \
    <arg type="s" direction="in" /> \
</method> \
<signal name="signalQueryReady"> \
    <arg type="s" direction="out"/> \
</signal> \
</interface> \
</node>';

/* Main Frame Code */
function MycroftAiGnomeBox() {
    this._init.apply(this, arguments);
}

MycroftAiGnomeBox.prototype = {
    __proto__: PopupMenu.PopupBaseMenuItem.prototype,
		
    _init: function(itemParams) {
        PopupMenu.PopupBaseMenuItem.prototype._init.call(this, {reactive: false, style_class: '.mainbox'});	

        let boxr = new St.BoxLayout({style_class: 'mycroftext-box', reactive: 'true', track_hover: 'true'});
	boxr.connect('notify::hover', Lang.bind(this, hidequeryhover));
        boxr.set_vertical(true);
	
	let _startButton = new St.Button ({ label: "Start Mycroft Service", style_class:"button" });
	_startButton.connect ('clicked', Lang.bind(this, _startMycRunnerd));

	let _stopButton = new St.Button ({ label: "Stop Mycroft Service", style_class:"button" });
	_stopButton.connect("clicked", Lang.bind(this, _stopMycRunnerd)); 
	
	this._runnerdLabel = new St.Label ({ style_class: "status" });
	this._runnerdLabel.set_text(_("Status: Unknown")); 

	let _testButtonSignal = new St.Button ({ label: "Connect", style_class:"button" });
	_testButtonSignal.connect ('clicked', Lang.bind(this, testEmitSignal));
	_testButtonSignal.connect ('clicked', Lang.bind(this, initialsignal));


	boxr.add(_startButton);
	boxr.add(_stopButton);
	_stopButton.hide();
	boxr.add(_testButtonSignal);
	boxr.add_child(this._runnerdLabel);

        this._textEntry = new St.Entry({name: 'searchEntry',
                                        can_focus: true,
					style_class: 'entrybox',	
                                        track_hover: true,
                                        hint_text: _("Enter Query or Say 'Hey Mycroft'")});
       this._textEntry.clutter_text.connect('activate', Lang.bind(this, this._onEntryActivated));
       this._textEntry.clutter_text.connect('key-press-event', Lang.bind(this, this._onKeyReleaseEvent));
       this._textEntry.clutter_text.connect('key-press-event', function(o,e) {
	let symbol = e.get_key_symbol();
	if (symbol == Clutter.Return) {
		animateimg();
		testsendText();
		testEmitSignal();
	}
	});	      	

	this.clippy = new St.Button ({ label: "", style_class:"clippy" });
	this.clippy.connect('clicked', Lang.bind(this, notifclipboard));
	this.pintonotification = new St.Button ({ label: "", style_class:"pintonotif" });
	this.pintonotification.connect ('clicked', Lang.bind(this, notification));	
	this.notifbox = new St.BoxLayout({style_class: 'notifbox'});
	let clippybox = new St.BoxLayout({style_class: 'notifbox'});	

	let animbox = new St.BoxLayout({style_class: 'animbox'});
	let anitext = new St.Label({style_class: 'mycroftext-box-anim'});
	anitext.opacity = 20;
        anitext.set_text(_(""));

	let querybox = new St.BoxLayout ({style_class: 'querybox', reactive: true, track_hover: true});
	querybox.connect('notify::hover', Lang.bind(this, showqueryhover));
        querybox.set_vertical(true);
	boxr.add(querybox);		
	querybox.add(this.notifbox);
	this._getnotificationinput = new St.Label({style_class: 'queryout'});
	this._getnotificationinput.set_text('');
	this._getnotificationinput.clutter_text.line_wrap = true;
	this._getnotificationinput.clutter_text.line_wrap_mode = Pango.WrapMode.WORD;
	this._getnotificationinput.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;
	querybox.add(this._getnotificationinput, {expand:true});
	querybox.add(animbox);
	animbox.add(anitext);

	this._getnotificationoutput = new St.Label({style_class: 'queryin'});
	this._getnotificationoutput.set_text('');
	this._getnotificationoutput.clutter_text.line_wrap = true;
	this._getnotificationoutput.clutter_text.line_wrap_mode = Pango.WrapMode.WORD;
	this._getnotificationoutput.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;
	this.notifbox.add(this.pintonotification);		
	this.notifbox.add(this.clippy);	
	querybox.add(this._getnotificationoutput, {expand:true});
	this.notifbox.hide();


	this._dbusImpl = Gio.DBusExportedObject.wrapJSObject(MycroftAiGnomeResultIface, this);
	
	const MycroftGnomeResult = new Lang.Class({
	Name: 'MycroftGnomeResult',	

	});
	
	this._dbusImpl.export(Gio.DBus.session, '/com/mycroftaignome/MycroftGnomeResult');


	//Start Mycroft Service Code
	
	var mycConfig = {
	start : Me.path + "/MycroftServiceStart.sh",
	startgui: Me.path + "/MycroftServiceStartGui.sh",
	stop: Me.path + "/MycroftServiceStop.sh",
	};		

	var mycRunner = {
	_spawn_async: function ( cmd, e ) {
		try {
            GLib.spawn_command_line_async( cmd, e );
        } catch ( e ) {
            throw e;
          }
    },
	
	start : function () {       
	        this._spawn_async(mycConfig.start, null);
		this._spawn_async(mycConfig.startgui, null);
	    },


   	stop : function() {
   	     this._spawn_async(mycConfig.stop, null);
    	    }

	};

	
	let _testButton = new St.Button ({ label: "Send Query", style_class:"button" });
	_testButton.connect ('clicked', Lang.bind(this, testEmitSignal));
	_testButton.connect ('clicked', Lang.bind(this, testsendText));

	function initialsignal(){
	this._getnotificationoutput.set_text("");
	this._runnerdLabel.set_text ("Running: Connected ");
    	this._runnerdLabel.set_style("background-color:#3f998a;");
	}

	
	boxr.add(this._textEntry);

        let scrollbox = new St.ScrollView({style_class: 'mycroftext-scrollbox'});
        this._scrollAdjustment = scrollbox.vscroll.adjustment;

	function _stopMycRunnerd() {
        mycRunner.stop();
	this._runnerdLabel.set_text ("Service Stopped");
	this._runnerdLabel.set_style("background-color:#790606;");
	_startButton.show();
	_stopButton.hide();
	    }
	
	function _startMycRunnerd() {
        mycRunner.start();
	this._runnerdLabel.set_text ("Running: Not Connected ");
	this._getnotificationoutput.set_text("Please Wait..Click Connect To Start");
	this._runnerdLabel.set_style("background-color:#065a79;");
	_startButton.hide();
	_stopButton.show();
	    }
	
	function animateimg() {
	anitext.opacity = 80;
		GLib.timeout_add(GLib.PRIORITY_DEFAULT, 100, function() {
    	anitext.opacity = 20;
    return false; // Don't repeat
}, null);
	}

	function showqueryhover() {
		this.notifbox.show();
	} 

	function hidequeryhover() {
		this.notifbox.hide();
	}	

	function notifclipboard() {
	St.Clipboard.get_default().set_text(St.ClipboardType.PRIMARY, this._getnotificationoutput.get_text());
	St.Clipboard.get_default().set_text(St.ClipboardType.CLIPBOARD, this._getnotificationoutput.get_text());
	}
	
	function notification() {
	let textnotif = this._getnotificationoutput.get_text();
    	let source = new MessageTray.SystemNotificationSource();
    	Main.messageTray.add(source);
    	let notification = new MessageTray.Notification(source, textnotif, null);
    	notification.setTransient(true);
    	source.notify(notification);
}	


	function testEmitSignalFunction(e) {
	let symbol = e.get_key_symbol();
	if (symbol == Clutter.Return) {	
	testEmitSignal();
	}
}	
	
	//Sending Query -> Dbus
	function testsendText() {
        const ReceiveInterface = Gio.DBusProxy.makeProxyWrapper(MycroftAiGnomeResultIface);
	var prox = new ReceiveInterface( Gio.DBus.session, 'org.gnome.Shell', '/com/mycroftaignome/MycroftGnomeResult', Lang.bind( this, function( proxy, error ){
          if( error ) { 
                log('error: ' + error ); 
               return;
            }
        })
    );
	
	
	let loop = GLib.MainLoop.new(null, false);
	let theResult, theExcp;
	prox.sendQueryRemote(function(result, excp) {
        theResult = "H";
        theExcp = excp;
        loop.quit();
	});
	loop.run();
	JSUnit.assertEquals("H", theResult[0]);
    	//JSUnit.assertNull(theExcp);
}	

	//Signal Emitter
	function testEmitSignal() {
        const ReceiveInterface = Gio.DBusProxy.makeProxyWrapper(MycroftAiGnomeResultIface);
	var prox = new ReceiveInterface( Gio.DBus.session, 'org.gnome.Shell', '/com/mycroftaignome/MycroftGnomeResult', Lang.bind( this, function( proxy, error ){
          if( error ) { 
                log('error: ' + error ); 
               return;
            }
        })
    );   
		
    let loop = GLib.MainLoop.new(null, false);

    let theResult, theExcp;
    let signalReceived = 0;
    let signalArgument = null;
    let id = prox.connectSignal('signalQueryReady',
                                 function(emitter, senderName, parameters) {
                                     signalReceived ++;
                                     [signalArgument] = parameters;
                                     prox.disconnectSignal(id);
                                 });

    prox.emitSignalRemote(function(result, excp) {
        [theResult] = result;
        theExcp = excp;
        if (excp)
            log("Signal emission exception: " + excp);
        loop.quit();
    });

    loop.run();

    JSUnit.assertUndefined('result should be undefined', theResult);
    JSUnit.assertNull('no exception set', theExcp);
    JSUnit.assertEquals('number of signals received', signalReceived, 1);
    JSUnit.assertEquals('signal argument', signalArgument, "foobar");	
	
}	



	// Scrollbox
        let container = new St.BoxLayout({style_class: 'mainbox'});
        container.set_vertical(true);
        scrollbox.add_actor(container);
	this.actor.add(boxr);
    },

	setText: function(str) {
	this._getnotificationoutput.set_text(' ' + str );	
	this.animateimg();
    	},

	getvoiceQuery: function(str) {
	this._getnotificationinput.set_text(' ' + str );
    	},

	weatherWidget: function(str) {
	},

	sendQuery: function(str) {
		return this._getnotificationinput.get_text();
    	},


	_onEntryActivated: function() {
		this._textEntry.set_text('');
		this.notifbox.hide();
	},

	 emitSignal: function() {
        this._dbusImpl.emit_signal('signalQueryReady', GLib.Variant.new('(s)', [ "aQueryIsReady" ]));
	},

	_onKeyReleaseEvent: function() {
	this._getnotificationinput.set_text(this._textEntry.get_text())	
   	}
};


/* Panel button */

MycroftAiGnomeBoxExtension.prototype = {
    __proto__: PanelMenu.Button.prototype,

    _init: function(extensionMeta) {
        PanelMenu.Button.prototype._init.call(this, 0.0);

        this.extensionMeta = extensionMeta;
        this.panelContainer = new St.BoxLayout({style_class: "panel-box"});
        this.actor.add_actor(this.panelContainer);
        this.actor.add_style_class_name('panel-status-button');
        this.currentActivity = null;	
        this.icon = new St.Icon({style_class: "myc-icon"});
        this.panelContainer.add(this.icon);
        let item = new MycroftAiGnomeBox();
        item.connect('activate', Lang.bind(this, this._onActivityEntry));
        this.activityEntry = item;
        this.menu.addMenuItem(item);
    },

    _onActivityEntry: function() {
        let text = this.activityEntry._textEntry.get_text();
    }
};


function ExtensionController(extensionMeta) {
    let dateMenu = Main.panel.statusArea.dateMenu;

    return {
        extensionMeta: extensionMeta,
        extension: null,
        placement: 0,
        activitiesText: null,

        enable: function() {
            this.extension = new MycroftAiGnomeBoxExtension(this.extensionMeta);
	    Main.panel.addToStatusArea("mycroft", this.extension, -1, "right");
            Main.panel.menuManager.addMenu(this.extension.menu);
        },

        disable: function() {
            Main.wm.removeKeybinding("show-mycroft-dropdown");

            if (this.placement == 1) {
                Main.panel._rightBox.remove_actor(dateMenu.container);
                Main.panel._addToPanelBox('dateMenu', dateMenu, Main.sessionMode.panel.center.indexOf('dateMenu'), Main.panel._centerBox);

            } else if (this.placement == 2) {
                Main.panel._leftBox.get_children()[0].get_children()[0].get_children()[0].get_children()[0].set_text(this._activitiesText);
            }

            Main.panel.menuManager.removeMenu(this.extension.menu);

            GLib.source_remove(this.extension.timeout);
            this.extension.actor.destroy();
            this.extension.destroy();
            this.extension = null;
        }
    };
}

function init(extensionMeta) {
    Convenience.initTranslations("mycroft-shell-extension");
    return new ExtensionController(extensionMeta);
	let theme = imports.gi.Gtk.IconTheme.get_default();
	theme.append_search_path(extensionMeta.path + "/icons");
}

#### Wie alles begann...

... vor einiger Zeit wohnten wir in einer Wohnung mit ziemlich schlechter Dämmung (keine) und schlechter Heizung (kapott).
Nachdem das eskalierte und in der kältesten Ecke es anfing mit schimmeln, war ich froh, aus Spass mich mit der Thematik befasst zu haben.
Ich hatte in jedem Zimmer schon den Temperatur- und Luftfeuchte-Sensor aufgestellt. So landen die Werte schön in der InfluxDB.

Was noch fehlte, waren die Kontakt-Sensoren für die Fenster, damit man - tadaaa - automatisiert ein Lüftungsprotokoll erstellen kann.

Gesagt, getan.

Einen CSV-View am Webserver angelegt und schon kann ich mit Google Sheets die Daten importieren und darstellen. Jeder Zeit.

#### Und Heute?

Heute wohnen wir in unserem Haus. Irgendwie klar, dass in jedem Raum die Temperatur und Luftfeuchte per Zigbee gemessen wird.
Aber auch Bewegungsmelder in den Fluren und Smarte Glühbirnen (Phillips Hue) tun ihren Dienst.

#### Welche Hersteller?

Ich verwende alle Geräte, die **Zigbee2Mqtt** versteht. Das sind echt eine Menge und komplett herstellerübergreifend.
Es kommen auch fast täglich neue dazu. Wahnsinn. Natürlich fällt so die Steuerung via Hersteller-App / Hersteller-Gateway
weg. Es machen zwar viele Leute - ich aber nicht. ;) Nein. Ohne mich.

#### Der Server
Stattdessen arbeitet als Server eine Anwendung, die sämtliche Topics in der Influx wegspeichert.
Alles (fast alles) was reinkommt, landet dort. Bei mir wird auf einem Topic **AUSSCHLIESSLICH** ein Wert rumgeschickt - kein JSON - nur ein einziger blanker Wert.
Das ist mir relativ wichtig gewesen.

Ein wichtiger Aspekt ist der Programmablauf des Servers. Dieser ist gleichzeitig ein MQTT-Client. 
Ich schreibe JSON-Konfig-Files und in diesen konfiguriere ich ein oder mehrere **neue** Topics.
Als Quelle pro neuem Topic gebe ich kein, ein oder mehrere Topics an. Dem neuen Topic nenne ich auch einen **Transponder** - 
einen zuvor als Code angelegten Berechnungsvorgang. Tröpfelt nun auf einem der Source-Topics ein Wert herein, wir die Berechnung ausgeführt
und das Ergebnis auf dem neuen Topic rausgeschossen.

#### Berechnungsmöglichkeiten (Transponder)
- map
- min
- max
- average
- wet bulb
- Taupunkt
- absolute Luftfeuchte
- Licht
- Buttons

So ergibt es sich schnell, dass das Ergebnis eines Topics die Berechnung eines anderen Topics auslöst.
Es blubbert hier mit ca. 10 Hz unentwegt.

#### Zigbee, 433 Mhz, Custom-Wifi
Zigbee und 433 Mhz-Geräte werden von einem zweiten Rechner, einem Raspberry Pi 4 bearbeitet.
Der hat nämlich zwei verschiedene USB-Sticks am Laufen. Einmal Zigbee und einmal 433 Mhz.
Auf dem Raspi läuft Docker, Portainer, Zigbee2MQTT und ein von mir gefertigtes Frontend zum Mappen
von 433 Mhz-Geräten auf MQTT. D.h. Zigbee2Mqtt und meine App sind auch MQTT-Clients.

Custom Devices sind geräte mit ESP32 oder ESP8622 wie dem nodeMCU. Die Dinger sind im Wifi-Netz und MQTT-Clients.
Sie kleben als Pflaster am Stromzähler und machen eins auf Volkszähler, sie überwachen die Heizung mit Anlegesensoren, 
messen Licht von allen Hausseiten und noch ein paar andere Spielereien...

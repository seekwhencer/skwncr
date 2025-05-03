Ich kann eigentlich nur aus meinen Erfahrungen mit Zigbee schöpfen. Unter Abwägung verschiedener Aspekte habe ich mich
vor wenigen Jahren für Zigbee entschieden und bin gerne unabhängig vom Hersteller. Dem Matter-Protokoll sehe ich
optimistisch entgegen.

#### zigbee2mqtt
... als Gateway und `mosquitto` als MQTT-Broker sind in meinem Szenario zentrale Elemente.

#### Custom MQTT Client
Als node.js (Server-)App auf einem SoC wie dem Raspberry Pi oder in C++ geschrieben auf dem ESP (32/8622)

#### Home Assistant
... lässt sich in einem `zigbee2mqtt`-Szenario super einbinden

#### nodeRED
... kann man verwenden, um auf visuelle Weise eher kompliziertere Automationen zu bauen

#### n8n
... wenn es noch ausgefallener sein soll

#### Grafana
... für die Darstellung der Zeitreihen

#### Infrastruktur
Das Ganze in einer entsprechenden dockerisierten Infrastruktur eingebettet. 

#### Off Grid
Das ganze auch autonom vom WAN in einem Insel-Netzwerk mit DNS und autonomer Stromversorgung (PV) - 
damit auch offline der Betrieb gewährleistet ist.
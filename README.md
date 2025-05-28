## skwncr.net

... das ist (wird) meine Website auf: https://skwncr.net

> work in progress ...

---

### Parts

1. Data
2. Frontend
3. Server

### Data
- Ist der Contend
- Baut ein großes Json-File `data/data.json`, was aus vielen einzelnen Einzel-Jsons- und Markdown-Files besteht
- Im Dev-Mode mit Watch-Task
- Wird vom Frontend importiert

### Frontend
- SSR / CSR Frontend
- Build braucht gebautes `data/data.json`
- Im Dev-Mode mit Watch-Task
- Im HMR Dev-Mode auf eigener Subdomain im LAN (jwilder nginx reverse proxy)

### Server (Dev / Prod)
- macht SSR
- generiert Thumbnails
- generiert PDF
- Im Dev-Mode auf eigener Subdomain im LAN (jwilder nginx reverse proxy)

### Production
- Alles in einem Image
- Im Prod-Mode auf entsprechender Domain im Web (jwilder nginx reverse proxy)
- SSL Let's encrypt Zertifikat wird automatisch erzeugt
- Deploy-Script `./build.sh` wird auf dem Production Docker-Host ausgeführt
> `build.sh` setzt initial voraus, dass schon alles da ist. Also initial manuell checkout nach: `~/projects/skwncr.net`

### Deployment Production
- git commit
- auf Server Script ausführen: `./build.sh`
- fertig

### Infrastruktur

- DNS: Webtropia
- Hosting: VPS Contabo
- Mail: Google Workspace

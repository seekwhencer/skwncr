## JSON-Data-Generator

- Dieser Job erzeugt ein finales JSON-File aus vielen verschachtelten JSON-Files.
- Auch Markdown-Files können als Wert importiert werden.

### Anwendung
- einfach `npm start` ausführen, was einen Build erzeugt und den Watch-Task startet.
- läuft der Watch-Task, wird bei jeder Änderung an den Files der Build ausgeführt

### Konfiguration
- relativ vom `pwd` wird der Pfad in der `index.js` definiert:
    ```javascript
    const sourceRootPath = './storage';
    const sourceRootFile = 'index.json';
    const targetFile = 'data.json';
    ```
  
### Anwendung
- JSON verschachteln
    ```json
    "services": "${services.json}"  
    ```
- Markdown einfügen
    ```json
    "text": "${services/development.md}"
    ```
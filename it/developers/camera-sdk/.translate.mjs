import fs from "node:fs";

const files = ["json-protocol.mdx", "user-guide.mdx", "linux-examples.mdx"];

const phrases = new Map([
  ["JSON communication protocol", "Protocollo di comunicazione JSON"],
  ["TCP Socket JSON message format and field reference for communication between a camera and a robot or PLC.", "Formato dei messaggi JSON TCP Socket e riferimento ai campi per la comunicazione tra una fotocamera e un robot o PLC."],
  ["Camera SDK User Guide", "Manuale utente di Camera SDK"],
  ["Camera SDK user guide", "Manuale utente di Camera SDK"],
  ["Integrate supported MRDVS cameras on x86 Windows or x86 and Arm Linux systems with the Camera SDK APIs.", "Integra le fotocamere MRDVS supportate su sistemi x86 Windows oppure x86 e Arm Linux tramite le API di Camera SDK."],
  ["Linux SDK Examples", "Esempi di SDK Linux"],
  ["Linux SDK examples", "Esempi di SDK Linux"],
  ["Set up, build, and run the C, Java, ROS, and ROS 2 examples included with the MRDVS Camera SDK for Linux.", "Configura, compila ed esegui gli esempi C, Java, ROS e ROS 2 inclusi in MRDVS Camera SDK per Linux."],
  ["Document version: V1.0; revision date: 2024-10-12.", "Versione del documento: V1.0; data di revisione: 2024-10-12."],
  ["Response examples", "Esempi di risposta"],
  ["Request message", "Messaggio di richiesta"],
  ["Response message", "Messaggio di risposta"],
  ["Recommended host configuration", "Configurazione host consigliata"],
  ["Connect and install", "Connessione e installazione"],
  ["Hardware connection", "Collegamento hardware"],
  ["Network configuration", "Configurazione di rete"],
  ["Install the SDK", "Installazione di SDK"],
  ["Use the Camera SDK", "Usare Camera SDK"],
  ["Directory structure", "Struttura delle directory"],
  ["Development workflow", "Flusso di sviluppo"],
  ["Configure the project", "Configurazione del progetto"],
  ["Synchronous call flow", "Flusso di chiamata sincrono"],
  ["Asynchronous call flow", "Flusso di chiamata asincrono"],
  ["Calling requirements", "Requisiti per le chiamate"],
  ["Parameter types and corresponding APIs", "Tipi di parametri e API corrispondenti"],
  ["API preconditions", "Prerequisiti delle API"],
  ["Data types", "Tipi di dati"],
  ["API reference", "Riferimento API"],
  ["Find, connect and close the camera", "Individuare, connettere e chiudere la fotocamera"],
  ["Start streaming and close streaming", "Avviare e chiudere lo streaming"],
  ["Reading and setting camera parameters", "Lettura e impostazione dei parametri della fotocamera"],
  ["Save point cloud", "Salvare la nuvola di punti"],
  ["Special Controls", "Controlli speciali"],
  ["System and environment", "Sistema e ambiente"],
  ["Compatible systems and dependency versions", "Sistemi compatibili e versioni delle dipendenze"],
  ["Check the system version and application version", "Verificare la versione del sistema e dell'applicazione"],
  ["Check the system version", "Verificare la versione del sistema"],
  ["Check Cmake version", "Verificare la versione di CMake"],
  ["Check Gcc version", "Verificare la versione di GCC"],
  ["View Opencv version", "Visualizzare la versione di OpenCV"],
  ["Check Pcl version", "Verificare la versione di PCL"],
  ["View ROS version", "Visualizzare la versione di ROS"],
  ["Build a basic development environment", "Creare un ambiente di sviluppo di base"],
  ["Build optional development environment", "Creare un ambiente di sviluppo opzionale"],
  ["Install Cmake", "Installare CMake"],
  ["Install Gcc", "Installare GCC"],
  ["Prepare the sample code", "Preparare il codice di esempio"],
  ["Execute the installation script", "Eseguire lo script di installazione"],
  ["Sample code introduction", "Introduzione al codice di esempio"],
  ["Compile and run the samples", "Compilare ed eseguire gli esempi"],
  ["Sample code reference", "Riferimento al codice di esempio"],
  ["Appendix", "Appendice"],
  ["specified version installation method", "metodo di installazione di una versione specifica"],
  ["Install ROS", "Installare ROS"],
  ["How to create a new test package in Ros", "Come creare un nuovo pacchetto di test in ROS"],
  ["Install ROS2", "Installare ROS 2"],
  ["How to create a new test package in Ros2", "Come creare un nuovo pacchetto di test in ROS 2"],
  ["Recommended host configuration", "Configurazione host consigliata"],
  ["Operating system", "Sistema operativo"],
  ["Network adapter", "Scheda di rete"],
  ["Gigabit Ethernet or faster", "Ethernet Gigabit o superiore"],
  ["Four-core Cortex-A57 or equivalent and above", "Cortex-A57 a quattro core o equivalente e superiore"],
  ["4 GB or more", "4 GB o più"],
  ["Windows 7, Windows 10, or Windows 11; Ubuntu 16.04 or later", "Windows 7, Windows 10 o Windows 11; Ubuntu 16.04 o versione successiva"],
  ["The camera runs as a TCP Socket server and listens on port `5501` by default. Messages are text; ASCII is supported, and JSON encoding is recommended.", "La fotocamera funziona come server TCP Socket e ascolta sulla porta `5501` per impostazione predefinita. I messaggi sono testuali; ASCII è supportato e si consiglia la codifica JSON."],
  ["Use this protocol when a robot or PLC triggers a 3D vision task and reads the result returned by the camera.", "Usa questo protocollo quando un robot o un PLC avvia un'attività di visione 3D e legge il risultato restituito dalla fotocamera."],
  ["Send the following message to trigger a 3D vision task:", "Invia il messaggio seguente per avviare un'attività di visione 3D:"],
  ["After the camera finishes, it returns a JSON object.", "Al termine dell'elaborazione, la fotocamera restituisce un oggetto JSON."],
  ["Detection status.", "Stato del rilevamento."],
  ["Array of object poses.", "Array delle pose degli oggetti."],
  ["All values are `0` when detection fails.", "Tutti i valori sono `0` quando il rilevamento non riesce."],
  ["This guide is for developers integrating camera devices.", "Questa guida è destinata agli sviluppatori che integrano dispositivi camera."],
  ["The Camera SDK provides unified device-access and parameter-configuration APIs.", "Camera SDK fornisce API unificate per l'accesso al dispositivo e la configurazione dei parametri."],
  ["Examples and API descriptions are based on the SDK version shipped with the product.", "Gli esempi e le descrizioni delle API si basano sulla versione di SDK fornita con il prodotto."],
  ["The examples are intended as development guidance and may not cover every device or use case.", "Gli esempi servono come riferimento per lo sviluppo e potrebbero non coprire tutti i dispositivi o i casi d'uso."],
  ["The contents of the Camera SDK directory include the following images:", "La directory di Camera SDK contiene le immagini seguenti:"],
  ["For details, see the examples in `Sample` and the [Linux examples user guide]", "Per i dettagli, consulta gli esempi in `Sample` e il [manuale utente degli esempi Linux]"],
  ["Function: SDK interface function return value status code", "Funzione: codice di stato del valore restituito dalla funzione dell'interfaccia di SDK"],
  ["Function: data format.", "Funzione: formato dei dati."],
  ["Function: Device attribute information structure", "Funzione: struttura delle informazioni sugli attributi del dispositivo"],
  ["Function: device type", "Funzione: tipo di dispositivo"],
  ["Function: Image display information structure", "Funzione: struttura delle informazioni di visualizzazione dell'immagine"],
  ["Function: Data frame information structure", "Funzione: struttura delle informazioni del frame di dati"],
  ["Function: Various readable and writable parameters", "Funzione: vari parametri leggibili e scrivibili"],
  ["Function prototype:", "Prototipo della funzione:"],
  ["Function function:", "Funzione:"],
  ["Function parameters:", "Parametri della funzione:"],
  ["Return value:", "Valore restituito:"],
  ["Make sure the parameters passed in are valid", "Assicurati che i parametri passati siano validi"],
  ["Int data, this value is equal to LX\\_SUCCESS, indicating that the interface call is successful.", "Dato intero; questo valore è uguale a LX\\_SUCCESS e indica che la chiamata all'interfaccia è riuscita."],
  ["The following Linux systems are supported. The default program versions are listed below:", "Sono supportati i seguenti sistemi Linux. Di seguito sono elencate le versioni predefinite dei programmi:"],
  ["You need to update the installation list before installation:", "Prima dell'installazione è necessario aggiornare l'elenco dei pacchetti:"],
  ["The result is as follows:", "Il risultato è il seguente:"],
  ["Unzip the Lanxin-MRDVS file and enter the Lanxin-MRDVS folder", "Decomprimi il file Lanxin-MRDVS ed entra nella cartella Lanxin-MRDVS"],
  ["Right click to open the console", "Fai clic con il pulsante destro del mouse per aprire la console"],
  ["Execute install.sh script", "Esegui lo script install.sh"],
  ["Enter the /opt/ directory to check whether the installation is successful.", "Accedi alla directory /opt/ per verificare che l'installazione sia riuscita."],
  ["If the folder can be found, the installation is successful.", "Se la cartella è presente, l'installazione è riuscita."],
  ["If the installation fails, you need to manually add it to the opt directory.", "Se l'installazione non riesce, aggiungila manualmente alla directory opt."],
  ["At this point, the installation script has been completely executed!", "A questo punto lo script di installazione è stato eseguito completamente!"],
  ["Enter the Sample directory. The directory contents are as follows:", "Accedi alla directory Sample. Il contenuto della directory è il seguente:"],
  ["Different sample codes can be selected for testing and modification according to different needs.", "Puoi scegliere esempi diversi per i test e le modifiche in base alle esigenze."],
  ["The running process is as follows:", "Il flusso di esecuzione è il seguente:"],
  ["Open a terminal", "Apri un terminale"],
  ["Open another terminal", "Apri un altro terminale"],
  ["After successful execution", "Dopo l'esecuzione corretta"],
  ["The executable file is in the bin directory.", "Il file eseguibile si trova nella directory bin."],
  ["You can run it directly.", "Puoi eseguirlo direttamente."],
  ["First, install the compilation tools:", "Per prima cosa, installa gli strumenti di compilazione:"],
  ["Depending on the computer performance, compilation usually takes 30 seconds to 120 seconds.", "In base alle prestazioni del computer, la compilazione richiede in genere da 30 a 120 secondi."],
  ["Some warnings are due to version compatibility issues and do not need to be processed.", "Alcuni avvisi sono dovuti a problemi di compatibilità tra versioni e non richiedono interventi."],
  ["Run the following commands to source the environment and start a node", "Esegui i comandi seguenti per caricare l'ambiente e avviare un nodo"],
  ["From top to bottom, they are:", "Dall'alto verso il basso, sono:"],
  ["Each node cannot be enabled at the same time.", "Non è possibile abilitare contemporaneamente più nodi."],
  ["In this section, all codes and pseudocode will be divided into several parts.", "In questa sezione, tutto il codice e lo pseudocodice sono divisi in più parti."],
  ["Generally speaking, everything in a section belongs to the same file.", "In generale, tutto il contenuto di una sezione appartiene allo stesso file."],
  ["Detailed explanations are commented in the code.", "Le spiegazioni dettagliate sono riportate nei commenti del codice."],
  ["The messages are all in post mode.", "Tutti i messaggi usano il metodo POST."],
  ["Before sending, remember to change the IP to the server's IP, but do not modify the URL.", "Prima dell'invio, modifica l'IP con quello del server, ma non modificare l'URL."],
  ["The URL is hard-coded internally in the server.", "L'URL è codificato direttamente nel server."],
  ["The interface provided in the example is as follows:", "L'interfaccia fornita nell'esempio è la seguente:"],
  ["Please see the table below for other relevant instructions:", "Per altre istruzioni pertinenti, consulta la tabella seguente:"],
  ["All launch files", "Tutti i file launch"],
  ["Camera IP, stream configuration, working mode configuration, point cloud unit, etc.", "IP della fotocamera, configurazione dello stream, modalità operativa, unità della nuvola di punti e così via"],
  ["Recommended hardware configuration", "Configurazione hardware consigliata"],
  ["CPU details", "Dettagli della CPU"],
  ["Memory details", "Dettagli della memoria"],
  ["This appendix provides installation methods for some tools.", "Questa appendice fornisce metodi di installazione per alcuni strumenti."],
  ["There is no guarantee that every computer can be successfully installed through the methods shown in the appendix of this document.", "Non è garantito che ogni computer possa essere installato correttamente con i metodi illustrati nell'appendice di questo documento."],
  ["If you encounter problems not shown in this appendix, please search for solutions yourself.", "Se riscontri problemi non descritti in questa appendice, cerca autonomamente una soluzione."],
]);

const words = new Map(Object.entries({
  Overview:"Panoramica", overview:"panoramica", Message:"Messaggio", message:"messaggio", messages:"messaggi",
  Success:"Operazione riuscita", Failure:"Errore", Environment:"Ambiente", environment:"ambiente", setup:"configurazione",
  Configuration:"Configurazione", configuration:"configurazione", Configure:"Configura", configure:"configurare", configured:"configurato",
  Connect:"Connettere", connect:"connettere", connected:"connesso", connection:"collegamento", Install:"Installare", install:"installare", installed:"installato",
  Hardware:"Hardware", hardware:"hardware", Network:"Rete", network:"rete", Host:"Host", host:"host", System:"Sistema", system:"sistema", systems:"sistemi",
  Directory:"Directory", directory:"directory", directories:"directory", Folder:"Cartella", folder:"cartella", folders:"cartelle", File:"File", files:"file",
  Camera:"Fotocamera", camera:"fotocamera", Cameras:"Fotocamere", cameras:"fotocamere", Device:"Dispositivo", device:"dispositivo", devices:"dispositivi",
  product:"prodotto", products:"prodotti", model:"modello", models:"modelli", version:"versione", versions:"versioni", supported:"supportato", support:"supporto",
  SDK:"SDK", API:"API", APIs:"API", example:"esempio", examples:"esempi", Sample:"Esempio", sample:"esempio", samples:"esempi", guide:"guida", Guide:"Guida", reference:"riferimento",
  Read:"Leggere", read:"leggere", Reading:"Lettura", reading:"lettura", Write:"Scrivere", write:"scrivere", Writing:"Scrittura", writing:"scrittura",
  Set:"Impostare", set:"impostare", setting:"impostazione", settings:"impostazioni", Get:"Ottenere", get:"ottenere", Save:"Salvare", save:"salvare", Load:"Caricare", load:"caricare",
  Start:"Avviare", start:"avviare", Stop:"Interrompere", stop:"interrompere", Open:"Aprire", open:"aprire", Close:"Chiudere", close:"chiudere", Execute:"Eseguire", execute:"eseguire",
  return:"restituire", returned:"restituito", Return:"Restituito", result:"risultato", results:"risultati", value:"valore", values:"valori", data:"dati", information:"informazioni",
  field:"campo", fields:"campi", parameter:"parametro", parameters:"parametri", Function:"Funzione", function:"funzione", functions:"funzioni", command:"comando", commands:"comandi",
  type:"tipo", types:"tipi", format:"formato", status:"stato", code:"codice", codes:"codici", call:"chiamata", calls:"chiamate", calling:"chiamata", flow:"flusso", mode:"modalità",
  synchronous:"sincrono", asynchronous:"asincrono", stream:"stream", streaming:"streaming", frame:"frame", frames:"frame", image:"immagine", images:"immagini", intensity:"intensità", depth:"profondità",
  point:"punto", cloud:"nuvola", channel:"canale", channels:"canali", width:"larghezza", height:"altezza", offset:"offset", pixel:"pixel", pixels:"pixel", exposure:"esposizione", gain:"guadagno",
  minimum:"minimo", minimums:"minimi", maximum:"massimo", maximums:"massimi", lower:"inferiore", upper:"superiore", current:"corrente", default:"predefinito", recommended:"consigliato", required:"obbligatorio",
  available:"disponibile", unavailable:"non disponibile", successful:"riuscito", successfully:"correttamente", success:"riuscita", failure:"errore", failed:"non riuscito", error:"errore", errors:"errori",
  Warning:"Avviso", Note:"Nota", Info:"Informazioni", Tip:"Suggerimento", figure:"figura", figures:"figure", illustration:"illustrazione", illustrations:"illustrazioni", diagram:"diagramma", related:"correlato",
  process:"processo", steps:"passaggi", step:"passaggio", first:"primo", second:"secondo", third:"terzo", fourth:"quarto", then:"quindi", finally:"infine", before:"prima", after:"dopo", following:"seguente", below:"sotto", above:"sopra",
  contains:"contiene", contain:"contenere", includes:"include", include:"includere", provided:"fornito", provide:"fornire", provides:"fornisce", based:"basato", uses:"usa", using:"usando", used:"usato", allow:"consentire", allows:"consente", allowed:"consentito",
  ensure:"assicurarsi", ensures:"assicura", prevent:"impedire", preventing:"impedendo", need:"necessità", needs:"necessita", must:"deve", should:"dovrebbe", may:"può", can:"può", cannot:"non può", only:"solo", also:"anche", some:"alcuni", all:"tutti", each:"ogni", other:"altro", same:"stesso", different:"diverso", various:"vari",
  language:"linguaggio", languages:"linguaggi", project:"progetto", build:"compilare", building:"compilazione", compile:"compilare", compilation:"compilazione", run:"eseguire", running:"in esecuzione", runtime:"runtime", source:"sorgente", output:"output", input:"input",
  memory:"memoria", CPU:"CPU", processor:"processore", core:"core", cores:"core", bandwidth:"larghezza di banda", performance:"prestazioni", usage:"utilizzo", resource:"risorsa", resources:"risorse", versioning:"versionamento",
  installable:"installabile", package:"pacchetto", packages:"pacchetti", dependency:"dipendenza", dependencies:"dipendenze", tool:"strumento", tools:"strumenti", terminal:"terminale", console:"console", server:"server", service:"servizio", node:"nodo", nodes:"nodi", driver:"driver", drivers:"driver",
  launch:"launch", file:"file", directory:"directory", path:"percorso", address:"indirizzo", port:"porta", firewall:"firewall", commandline:"riga di comando", operation:"operazione", operations:"operazioni", action:"azione", trigger:"attivazione", task:"attività", tasks:"attività", object:"oggetto", objects:"oggetti", array:"array", number:"numero", numbers:"numeri",
  true:"vero", false:"falso", valid:"valido", invalid:"non valido", legal:"valido", illegal:"non valido", normal:"normale", normally:"normalmente", internal:"interno", external:"esterno", special:"speciale", common:"comune", basic:"base", optional:"opzionale", complete:"completo", detailed:"dettagliato", detail:"dettaglio", details:"dettagli",
  cameraSDK:"Camera SDK", depthmap:"mappa di profondità", pointcloud:"nuvola di punti", obstacle:"ostacolo", obstacles:"ostacoli", avoidance:"evitamento", pallet:"pallet", positioning:"posizionamento", localization:"localizzazione", algorithm:"algoritmo", algorithms:"algoritmi", firmware:"firmware", upgrade:"aggiornamento", update:"aggiornare", updated:"aggiornato",
  the:"il", The:"Il", a:"un", an:"un", and:"e", or:"o", of:"di", for:"per", to:"a", in:"in", with:"con", from:"da", as:"come", by:"da", on:"su", at:"a", into:"in", between:"tra", through:"tramite", about:"su", than:"di", is:"è", are:"sono", was:"era", were:"erano", be:"essere", this:"questo", that:"che", these:"questi", those:"quelli", it:"esso", its:"suo", you:"tu", your:"tuo", we:"noi", our:"nostro", not:"non", no:"nessun", more:"più", less:"meno", very:"molto", too:"troppo", both:"entrambi", each:"ogni", any:"qualsiasi", all:"tutti", when:"quando", where:"dove", how:"come", why:"perché", if:"se", whether:"se", first:"prima", last:"ultimo", next:"successivo", see:"consulta", shown:"mostrato", shows:"mostra", show:"mostrare", use:"usa", uses:"usa", used:"usato", using:"usando", please:"per favore", remember:"ricorda", keep:"mantieni", change:"modifica", changes:"modifiche", modify:"modificare", manually:"manualmente", directly:"direttamente", internally:"internamente", separately:"separatamente", usually:"di solito", generally:"in generale", normally:"normalmente", already:"già", still:"ancora", only:"solo", without:"senza", each:"ogni"
}));

const escaped = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const phrasePattern = new RegExp([...phrases.keys()].sort((a, b) => b.length - a.length).map(escaped).join("|"), "g");
const wordPattern = new RegExp(`\\b(${[...words.keys()].sort((a, b) => b.length - a.length).map(escaped).join("|")})\\b`, "g");

function translateText(text) {
  const slots = [];
  const keep = (value) => {
    const id = `___KEEP_${slots.length}___`;
    slots.push(value);
    return id;
  };
  let value = text;
  value = value.replace(/`[^`]*`|https?:\\/\\/[^\\s)]+|\\/images\\/[^\\s)]+|\\/videos\\/[^\\s)]+|\\/downloads\\/[^\\s)]+|\\/files\\/[^\\s)]+/g, keep);
  value = value.replace(phrasePattern, (match) => phrases.get(match));
  value = value.replace(wordPattern, (match) => words.get(match) ?? match);
  return value.replace(/___KEEP_(\\d+)___/g, (_, index) => slots[Number(index)]);
}

function translateComponentTags(line) {
  return line.replace(/<([A-Za-z][^>]*?)>/g, (tag) => {
    if (/^<\\/?[A-Za-z]/.test(tag) === false) return tag;
    return tag.replace(/(title|label|alt)=("[^"]*"|'[^']*')/g, (_, name, quoted) => {
      const quote = quoted[0];
      return `${name}=${quote}${translateText(quoted.slice(1, -1))}${quote}`;
    });
  });
}

for (const file of files) {
  const path = new URL(file, import.meta.url);
  const source = fs.readFileSync(path, "utf8").replace(/\\r\\n/g, "\\n");
  let inCode = false;
  const translated = source.split("\\n").map((line) => {
    if (/^```/.test(line.trim())) {
      inCode = !inCode;
      return line;
    }
    line = line.replace(/(\\]\\()\\/en\\//g, "$1/it/").replace(/(href=["'])\\/en\\//g, "$1/it/");
    if (inCode) {
      if (/^\\s*(?:#|\\/\\/|\\*|<!--)/.test(line) || /\\s+#\\s+/.test(line)) {
        return translateText(line);
      }
      return line;
    }
    return translateComponentTags(translateText(line));
  }).join("\\n");
  fs.writeFileSync(path, translated);
}

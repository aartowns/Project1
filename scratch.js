addEventListener('DOMContentLoaded', load)

let data = {
    playerName: "john smith", 
    characterName: "Wuffy The Vampire Werewolf", 
    level: 7,
    spells: [
        {
            name: 'fireball', 
            level: 1
        }
    ], 
    feats: [
        {
            name: 'Alert', 
            desc: 'Alert makes players less likely to be surprised.'
        }
    ]
}

let saveButton; 
let fileUploader; 
let contentViewer;

async function load(){
    saveButton = document.getElementById('saver');
    saveButton.addEventListener('click', ()=>{
        downloadData(JSON.stringify(data), 'character.txt')
    })
    fileUploader = document.getElementById('uploader'); 
    fileUploader.addEventListener('change', (ev)=>{
        const file = document.getElementById('uploader').files[0]; 
        const reader = new FileReader(); 
        function onReaderLoad(event){
            console.log(event.target.result); 
            data = JSON.parse(event.target.result);
            contentViewer.innerText = PrettyPrint(data); 
        }
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);

    })
    contentViewer = document.getElementById('dataviewer'); 
    contentViewer.innerText = PrettyPrint(data);
    console.log(saveButton, fileUploader, contentViewer)
}

function downloadData(data, filename){
    const blob = new Blob([data], {type: 'text/json'});
    if(window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveBlob(blob, filename)
    }
    else{
        const elem = window.document.createElement('a'); 
        elem.href = window.URL.createObjectURL(blob); 
        elem.download = filename; 
        document.body.appendChild(elem); 
        elem.click(); 
        document.body.removeChild(elem); 
    }
}



function PrettyPrint(obj){
    return JSON.stringify(obj, null, 2);
}
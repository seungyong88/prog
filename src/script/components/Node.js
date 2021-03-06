export default class Node {
    constructor({$target, dirType, data, onClick}) {
        this.data = data;
        this.dirType = dirType;
        this.nodes = document.createElement('article');
        this.nodes.className = 'Node';

        this.onClick = onClick;
        this.nodes.addEventListener('click', e => this.onClick(data));

        $target.appendChild(this.nodes);

        this.render();      
    }

    setState(data) {
        this.data = data;
    }
    
    render() {
        const { id, name, type } = this.data;
        this.nodes.innerHTML = '';

        if(this.dirType !== "root") {
            const prevMenu = document.createElement('div');
            prevMenu.className = 'Node prev-menu';
    
            const prevImage = document.createElement('img');
            prevImage.src="./assets/prev.png";
    
            prevMenu.appendChild(prevImage);

            this.nodes.appendChild(prevMenu);
        }

        if(type === "DIRECTORY") {
            const directory = document.createElement('div');
            directory.className = 'Node directory-menu';
            directory.id = id;

            const directoryImage = document.createElement('img');
            directoryImage.src="./assets/directory.png";

            const directoryName = document.createElement('div');
            directoryName.className = 'directory-name';
            directoryName.innerText = name;

            directory.appendChild(directoryImage);
            directory.appendChild(directoryName);

            this.nodes.appendChild(directory);
        }else{
            const file = document.createElement('div');
            file.className = 'Node file-menu';
            file.id = id;
    
            const fileImage = document.createElement('img');
            fileImage.src="./assets/file.png";
    
            const fileName = document.createElement('div');
            fileName.className = 'file-name';
            fileName.innerText = name;

            file.appendChild(fileImage);
            file.appendChild(fileName);

            this.nodes.appendChild(file);
        }

    }
}
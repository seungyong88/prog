import Node from "./Node.js";

export default class Nodes {
    constructor({$target, type, data, onClick}) {
        this.data = data;
        this.type = type;
        this.onClick = onClick;
        this.nodes = document.createElement('div');
        this.nodes.className = 'Nodes';
        $target.appendChild(this.nodes);

        this.render();      
    }

    render() {
        if(this.data == null) return;
        this.nodes.innerHTML = '';

        if(this.data.length > 0) {
            this.data.forEach(item => {
                new Node({$target: this.nodes, dirType: this.type, data: item, onClick: this.onClick});
            })
        }else{
        const noDataWrapper = document.createElement('div');
        noDataWrapper.className="no-data-wrapper";
        
        const noData = document.createElement('p');
        noData.className="no-data";
        noData.innerText = '데이터가 없습니다.';
        
        noDataWrapper.appendChild(noData);
        this.section.appendChild(noDataWrapper);
        }
    }
}

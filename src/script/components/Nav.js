export default class Nav {
    constructor({$target}) {
        this.nav = document.createElement('nav');
        this.nav.className = 'Breadcrumb';
        $target.appendChild(this.nav);

        this.render();
    }

    render() {
        this.nav.innerHTML = '';

        const rootMenu = document.createElement('div');
        rootMenu.className = 'root-menu';
        rootMenu.innerText = 'root';
    
        // const subMenu = document.createElement('div');
        // subMenu.className = 'sub-menu';
        // subMenu.innerText = '노란고양이';

        // randomBtn.addEventListener('click', e => this.searchRandomCats());
        // searchBox.addEventListener('keyup', e=> {
        //   if(e.keyCode == 13) {
        //     this.searchByKeyword(searchBox.value);
        //   }
        // })
    
        // this.recent.forEach(keyword => {
        //   const keywordLink = document.createElement('span');
        //   keywordLink.className = 'keyword-link';
        //   keywordLink.innerText = keyword;
    
        //   keywordLink.addEventListener('click', () => this.searchByKeyword(keyword));
    
        //   recentKeywords.appendChild(keywordLink);
        // })
    
        this.nav.appendChild(rootMenu);
        // this.nav.appendChild(subMenu);
    }
}

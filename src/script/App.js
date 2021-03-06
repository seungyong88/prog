import Nav from "./components/Nav.js";
import Nodes from "./components/Nodes.js";
import api from "../api/cats.js";

export default class App {
    constructor($target) {
        const type = "root";

        api.rootData().then(data => {
            const nav = new Nav({$target});
            const nodes = new Nodes({$target, type, data, 
                onClick: (data) => {
                    // api.fetchData();
                }
            });
        });
    }
}
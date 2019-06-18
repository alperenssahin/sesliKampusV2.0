'use strict';
// import {MainDesktop} from "./mainDesktop";
// import {MainMobile} from "./mainMobile"
const Router = window.ReactRouterDOM.BrowserRouter;
class Main extends React.Component {
    constructor(props) {
        super(props);
    }

        render() {
        let page;
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            page = <MainMobile/>;

        }else{
            page = <MainDesktop/>;

        }
        return(<Router>{page}</Router>);
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<Main/>, domContainer);
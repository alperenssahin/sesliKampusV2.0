'use strict';
// import {MainDesktop} from "./mainDesktop";
// import {MainMobile} from "./mainMobile"
class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        let page;
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            page = <MainMobile/>;

        }else{
            page = <MainDesktop/>;

        }
       return(page);
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(<LikeButton/>, domContainer);
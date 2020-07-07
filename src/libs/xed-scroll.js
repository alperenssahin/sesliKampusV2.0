export class XedScroll {
    static goto(y) {
        if(window.scrollAnimation || window.scrollAnimation === undefined){
            window.scrollAnimation = false;
            let timer = setInterval(() => {
                let dif = (-1)*(window.scrollY -y)/10;
                dif = Math.floor(dif);
                window.scrollTo(0, window.scrollY+dif);
                // console.log(dif,y,window.scrollY);
                if(dif === 0 || window.scrollY === 0){
                    window.scrollAnimation = true;
                    clearInterval(timer);
                }
            }, 10);
        }
    }
    static gotoX(x,dom) {
        if(window.scrollAnimation || window.scrollAnimation === undefined){
            window.scrollAnimation = false;
            window.scrollAnimateControl = 0;
            let timer = setInterval(() => {
                window.scrollAnimateControl++;
                let dif = (-1)*(dom.scrollLeft -x)/10;
                dif = Math.floor(dif);
                dom.scrollTo(dom.scrollLeft+dif,0);
                // console.log(dif,window.scrollAnimateControl);
                // console.log(dif,y,window.scrollY);
                if(dif === 0 || dom.scrollLeft === x || window.scrollAnimateControl > 50){
                    window.scrollAnimation = true;
                    clearInterval(timer);
                }
            }, 10);
        }
    }
    static gotoY(x,dom) {
        if(window.scrollAnimation || window.scrollAnimation === undefined){
            window.scrollAnimation = false;
            window.scrollAnimateControl = 0;
            let timer = setInterval(() => {
                window.scrollAnimateControl++;
                let dif = (-1)*(dom.scrollTop -x)/10;
                dif = Math.floor(dif);
                dom.scrollTo(0,dom.scrollTop+dif);
                // console.log(dif,window.scrollAnimateControl);
                // console.log(dif,y,window.scrollY);
                if(dif === 0 || dom.scrollTop === x || window.scrollAnimateControl > 50){
                    window.scrollAnimation = true;
                    clearInterval(timer);
                }
            }, 10);
        }
    }
}
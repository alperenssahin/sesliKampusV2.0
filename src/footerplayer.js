class FooterPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step1: '-',
            step2: '-',
            step3: '-',
            duration:'00:00',
            currentTime: '00:00',
            play:false,
            first:false,
            buffer:0,
            current:0,
            fullPage:false,
        }
    }

    componentDidMount() {
        this.play();
        this.setState({first:true});
        document.getElementById('play-pause').addEventListener('click',this.playPauseHandler.bind(this));
        document.getElementById('full-page-player').addEventListener('click',this.fullPageHandler.bind(this));
        document.getElementById('current-point').addEventListener('touchmove',this.currentPointHandler.bind(this));
        document.getElementById('process-b').addEventListener('touchstart',this.processClickHandler.bind(this));
    }
    componentWillUnmount(){
        document.getElementById('full-page-player').removeEventListener('click',this.fullPageHandler.bind(this));
        document.getElementById('play-pause').removeEventListener('click',this.playPauseHandler.bind(this));
        document.getElementById('current-point').removeEventListener('touchmove',this.currentPointHandler.bind(this));
        document.getElementById('process-b').removeEventListener('touchstart',this.processClickHandler.bind(this));

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.soundId !== this.props.soundId) {
            this.setState({first:true});
            this.play();
        }
    }

    play() {
        if (this.props.playing) {
            // console.log(this.props.soundId);
            firebase.database().ref('/sounds/' + this.props.soundId).once('value').then(s => {
                let data = s.val();
                firebase.database().ref(`/locations/step3/${data.location.step3}`).once('value').then(s => {
                    this.setState({step3: s.val().title});
                });
                firebase.database().ref(`/locations/step2/${data.location.step2}`).once('value').then(s => {
                    this.setState({step2: s.val().title});
                });
                firebase.database().ref(`/locations/step1/${data.location.step1}`).once('value').then(s => {
                    this.setState({step1: s.val().title});
                });
                this.setState({data: data});
            });
            firebase.database().ref('/sounds/'+this.props.soundId+'/soundPath').once('value').then(s=>{
                $('#myPlayer').attr('src','/'+s.val());
                let audio = document.getElementById('myPlayer');
                // console.log(audio.src , audio.duration);
                sd.npIndex = sd.keyList.indexOf(this. props.soundId);
                audio.onloadedmetadata = ()=>{
                    let duration =audio.duration;
                    this.setState({duration:this.secondTommss(duration)});
                };
                audio.ontimeupdate = () =>{
                    let duration = audio.currentTime;
                    this.setState({currentTime:this.secondTommss(duration)});
                    this.setState({current:this.processPercentage(audio.duration,audio.currentTime)});

                };
                audio.autoplay = true;
                audio.onplay = ()=>{
                    this.setState({play:true});
                };
                audio.onpause = () =>{
                    this.setState({play:false});
                };
                audio.onprogress = () =>{
                    if(audio.buffered.length >0){
                        this.setState({buffer:this.processPercentage(audio.duration,audio.buffered.end(0))});
                    }
                };
            });
        }
    }
    secondTommss(second){
        let min = second/60;
        if(min < 0) min = '00';
        else if(min < 10) min = '0'+min.toFixed(0);
        else min = min.toFixed(0);
        let sec = second%60;
        if(sec === 0) sec = '00';
        else if(sec < 10 ) sec = '0'+sec.toFixed(0);
        else sec =sec.toFixed(0);
        return  min +':'+sec;
    }
    playPauseHandler(){
        let audio = document.getElementById('myPlayer');
        if(!audio.paused){
            audio.pause();
        }
        else{
            audio.play();
        }
    }
    processPercentage(duration,current){
        return current*100/duration;
    }
    currentPointHandler(e){
        let audio = document.getElementById('myPlayer');

        let per = e.touches[0].clientX/window.innerWidth*100;
        let duration = audio.duration*per/100;
        audio.currentTime = duration;
    }
    processClickHandler(e){
        let audio = document.getElementById('myPlayer');
        let per = e.touches[0].clientX/window.innerWidth*100;
        let duration = audio.duration*per/100;
        audio.currentTime = duration;
    }
    fullPageHandler(){
        console.log('a');

        this.setState(state=>({fullPage:!state.fullPage}));
    }
    render() {
        let play_pause;
        if(this.state.play){
            play_pause = 'url("/symbols/pauseDeg.png")';
        }else{
            play_pause = 'url("/symbols/playDeg.png")';
        }

        let nextSound,prevSound;

        if(sd.npIndex === 0){
            prevSound = sd.keyList[0];
            nextSound = sd.keyList[1];
        }else if(sd.npIndex === sd.keyList.length-1){
            nextSound = sd.keyList[sd.keyList.length -1];
            prevSound = sd.keyList[sd.keyList.length -2];
        }else{
            nextSound = sd.keyList[sd.npIndex+1];
            prevSound = sd.keyList[sd.npIndex-1];
        }
        let fullPage;
        if(this.state.fullPage){
            $('.footer-player-inside').innerHeight(window.innerHeight-40);
            $('.footer.container').innerHeight(window.innerHeight-40);
            $('#full-page-player').css('transform','rotate(180deg)');
            $('#full-page-player').css('margin-top','15px');
            $('.step.locations').css('font-size','14px');
            $('.step.material-icons').css('font-size','16px');
            $('.footer-player.outside').innerHeight(window.innerHeight-90);

            fullPage = <FullPagePlayer/>;
        }else{
            $('.footer-player-inside').innerHeight(132);
            $('.footer.container').innerHeight(200);
            $('#full-page-player').css('transform','rotate(0deg)');
            $('#full-page-player').css('margin-top','0px');
            $('.step.locations').css('font-size','10px');
            $('.step.material-icons').css('font-size','12px');
            $('.footer-player.outside').innerHeight(152);
            fullPage = null;
        }
        return (
            <div className={"footer-player-container"}>
                <div className={"full-page-player-button"}>
                    <div className="full-page icon" id={"full-page-player"}>
                    </div>
                </div>
                <div className={"footer-player-inside"}>
                    <div className={"footer-player locations"}>
                        <div className={" locations step step1"}>{this.state.step1}</div>
                        <i className="material-icons step ">
                            keyboard_arrow_right
                        </i>
                        <div className={" locations step step2"}>{this.state.step2}</div>
                        <i className="material-icons step ">
                            keyboard_arrow_right
                        </i>
                        <div className={" locations step step3"}>{this.state.step3}</div>

                    </div>
                    <div className={"full-page-container"}>{fullPage}</div>
                    <div className={"footer-player process-bar"} id={"process-b"}>
                        <div className={"process-bar buffer"} style={{width:this.state.buffer+'%'}}>
                        <div className={"process-bar current"} style={{width:this.state.current+'%'}}>
                            <div className={"current current-point"} id={"current-point"}>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className={"footer-player time-section"}>
                        <div className={"time-section current"}>{this.state.currentTime}</div>
                        <div className={"time-section remaining"}>{this.state.duration}</div>
                    </div>
                    <div className={"footer-player controller"}>
                        <Link to={"/now/"+prevSound}><div className={"controller prev"} style={{background: 'url("/symbols/prevOne.png")'}}> </div></Link>
                        <div className={"controller play"} id={"play-pause"}
                             style={{backgroundImage: play_pause}}> </div>
                        <Link to={"/now/"+nextSound}> <div className={"controller next"} style={{background: 'url("/symbols/nextOne.png")'}}> </div></Link>
                    </div>
                </div>
            </div>

        );
    }

}
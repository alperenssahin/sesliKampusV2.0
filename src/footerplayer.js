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
            first:true,
            buffer:0,
            current:0,
        }
    }

    componentDidMount() {
        this.play();
        document.getElementById('play-pause').addEventListener('click',this.playPauseHandler.bind());
        document.getElementById('current-point').addEventListener('touchmove',this.currentPointHandler.bind());
        document.getElementById('process-b').addEventListener('touchstart',this.processClickHandler.bind());
    }
    componentWillUnmount(){
        document.getElementById('play-pause').removeEventListener('click',this.playPauseHandler.bind());
        document.getElementById('current-point').removeEventListener('touchmove',this.currentPointHandler.bind());
        document.getElementById('process-b').removeEventListener('touchstart',this.processClickHandler.bind());

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
                if(this.state.first){
                    audio.play();
                    this.setState({first:false});
                }
                audio.onloadedmetadata = ()=>{
                    let duration =audio.duration;
                    this.setState({duration:this.secondTommss(duration)});
                };
                audio.ontimeupdate = () =>{
                    let duration = audio.currentTime;
                    this.setState({currentTime:this.secondTommss(duration)});
                    this.setState({current:this.processPercentage(audio.duration,audio.currentTime)});

                };
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
    render() {
        let play_pause;
        if(this.state.play){
            play_pause = 'url("/symbols/pauseDeg.png")';
        }else{
            play_pause = 'url("/symbols/playDeg.png")';
        }
        return (
            <div className={"footer-player-container"}>
                <div className={"full-page-player-button"}>
                    <div className="full-page icon">

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
                        <div className={"controller prev"} style={{background: 'url("/symbols/prevOne.png")'}}> </div>
                        <div className={"controller play"} id={"play-pause"}
                             style={{backgroundImage: play_pause}}> </div>
                        <div className={"controller next"} style={{background: 'url("/symbols/nextOne.png")'}}> </div>
                    </div>
                </div>
            </div>

        );
    }

}
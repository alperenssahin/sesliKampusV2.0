const Route = window.ReactRouterDOM.Route;
const Link = window.ReactRouterDOM.Link;
class MainMobile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.resize();
        window.addEventListener('resize',this.resize.bind());

    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.resize.bind());

    }
    mainPage() {
        return(<MainPage/>);
        //database okunur
    }
    mainPagePlaying({match}){
        return(<MainPage playing={true} soundId={match.params.id}/>);

    }
    resize(){
        $('.mobile.container').innerHeight(window.innerHeight);
        $('#root').innerHeight(window.innerHeight);
        $('.filter').innerHeight(window.innerHeight);
        $('.mobile.main-container').innerHeight(window.innerHeight-270);
        $('.soundList.container').innerHeight(window.innerHeight-305);
    }
    render() {
        return (<div className="mobile container" id="container-box">
                <div className="filter">
                    <audio id="myPlayer" src="">
                    </audio>
                    {/*<div id={"bug"} style={{color:'#fff'}}>a</div>*/}
                    <Header/>
                    <div className={"mobile main-container"}>
                    <Route exact path="/" component={this.mainPage}/>
                    <Route exact path="/now/:id" component={this.mainPagePlaying}/>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    }}


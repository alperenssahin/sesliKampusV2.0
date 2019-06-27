const Route = window.ReactRouterDOM.Route;
const Link = window.ReactRouterDOM.Link;
const Redirect = window.ReactRouterDOM.Redirect;
class MainMobile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize.bind());

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize.bind());

    }

    mainPage() {
        return (<MainPage/>);
        //database okunur
    }

    mainPagePlaying({match}) {
        return (<MainPage playing={true} soundId={match.params.id}/>);

    }

    resize() {
        $('.mobile.container').innerHeight(window.innerHeight);
        $('#root').innerHeight(window.innerHeight);
        $('.filter').innerHeight(window.innerHeight);
        $('.mobile.main-container').innerHeight(window.innerHeight - 270);
        $('.footer-player.outside').innerHeight(152);
        if (window.location.origin + '/' === window.location.href) {
            $('.soundList.container').innerHeight(window.innerHeight - 150);
        } else {
            $('.soundList.container').innerHeight(window.innerHeight - 305);
        }


    }

    filter({match}) {
            return (<Filter text={'filtrele'} type={match.params.type}/>);
    }

    render() {
        return (<div className="mobile container" id="container-box">
                <div className="filter">
                    <audio id="myPlayer" src="">
                    </audio>
                    {/*<div id={"bug"} style={{color:'#fff'}}>a</div>*/}
                    <Header/>
                    <div className={"mobile main-container"}>
                        <Route path={"f/:type"} component={this.filter}/>
                        <Route exact path="/" component={this.mainPage}/>
                        <Route path="/now/:id" component={this.mainPagePlaying}/>
                    </div>

                    <Footer/>
                </div>
            </div>
        );
    }
}


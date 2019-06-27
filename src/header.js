class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.getElementById('main-logo').addEventListener('click', this.clickHandler.bind());
    }
    componentWillUnmount(){
        document.getElementById('main-logo').removeEventListener('click',this.clickHandler.bind());
    }
    clickHandler(){
        window.location = 'http://'+window.location.host;
    }
    header({match}){
        if(match.params.type === 'filter'){
            return 'filtrele';
        }else{
            return 'sesli kampüs';
        }
    }
    render() {
        return (<div className="header container">
            <div className="inside header">
                <div className="header left">
                    <img className="logo" src="/symbols/logoBig.png" id={"main-logo"}/>
                </div>
                <div className="header mid" id={"header-title"}>
                    <Route path={"*/:type"} component={this.header}/>
                    <Route exact path={"/"} component={this.header}/>
                </div>
                <div className="header left"><center><i className="material-icons mono search">
                    search
                </i><div className="search text mono">ara</div></center></div>
            </div>

        </div>);
    }
}
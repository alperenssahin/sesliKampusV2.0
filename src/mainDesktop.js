 class MainDesktop extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(<div className="desktop container">
            <div className="filter">
            <center>
                <img className="logo desktop" src="symbols/logoBig.png"/>
            <h1>Sesli Kampüs</h1>
            <h2>Mobil cihazınızla tekrar deneyin</h2>
                <img className="qrcode desktop" src="symbols/qrcode.png"/>
            </center></div>
        </div>);
    }
}
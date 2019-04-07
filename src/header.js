class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="header container">
            <div className="inside header">
                <div className="header left">
                    <img className="logo" src="symbols/logoBig.png"/>
                </div>
                <div className="header mid">sesli kampüs</div>
                <div className="header left"><center><i className="material-icons mono search">
                    search
                </i><div className="search text mono">Ara</div></center></div>
            </div>

        </div>);
    }
}
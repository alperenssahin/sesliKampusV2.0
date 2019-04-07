class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="footer container">
            <div className="footer inside">
                <div className="footer menu" id="filter">
                    <center>
                        <i className="material-icons">
                            filter_list
                        </i>
                        <div className="footer menu text">filtrele</div>
                    </center>
                </div>
                <div className="footer marker text"> | </div>
                <div className="footer menu" id="sort">
                    <center>
                        <i className="material-icons">
                            swap_vert
                        </i>
                        <div className="footer menu text">sırala</div>
                    </center>
                </div>
                <div className="footer marker text"> | </div>

                <div className="footer menu" id="map">
                    <center>
                        <i className="material-icons">
                            map
                        </i>
                        <div className="footer menu text">harita</div>
                    </center>
                </div>
                <div className="footer marker text"> | </div>

                <div className="footer menu" id="profil">
                    <center>
                        <i className="material-icons">
                            account_circle
                        </i>
                        <div className="footer menu text">profil</div>
                    </center>
                </div>
                <div className="footer marker text"> | </div>

                <div className="footer menu" id="sounds">
                    <center>
                        <i className="material-icons">
                            list
                        </i>
                        <div className="footer menu text">sesler</div>
                    </center>
                </div>
            </div>
        </div>);
    }
}
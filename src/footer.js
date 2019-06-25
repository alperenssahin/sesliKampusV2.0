class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    footerPlayer() {
        return(<FooterPlayer playing={false}/>);
    }
    footerPlayerPlaying({match}){
        return(<FooterPlayer playing={true} soundId={match.params.id}/>);
    }
    render() {
        return (<div className="footer container">
            <Route exact path={'/'} component={this.footerPlayer}/>
            <Route exact path={'/now/:id'} component={this.footerPlayerPlaying}/>
            <div className={"footer-inside container"}>
                <div className="footer inside">
                    <div></div>
                    <div className="footer menu" id="filter">
                        <center>
                            <i className="material-icons">
                                filter_list
                            </i>
                            <div className="footer menu text">filtrele</div>
                        </center>
                    </div>
                    <div className="footer marker text"> |</div>
                    <div className="footer menu" id="sort">
                        <center>
                            <i className="material-icons">
                                swap_vert
                            </i>
                            <div className="footer menu text">sırala</div>
                        </center>
                    </div>
                    <div className="footer marker text"> |</div>

                    <div className="footer menu" id="map">
                        <center>
                            <i className="material-icons">
                                map
                            </i>
                            <div className="footer menu text">harita</div>
                        </center>
                    </div>
                    <div className="footer marker text"> |</div>

                    <div className="footer menu" id="profil">
                        <center>
                            <i className="material-icons">
                                account_circle
                            </i>
                            <div className="footer menu text">profil</div>
                        </center>
                    </div>
                    <div className="footer marker text"> |</div>

                    <div className="footer menu" id="sounds">
                        <center>
                            <i className="material-icons">
                                list
                            </i>
                            <div className="footer menu text">sesler</div>
                        </center>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>);
    }
}
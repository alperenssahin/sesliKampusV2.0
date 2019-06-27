

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: <Loading height={69}/>}
    }

    componentDidMount() {
        let mb = new MainMobile;
        mb.resize();
        let list = [];
        firebase.database().ref('/sounds').limitToLast(10).once('value').then(s => {
            //todo:for içine sokulmadan sıralamalar yada filtreler değerlendirilir
            sd.keyList = msort(s.val());
            sd.data = s.val();
            for (let key of sd.keyList) {
                list.push(<Link to={"/now/" + key} clasName={"list-element-link"}><ListElement data={s.val()[key]} soundKey={key}/></Link>);
            }
            this.setState({list: list});
        })
    }

    render() {
        return (<div className={"soundList out"}>
            <div className={"soundList filter-title"}> En yeniler</div>
            <div className={"soundList container"}>
                {this.state.list}
            </div>
        </div>)
    }
}

class ListElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {step1: null, step2: null, step3: null};
    }

    componentDidMount() {
        firebase.database().ref(`/locations/step3/${this.props.data.location.step3}`).once('value').then(s => {
            this.setState({step3: s.val().title});
        });
        firebase.database().ref(`/locations/step2/${this.props.data.location.step2}`).once('value').then(s => {
            this.setState({step2: s.val().title});
        });
        firebase.database().ref(`/locations/step1/${this.props.data.location.step1}`).once('value').then(s => {
            this.setState({step1: s.val().title});
        });
    }

    render() {
        // console.log(this.props.data);
        return (<div className={"list-element container"}>
            <div className={"list-element photo"}>
            </div>
            <div className={"list-element information"}>
                <div className={"list-element title"}>{this.state.step3}</div>
                <div className={"list-element date-time"}>
                    <div className={"list-element date"}>{this.props.data.date}</div>
                    <div className={"list-element time"}>{this.props.data.time}</div>
                </div>
                <div className={"list-element tag"}>{this.props.data.tag}</div>
            </div>
        </div>);
    }

}

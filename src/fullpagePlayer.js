class FullPagePlayer extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let pdc = $('.full-page-content');
        pdc.innerHeight(window.innerHeight-250);
        pdc.innerWidth(pdc.innerHeight() * 9 / 16);
    }

    render() {
        return (
            <div className={"full-page-container-inside"}>
                <div className={"full-page-info-box"}> </div>
                <div className={"full-page-content"}>
                    <div className={"full-page-top"}>

                    </div>
                    <div className={"full-page-info active"}> </div>
                </div>
            </div>
        );
    }

}
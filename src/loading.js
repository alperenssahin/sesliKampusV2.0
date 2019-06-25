class Loading extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className={"loading-container"} style={{height:this.props.height + 'vh'}}>
                <div className="lds-default loading-inside">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}
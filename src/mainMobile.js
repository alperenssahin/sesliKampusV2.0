const Route = window.ReactRouterDOM.Route;

class MainMobile extends React.Component {
    constructor(props) {
        super(props);
    }


    mainPage() {
        console.log("hello");
        return(<div style={{color:"white"}}>helloworld</div>);
    }

    render() {
        return (<div className="mobile container" id="container-box">
                <div className="filter">
                    <Header/>
                    <div style={{color:"white"}}>helloworld</div>
                    <Route  path="/sounds" component={this.mainPage}/>

                    <Footer/>
                </div>
            </div>
        );
    }}


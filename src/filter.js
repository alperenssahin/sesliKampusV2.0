class Filter extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
    }
    render() {
        let content;

        if (this.props.type === 'filter') {
            let timeOptions =[<option value={"null"}>-</option>];
            for(let i = 0; i<24; i++){
                let time1,time2,val1,val2;
                if(i<10){
                    time1 = '0'+i+':00';
                    time2 = '0'+i+':30';
                    val1 = '0'+i+'00';
                    val2 = '0'+i+'30';
                }else{
                    time1 = i+':00';
                    time2 = i+':30';
                    val1 = i+'00';
                    val2 = i+'30';
                }
                timeOptions.push(<option value={val1}>{time1}</option>);
                timeOptions.push(<option value={val2}>{time2}</option>);
            }
            let to = [];
            let tagsOptions=[];
            let tagList = '';
            for(let key in sd.keyList){
                tagList += sd.data[key].tag;
                console.log(tagList);

            }
            for(let tag of tagList.split('#')){
                if(to.indexOf(tag) === -1 && tag !== ''){
                    to.push(tag);
                    tagsOptions.push(<option value={tag}>{tag}</option>);
                }
            }

            content = <div className={"inside-content-filter"}>
                <div className={"content-container"}>
                    <div className={"active-filters-container filter-box"}>
                        <div className={"active-text filter-text"}>Aktif Filtreler</div>
                        <div className={"active-filters box-content"}>

                        </div>
                    </div>
                    <div className={"filter-year filter-box"}>
                        <div className={"filter-year filter-text"}>Tarih</div>
                        <div className={"filter-box-content box-content"}>
                            <div className={"filter-year-selector start container"}>
                                <select className={"filter-selector start select"}>
                                    <option value={"null"}>-</option>
                                    <option value={"2019"}>2018</option></select>
                            </div>/
                            <div className={"filter-year-selector finish container"}>
                                <select className={"filter-selector finish select"}>
                                    <option value={"null"}>-</option>
                                    <option value={"2019"}>2019</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"filter-space filter-box"}>
                        <div className={"filter-space filter-text"}>Mekan</div>
                        <div className={"filter-box-content box-content"}>
                            <div className={"filter-space-selector inside"}>
                                <input type="checkbox" id="filter-inside" className={"space"} value="inside"/>
                                <label htmlFor="filter-inside">İç Mekan</label>
                            </div> &nbsp;
                            <div className={"filter-space-selector outside"}>
                                <input type="checkbox" id="filter-outside" className={"space"} value="outside"/>
                                    <label htmlFor="filter-outside">Dış Mekan</label>
                            </div>
                        </div>
                    </div>
                    <div className={"filter-time filter-box"}>
                        <div className={"filter-time filter-text"}>Saat</div>
                        <div className={"filter-box-content box-content"}>
                            <div className={"filter-time-selector start container"}>
                                <select className={"filter-selector start select"}>
                                    {timeOptions}
                                </select>
                            </div>/
                            <div className={"filter-time-selector finish container"}>
                                <select className={"filter-selector finish select"}>
                                    {timeOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={"filter-tag filter-box"}>
                        <div className={"filter-tag filter-text"}>Etiket</div>
                        <div className={"filter-tag-content box-content"}>
                            <div className={"filter-tag-selector"}>
                                <select className={"filter-tag-selector select"}>
                                    {tagsOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        }

        return (
            <div className={"filter-container"}>
                <div className={"filter-inside-container"}>
                    {content}
                    <div className={"filter-submit"}>{this.props.text}</div>
                </div>
            </div>
        );
    }

}
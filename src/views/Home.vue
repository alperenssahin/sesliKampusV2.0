<template>
    <div class="device-box">
        <audio id="myPlayer" style="display: none"></audio>
        <div class="desktop">
            foto
        </div>
        <div class="seslikampus">
            <Header></Header>
            <div class="sort-info container-row" v-bind:class="{active:filterToggle}" role="button" aria-labelledby="filter-description" v-on:click="filterToggle = true">
                <span
                    class="material-icons">
            filter_list
                </span>
                <span id="filter-description">Filtre Uygula <div class="filterCount">{{filterList.length}}</div></span>

            </div>
            <div class="listed-sound">{{activeListLength}} ses listeleniyor.</div>
            <div class="filter-box" v-if="filterToggle">
               <FilterBox v-bind:close-handler="this.filterClose" v-bind:active-filters="filterList" v-bind:active-sound="activeListLength" ></FilterBox>
            </div>
            <Main v-bind:list="soundFilter()" id="main-list" v-bind:click-handler="this.activeSoundHandler"></Main>
            <Footer v-bind:active-sound="activeSound" v-bind:active-sound-handler="activeSoundHandlerAsIndex"></Footer>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    import Header from "@/components/Header";
    import Main from "@/components/Main";
    import Footer from "@/components/Footer";
    import FilterBox from "@/components/FilterBox";
    import {XedScroll} from "@/libs/xed-scroll";

    export default {
        name: 'Home',
        components: {
            FilterBox,
            Footer,
            Main,
            Header
        }, created() {
            if(!window.downloaded){
                window.db.ref("/sounds").once("value").then(s => {
                    for (let key in s.val()) {
                        let obj = s.val()[key];
                        obj.soundId = key;
                        obj.isActive = false;
                        this.$data.list.push(obj);
                    }
                    let rindex = Math.floor(Math.random()*this.$data.list.length-1);
                    this.activeSoundHandler(this.$data.list[rindex],rindex);
                    window.downloaded = true;
                });
            }
        },
        methods: {
            activeSoundHandler: function(sound){
                let index = this.$data.activeList.indexOf(sound);
                if(index === -1) return;
                try{
                    XedScroll.gotoY(document.getElementById(sound.soundId).offsetTop-180,document.getElementById("main-list"));
                }catch (e) {
                    console.log(e);
                }
                if(this.$data.activeSound) this.$data.activeSound.isActive = false;
                this.$data.activeSound = sound;
                this.$data.activeSound.isActive = true;
                if(index === 0){
                    this.$data.activeSound.prev = this.$data.activeList.length-1;
                    this.$data.activeSound.activeIndex = index;
                    this.$data.activeSound.next = 1;
                }else if(index === this.$data.activeList.length-1){
                    this.$data.activeSound.prev = index-1;
                    this.$data.activeSound.activeIndex = index;
                    this.$data.activeSound.next = 0;
                }else{
                    this.$data.activeSound.prev = index-1;
                    this.$data.activeSound.activeIndex = index;
                    this.$data.activeSound.next = index+1;
                }
            },
            activeSoundHandlerAsIndex:function(index){
                this.activeSoundHandler(this.$data.activeList[index]);
            },
            soundFilter: function () {
                let array = [...this.$data.list];
                array.sort((a, b) => {
                    var nameA = a.orderTitle.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.orderTitle.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    // names must be equal
                    return 0;
                });
                for (let filter of this.$data.filterList) {
                    if(filter.relatedAttribute === "location.step3"){
                        array = array.filter(s=>filter.relatedValues.includes(s.location.step3));
                    }
                    if(filter.relatedAttribute === "date"){
                        let a = filter.relatedValues[0].split("-").map(s=>Number(s));
                        let b = filter.relatedValues[1].split("-").map(s=>Number(s));
                        array = array.filter(s=>this.isInInterval(s.date,a,b,2,0,"."));
                        array = array.filter(s=>this.isInInterval(s.date,a,b,1,1,"."));
                        array = array.filter(s=>this.isInInterval(s.date,a,b,0,2,"."));
                    }
                    if(filter.relatedAttribute === "time"){
                        let a = filter.relatedValues[0].split(":").map(s=>Number(s));
                        let b = filter.relatedValues[1].split(":").map(s=>Number(s));
                        array = array.filter(s=>this.isInInterval(s.time,a,b,0,0,":"));
                        array = array.filter(s=>this.isInInterval(s.time,a,b,1,1,":"));
                    }
                }
                this.$data.activeListLength = array.length;
                this.$data.activeList = array;
                return array;
            },
            isInInterval:function isInInterval(data,a,b,index1,index2,token){
                let d = Number(data.split(token)[index1])
                return d >=a[index2] && d <= b[index2]
            },
            locationDownloader: async function (step, id) {
                return (await window.db.ref(`/locations/${step}/${id}`).once("value")).val().title;
            },
            filterClose:function () {
                this.$data.filterToggle = false;
            },
        }, data: function () {
            return {
                activeListLength:0,
                filterToggle:false,
                activeSound: null,
                indexes:{
                    activeIndex:0,
                    next:1,
                    prev:0,
                },
                activeList:[],
                filterList: [],
                list: [],
            }
        }
    }
</script>
<style scoped>
    div.seslikampus {
        display: grid;
        align-content: start;
    }

    .seslikampus footer {
        /*position: sticky;*/
        height: fit-content;
        display: grid;
        align-content: center;
        z-index: 50;
        /*bottom: 0;*/
        /*height: fit-content;*/

    }

    .seslikampus header {
        position: sticky;
        top: 0;
        height: 8vh;
        z-index: 40;
        background-color: black;
    }

    .device-box .desktop {
        display: none;
    }

    .device-box {
        display: grid;
        grid-template-columns: 1fr;
        height: 100vh;
        width: 100vw;
    }

    .sort-info {
        color: #444;
        max-height: 3em;
        font-size: 1em;
        margin-bottom: 10px;
        margin-top: 10px;
        display: flex;
        border-radius: 4px;
        background-color: #fbae17;
        width: fit-content;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 10px;
        padding-left: 10px;
    }
    .sort-info.active{
        background: rgb(147,39,143);
        background: linear-gradient(90deg, rgba(147,39,143,1) 0%, rgba(241,87,36,1) 100%);
        color: #cccccc;
    }
    .sort-info span {
        font-weight: bolder;
        /*margin-right: 10px;*/
    }
    .filter-box{
        position: absolute;
        z-index: 99;
        width: 100vw;
        height: 100vh;
        background-color: rgba(68, 68, 68, 0.50);
    }
    #filter-description{
        display: flex;
    }

    div.filterCount{
        display: grid;
        align-content: center;
        text-align: center;
        background-color: #f15724;
        color: white;
        border-radius: 20px;
        width: 20px;
        height: 20px;
        font-size: 0.8em;
        margin-top: 2px;
        margin-left: 10px;
    }

    .listed-sound{
        margin-left: 10px;
        margin-bottom: 10px;
        color: #ccc;
        font-size: 0.8em;
    }

    @media only screen and (min-width: 720px) {

    }
</style>

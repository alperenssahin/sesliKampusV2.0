<template>
    <div class="player-box" v-bind:class="{full:isFullPage}" v-on:mousemove="currentPointHandler">
        <div class="full-page-toggle footer" v-bind:class="{full:isFullPage}" role="button"
             aria-labelledby="full-page-description" v-on:click="fullPageClickHandler">
            <span class="material-icons" v-if="!isFullPage">
                keyboard_arrow_up
            </span>
            <span class="description" id="full-page-description">{{isFullPage?"Oynatıcıyı Daralt":'Oynatıcıyı Genişlet'}}</span>
            <span class="material-icons" v-if="isFullPage">
                keyboard_arrow_down
            </span>
        </div>

        <div class="location">
            <span class="location-item first">{{activeSound? loc1:"---"}}</span><span class="material-icons seperator">
keyboard_arrow_right
</span>
            <span class="location-item">{{activeSound? loc2:"---"}}</span> <span class="material-icons seperator">
keyboard_arrow_right
</span>
            <span class="location-item last">{{activeSound?loc3:"---"}}</span>
        </div>
        <div class="full-page-area" v-bind:class="{active:isFullPage}">
            <div class="photo-area">
                <img v-if="activeSound" v-bind:src="activeSound?`/images/${activeSound.imagePath}`:''"
                     v-bind:alt="activeSound?activeSound.alt:'Bir zamanlar galatasarayda tanitim kapagi'">
            </div>
        </div>
        <div class="process-bar" v-on:touchstart="processClickHandler" v-on:click="processClickHandler">
            <div class="current-bar load" v-bind:style="{width:loadProgress+'%'}">
                <div class="current-bar" v-bind:style="{width:progress+'%'}">
                    <div class="pointer" role="button" v-on:touchmove="currentPointHandler"
                         v-on:mousedown="isDrag = true"></div>
                </div>
            </div>
        </div>
        <div class="duration">
            <span class=" duration-item current-dur">{{currentTime}}</span>
            <span class="duration-item total-dur">{{duration}}</span>
        </div>

        <div class="controller-container">
            <div class="controller">
                <div class="player-button-box">
                    <span class="material-icons shuffle controller-button" aria-labelledby="shuffle-description" role="button" v-bind:class="{active:isShuffle}"
                          v-on:click="shuffleHandler">
                        shuffle
                   </span>
                    <span class="player-button-description" id="shuffle-description">Karışık Dinle</span>
                </div>
                <div class="player-button-box">
                    <span class="material-icons prev controller-button" aria-labelledby="prev-description" role="button"
                          v-on:click="activeSoundHandler(activeSound?activeSound.prev:0)">
                    skip_previous
                     </span>
                    <span class="player-button-description" id="prev-description">Önceki Ses</span>
                </div>
                <div class="player-button-box">
                    <span class="material-icons play-pause controller-button" aria-labelledby="play-description" role="button" v-on:click="playPauseHandler">
                    {{isPlay?"pause":"play_arrow"}}
                    </span>
                    <span class="player-button-description" id="play-description"> {{isPlay?"Durdur":"Dinle"}}</span>

                </div>
                <div class="player-button-box">
                    <span class="material-icons next controller-button"  aria-labelledby="next-description" role="button"
                          v-on:click="activeSoundHandler(activeSound?activeSound.next:1)">
                    skip_next
                    </span>
                    <span class="player-button-description" id="next-description">Sıradaki Ses</span>

                </div>
                <div class="player-button-box">
                    <span class="material-icons replay controller-button" aria-labelledby="replay-description" v-bind:class="{active:isReplay}"
                          role="button" v-on:click="replayHandler">
                        replay
                   </span>
                    <span class="player-button-description" id="replay-description">Tekrar Dinle</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Player",
        props: {
            activeSound: Object,
            activeSoundHandler: Function,
        },
        mounted() {
            document.addEventListener("mouseup", () => {
                this.$data.isDrag = false;
            })
            let mp = document.getElementById("myPlayer");
            mp.autoplay = true;
            mp.onplay = () => {
                if (this.$props.activeSound) {
                    this.$router.replace({name:"Home",query:{now:this.$props.activeSound.soundId}});
                    this.$data.isPlay = true;
                }
            }
            mp.onpause = () => {
                if (this.$props.activeSound) {
                    this.$data.isPlay = false;
                }
            }
            mp.onprogress = () => {
                if (this.$props.activeSound) {
                    if (mp.buffered.length > 0) {
                        this.$data.loadProgress = this.processPercentage(mp.duration, mp.buffered.end(0));
                    }
                }
            }
            mp.onloadedmetadata = () => {
                if (this.$props.activeSound) {
                    this.$data.duration = this.timeAdapter(mp.duration);
                }
            }
            mp.ontimeupdate = () => {
                if (this.$props.activeSound) {
                    this.$data.currentTime = this.timeAdapter(mp.currentTime);
                    this.$data.progress = this.processPercentage(mp.duration, mp.currentTime);
                }

            }
            mp.onended = () => {
                if (this.$props.activeSound) {
                    window.db.ref(`/sounds/${this.$props.activeSound.soundId}`).transaction((post)=>{
                        if(post){
                            if(post.totalListening){
                                post.totalListening++;
                            }else{
                                post.totalListening = 1;
                            }
                        }
                        return post;
                    });
                    this.$parent.$parent.nextHandler();
                }
            }
        },
        updated: function () {
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been re-rendered
                if (this.$props.activeSound) {
                    if (this.$data.prevSound !== this.$props.activeSound) {
                        this.$parent.$parent.locationDownloader("step1", this.$props.activeSound.location.step1).then(s => {
                            this.$data.loc1 = s;
                        })
                        this.$parent.$parent.locationDownloader("step2", this.$props.activeSound.location.step2).then(s => {
                            this.$data.loc2 = s;
                        })
                        this.$parent.$parent.locationDownloader("step3", this.$props.activeSound.location.step3).then(s => {
                            this.$data.loc3 = s;
                        })
                        const ref = window.sto.refFromURL(`gs://seslikampus.appspot.com/sounds/${this.$props.activeSound.soundPath}`);
                        ref.getDownloadURL().then(s => {
                            document.getElementById("myPlayer").src = s;
                        })
                        this.$data.prevSound = this.$props.activeSound;
                    }
                }
            })
        },
        methods: {
            replayHandler: function () {
                this.$parent.$parent.$data.isReplay = !this.$data.isReplay;
                this.$data.isReplay = !this.$data.isReplay;
            },
            shuffleHandler: function () {
                this.$parent.$parent.$data.isShuffle = !this.$data.isShuffle;
                this.$data.isShuffle = !this.$data.isShuffle;
            },
            timeAdapter: function (second) {
                let minute = Math.floor(second / 59);
                let sec = second % 59;
                if (minute < 9.5) {
                    minute = "0" + minute.toFixed(0);
                } else {
                    minute = minute.toFixed(0);
                }
                if (sec < 9.5) {
                    sec = "0" + sec.toFixed(0);
                } else {
                    sec = sec.toFixed(0);
                }
                return `${minute === "NaN" ? "--" : minute}:${sec === "NaN" ? "--" : sec}`;
            }, processPercentage: function (duration, current) {
                return current * 100 / duration;
            },
            fullPageClickHandler: function () {
                this.$data.isFullPage = !this.$data.isFullPage;
            }, playPauseHandler: function () {
                if (this.$data.isPlay) {
                    document.getElementById("myPlayer").pause();
                } else {
                    document.getElementById("myPlayer").play();
                }
                this.$data.isPlay = !this.$data.isPlay;
            },
            currentPointHandler(e) {
                if (this.$props.activeSound) {
                    if (e.touches) {
                        let audio = document.getElementById('myPlayer');
                        let per = e.touches[0].clientX / window.innerWidth * 100;
                        let duration = audio.duration * per / 100;
                        audio.currentTime = duration;
                    } else {
                        if (this.$data.isDrag) {
                            document.getSelection().empty();
                            let audio = document.getElementById('myPlayer');
                            let per = e.clientX / window.innerWidth * 100;
                            let duration = audio.duration * per / 100;
                            audio.currentTime = duration;

                        }
                    }
                }
            },
            processClickHandler(e) {
                if (this.$props.activeSound) {
                    let audio = document.getElementById('myPlayer');
                    let per;
                    if (e.touches) {
                        per = e.touches[0].clientX / window.innerWidth * 100;
                    } else {
                        per = e.clientX / window.innerWidth * 100;
                    }
                    let duration = audio.duration * per / 100;
                    audio.currentTime = duration;
                }
            }
        }, data: function () {
            return {
                isDrag: false,
                isPlay: false,
                isFullPage: false,
                isShuffle: false,
                isReplay: false,
                duration: "--:--",
                currentTime: "--:--",
                progress: 0,
                loadProgress: 0,
                loc1: "---",
                loc2: "---",
                loc3: "---",
            }
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 720px) {
        .full-page-area.active {
            height: 70vh !important;

        }
        .player-box {
            font-size: 1.5em;
        }
        .full-page-area.active .photo-area {
            height: 65vh !important;
            width: 36.6vh !important;
            margin-top: 0 !important;
        }

    }

    .desktop [role=button]:hover {
        color: #f15724;
    }
    .mobile [role=button]:active {
        color: #f15724;
    }

    .player-box {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
        align-items: center;
        background-color: black;
    }

    .player-box {
        position: fixed;
        bottom: 0;
        z-index: 50;
    }

    .process-bar {
        width: 100vw;
        height: 10px;
        background-color: #cccccc;
    }

    .process-bar:hover {
        cursor: pointer;
    }

    .current-bar {
        width: 30vw;
        height: 10px;
        background-color: #93278F;
    }

    .current-bar.load {

        background-color: #847c84;
    }

    .pointer {
        position: relative;
        height: 15px;
        width: 15px;
        top: -3px;
        right: -3px;
        background-color: #444;
        border-radius: 10px;
        float: right;
    }

    .desktop .pointer:hover ,.mobile .pointer:active {
        background-color: #f15724;
    }

    .controller {
        display: grid;
        grid-template-columns: 3fr 2fr 1fr 2fr 3fr;
        align-items: center;
        justify-items: center;
    }

    .controller .play-pause{
        font-size: 4em;
        text-decoration: none;
        background: -webkit-linear-gradient(180deg, #93278F, #f15724);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .controller .play-pause ~ span{
       color: #f15724;
    }

    .controller .play-pause:hover {
        background: -webkit-linear-gradient(0deg, #93278F, #f15724);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .location {
        color: #cccccc;
        width: 100vw;
        display: flex;
        margin-top: 10px;

    }

    .location-item {
        color: #ccc;
        font-size: 0.7em;
        margin-right: 0;
        margin-left: 0;
        margin-bottom: 5px;
        display: grid;
        align-content: center;
    }

    .location-item.last {
        color: #fbae17;
        font-family: "DIN Pro Bold";
        font-size: 0.8em;
        margin-right: 10px;
    }

    .location-item.first {
        margin-left: 10px;
    }

    .replay.active, .replay.active ~ span {
        color: #f15724;
    }

    .shuffle.active,.shuffle.active ~ span {
        color: #f15724;
    }

    .seperator {
        font-size: 1em;
    }

    .duration {
        display: flex;
        height: 0;
        justify-content: space-between !important;
        justify-self: normal;
        color: #cccccc;
        font-size: 0.8em;
    }

    .duration-item {
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 2px;
    }

    .controller-button {
        color: #cccccc;
        font-size: 1.5em;
    }

    .full-page-toggle {
        display: grid;
        grid-template-columns: 1fr;
        justify-items: center;
        color: #ccc;
    }

    .full-page-toggle.full {
        background: rgb(147, 39, 143);
        background: linear-gradient(90deg, rgba(147, 39, 143, 1) 0%, rgba(241, 87, 36, 1) 100%);
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        width: 100vw;
    }

    .desktop .full-page-toggle.full:hover {
        color: #fbae17 !important;
    }
    .mobile .full-page-toggle.full:active {
        color: #fbae17 !important;
    }

    .full-page-toggle.full span {
        font-weight: bolder;
        font-size: 1em;
    }

    .full-page-toggle .description {
        font-size: 0.7em;
    }

    .full-page-area {
        height: 0;
        background-color: #000;
        transition: 0.5s;
    }

    .full-page-area.active {
        height: 60vh;
        display: grid;
        justify-content: center;
        align-items: center;
    }

    .full-page-area .photo-area {
        height: 0;
        transition: 0.5s;
    }

    .full-page-area .photo-area img {
        height: 0;
        transition: 0.5s;
    }

    .full-page-area.active .photo-area {
        height: 55vh;
        margin-top: 10px;
        margin-bottom: 10px;
        width: 31vh;
        background-color: #fbae17;
    }

    .full-page-area.active .photo-area img {
        height: 55vh;
        width: 31vh;
    }
    .player-button-box{
        display: grid;
        justify-items: center;
    }
    .desktop .player-button-box span:hover ~ .player-button-description{
        color: #f15724;
    }
    .mobile .player-button-box span:active ~ .player-button-description{
        color: #f15724;
    }
    .player-button-description{
        font-size: 0.7em;
        width: fit-content;
        text-align: center;
        height: 20px;
        color: #ccc;
    }
</style>
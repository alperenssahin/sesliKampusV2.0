<template>
    <div class="player-box" v-bind:class="{full:isFullPage}">
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
        <div class="process-bar" v-on:touchstart="processClickHandler">
            <div class="current-bar load" v-bind:style="{width:loadProgress+'%'}">
            <div class="current-bar" v-bind:style="{width:progress+'%'}">
                <div class="pointer" role="button" v-on:touchmove="currentPointHandler"></div>
            </div>
            </div>
        </div>
        <div class="duration">
            <span class=" duration-item current-dur">{{currentTime}}</span>
            <span class="duration-item total-dur">{{duration}}</span>
        </div>

        <div class="controller-container">
            <div class="controller">
            <span class="material-icons shuffle controller-button" role="button">
                shuffle
           </span>
                <span class="material-icons prev controller-button" role="button"
                      v-on:click="activeSoundHandler(activeSound.prev)">
                skip_previous
           </span>
                <span class="material-icons play-pause controller-button" role="button" v-on:click="playPauseHandler">
                {{isPlay?"pause":"play_arrow"}}
           </span>
                <span class="material-icons next controller-button" role="button"
                      v-on:click="activeSoundHandler(activeSound.next)">
                skip_next
           </span><span class="material-icons replay controller-button" role="button">
                replay
           </span>
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
            let mp = document.getElementById("myPlayer");
            mp.autoplay = true;
            mp.onplay = () => {
                this.$data.isPlay = true;
            }
            mp.onpause = () => {
                this.$data.isPlay = false;
            }
            mp.onprogress = () => {
                if(mp.buffered.length >0){
                   this.$data.loadProgress = this.processPercentage(mp.duration,mp.buffered.end(0));
                }
            }
            mp.onloadedmetadata = () => {

            }
            mp.ontimeupdate = () => {
                this.$data.duration = this.timeAdapter(mp.duration);
                this.$data.currentTime = this.timeAdapter(mp.currentTime);
                this.$data.progress = this.processPercentage(mp.duration,mp.currentTime);
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
                            document.getElementById("myPlayer").play();
                        })
                        this.$data.prevSound = this.$props.activeSound;
                    }

                }
            })

        },
        methods: {
            timeAdapter: function (second) {
                let minute = Math.floor(second / 60);
                let sec = second % 60;
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
                return `${minute}:${sec}`;
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
            currentPointHandler(e){
                let audio = document.getElementById('myPlayer');
                let per = e.touches[0].clientX/window.innerWidth*100;
                let duration = audio.duration*per/100;
                audio.currentTime = duration;
            },
            processClickHandler(e){
                let audio = document.getElementById('myPlayer');
                let per = e.touches[0].clientX/window.innerWidth*100;
                let duration = audio.duration*per/100;
                audio.currentTime = duration;
            }
        }, data: function () {
            return {
                isPlay: false,
                isShuffle: false,
                isRepeat: false,
                isFullPage: false,
                next: this.$parent.$parent.$data.indexes.next,
                prev: this.$parent.$parent.$data.indexes.prev,
                duration: "--:--",
                currentTime: "--:--",
                progress:0,
                loadProgress:0,
                loc1: "---",
                loc2: "---",
                loc3: "---",
            }
        }
    }
</script>

<style scoped>
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

    .controller {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
        align-items: center;
        justify-items: center;
    }

    .controller .play-pause {
        font-size: 4em;
        text-decoration: none;
        background: -webkit-linear-gradient(#93278F, #f15724);
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
        font-size: 0.6em;
        margin-right: 0;
        margin-left: 0;
        margin-bottom: 5px;
        display: grid;
        align-content: center;
    }

    .location-item.last {
        color: #fbae17;
        font-family: "DIN Pro Bold";
        font-size: 0.7em;
        margin-right: 10px;
    }

    .location-item.first {
        margin-left: 10px;
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
</style>
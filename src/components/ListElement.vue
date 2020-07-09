<template>
    <router-link v-bind:to="`?now=${sound.soundId}`">
    <div class="list-element-box" v-bind:class="{active:sound.isActive}" role="button" v-bind:id="sound.soundId" v-on:click="clickHandler(sound)">
        <div class="photo">
            <img v-bind:src="`/images/${sound.imagePath}`"
                 v-bind:alt="sound.alt?sound.alt:'Bir zamanlar galatasarayda tanitim kapagi'">
        </div>
        <div class="info" role="article">
            <h2 class="top"><span class="title">{{title}}</span>-<span
                    class="hour">{{sound.time}}</span></h2>
            <div class="mid">
                <div >Kayıt Tarihi : <span class="date">{{sound.date}}</span></div>
                <div><span class="date">{{sound.totalListening?sound.totalListening:0}}</span> dinlenme</div>
            </div>

            <div class="bot"><span class="tags">{{sound.tag}}</span></div>
        </div>
    </div>
    </router-link>
</template>

<script>
    export default {
        name: "ListElement",
        props: {
            sound: Object,
            index: Number,
            clickHandler:Function,
        },
        created() {
            window.db.ref(`/sounds/${this.$props.sound.soundId}`).on("child_changed",(s)=>{
                this.$props.sound.totalListening = s.val()
            });
            this.$parent.$parent.locationDownloader("step3", this.$props.sound.location.step3).then(s => {
                this.$data.title = s;
            });
        }, data: function () {
            return {
                title: "",
            }
        }
    }
</script>

<style scoped>
    @media only screen and (max-width: 321px) {
        .info .mid{
            grid-template-columns: 2fr 1fr !important;
        }
    }
    .list-element-box {
        display: grid;
        grid-template-columns: 1fr 5fr;
        align-items: center;
        justify-items: center;
        grid-gap: 10px;
        background-color: rgba(128, 128, 128, 0.31);
        height: 100px;
        margin-top: 30px;
        margin-bottom: 50px;
        color: #cccccc;
    }
    h2{
        font-size: 1em;
    }
     a{
        text-decoration: none;
    }
    .list-element-box.active{
        background-color:#93278F;
    }
    .desktop .list-element-box:hover{
        background-color:#b6396c;
    }
    .mobile .list-element-box:active{
        background-color:#b6396c;
    }

    .list-element-box .info {
        height: 100px;
        display: grid;
        grid-template-columns: 1fr;
        align-self: normal;
        justify-self: self-start;
        align-items: center;
    }

    .info .title {
        font-weight: normal;
        font-size: 1.2em;
    }

    .info .hour {
        font-family: "DIN Pro Bold";
        font-size: 0.8em;
    }

    .info .date {
        font-family: "DIN Pro Bold";
        font-size: 0.8em;
    }

    .info .mid {
        font-family: "DIN Pro Light";
        font-size: 0.9em;
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-gap: 10px;

    }

    .info .tags {
        font-family: "DIN Pro Light";
        font-size: 0.8em;
    }

    .list-element-box .info > div {
        height: fit-content;
    }

    .list-element-box .photo {
        margin-left: 10px;
        position: relative;
        top: -15px;
        background-color: #fbae17;
        width: 72px;
        height: 128px;
        z-index: 5;
    }

    .photo img {
        width: 72px;
        height: 128px;
    }

</style>
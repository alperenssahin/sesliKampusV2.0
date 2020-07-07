<template>
    <div class="list-element-box" v-bind:class="{active:sound.isActive}" role="button" v-bind:id="sound.soundId" v-on:click="clickHandler(sound)">
        <div class="photo">
            <img v-bind:src="`/images/${sound.imagePath}`"
                 v-bind:alt="sound.alt?sound.alt:'Bir zamanlar galatasarayda tanitim kapagi'">
        </div>
        <div class="info" role="article">
            <div class="top"><span class="title">{{title}}</span>-<span
                    class="hour">{{sound.time}}</span></div>
            <div class="mid">Kayıt Tarihi : <span class="date">{{sound.date}}</span></div>
            <div class="bot"><span class="tags">{{sound.tag}}</span></div>
        </div>
    </div>
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

    .list-element-box.active{
        background-color:#93278F;
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
        font-size: 1em;
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
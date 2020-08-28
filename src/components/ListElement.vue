<template>
    <div>
    <router-link v-bind:to="`?now=${sound.soundId}`" tabindex="-1" >
    <div class="list-element-box list-click" v-bind:class="{active:sound.isActive}" role="button" v-bind:id="sound.soundId"
         v-on:click="clickHandler(sound)"
         v-on:keypress.enter="clickHandler(sound)"
         tabindex="0"
    >
        <div class="photo">
            <img v-bind:src="`/images/${photoPath?photoPath:sound.imagePath}`"
                 v-bind:alt="alternativeText?alternativeText:'Bir zamanlar galatasarayda tanitim kapagi'">
        </div>
        <div class="info list-click" role="article">
            <h2 class="top list-click"><span class="title list-click">{{title}}</span>-<span
                    class="hour list-click">{{sound.time}}</span></h2>
            <div class="mid list-click">
                <div >Kayıt Tarihi : <span class="date list-click">{{sound.date}}</span></div>
                <div class="share-box list-click">
                <span class="material-icons share " role="button" aria-label="Paylaş"
                      tabindex="0"
                      v-on:keypress.enter="sharePageHandler"
                      v-on:click="sharePageHandler">
                    share
                    </span>
                    <span class="share-description">
                        Paylaş
                    </span>
                </div>
            </div>
            <div class="bot list-click">
                <div><span class="date list-click">{{sound.totalListening?sound.totalListening:0}}</span> dinlenme</div>
                <span class="tags list-click">{{sound.tag}}</span>
            </div>
        </div>
    </div>

    </router-link>
        <Share v-bind:is-active="sharePage" v-bind:sound="sound" v-bind:title="title"></Share>
    </div>
</template>

<script>

    import Share from "@/components/Share";
    export default {
        name: "ListElement",
        components: {Share},
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
              this.$data.title = s.title;
              this.$data.photoPath = s.photo;
              this.$data.alternativeText = s.alt;
            });
        }, data: function () {
            return {
                title: "",
                sharePage:false,
                photoPath:undefined,
                alternativeText:undefined,
            }
        },methods:{
            sharePageHandler:function () {
                this.$data.sharePage = true;
            }
        }
    }
</script>

<style scoped>
    /*.top{*/
    /*    display: grid;*/
    /*}*/
    .share-box{
        display: grid;
        grid-template-columns: 1fr;
        justify-content: center;
    }
    .share{

    }
    .share-description{
        font-size: 0.7em;
        text-align: center;
    }
    .bot{
        display: grid;
        grid-template-columns: 2fr 5fr;
        align-items: center;
        font-size: 0.8em;
    }
    @media only screen and (max-width: 321px) {
        /*.info .mid{*/
        /*    grid-template-columns: 3fr  1fr!important;*/
        /*}*/
    }
    .list-element-box {
        display: grid;
        grid-template-columns: 1fr 5fr;
        align-items: center;
        justify-items: center;
        grid-gap: 10px;
        background-color: rgba(128, 128, 128, 0.31);
        height: 7.5em;
        min-height: 6em;
        margin-top: 30px;
        margin-bottom: 50px;
        color: #fff;
    }
    h2{
        font-size: 1em;
        margin: 0;
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
        width: 100%;
        margin-top: 0.7em;
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
        grid-template-columns: 4fr 1fr;
        grid-gap: 10px;
        align-items: center;

    }
    .mid span.share{
        font-size: 2em;
        text-align: center;
    }
    .desktop .mid .share-box:hover{
        color: #444444;
    }
    .mobile .mid .share-box:active{
        color: #444444;
    }

    .info .tags {
        font-family: "DIN Pro Light";
        font-size: 1em;
    }

    .list-element-box .info > div {
        height: fit-content;
    }

    .list-element-box .photo {
        margin-left: 10px;
        position: relative;
        top: -15px;
        background-color: #fbae17;
        width: 5em;
        height: 9em;
        z-index: 5;
    }

    .photo img {
        width: 5em;
        height: 9em;
      object-fit: cover;
    }

</style>
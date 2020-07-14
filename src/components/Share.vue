<template>
    <div class="share-box" v-if="isActive">
        <div class="share-container">
            <header>
                <h2>Paylaş</h2>
                <span class="material-icons" role="button"
                      tabindex="0"
                      v-on:click="closeHandler"
                      v-on:keypress.enter="closeHandler"
                >close</span>
            </header>
            <main>
                <div class="title-sound">
                    <span class="bold">{{title}}</span>-{{sound.date}}-{{sound.time}} sesi paylaşılıyor.
                </div>
                <div class="share-item-container">
                    <div class="share-item">
                    <a v-bind:href="`https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtag}&url=${url}`"
                       target="_blank" class="fa fa-twitter"></a>
                        <span  class="title">Twitter</span>
                    </div>
                    <div class="share-item">
                    <a v-bind:href="`whatsapp://send?text=${text}%20${url}`" class="fa fa-whatsapp"></a>
                        <span class="title">Whatsapp</span>
                    </div>
                    <div class="share-item">
                        <a v-bind:href="` https://www.facebook.com/dialog/share?app_id=889018504936380&href=${url}&hashtag=${hashtag}`" class="fa fa-facebook" target="_blank"></a>
                        <span class="title">Facebook</span>
                    </div>
                    <div class="share-item">
                        <a v-bind:href="` https://www.linkedin.com/sharing/share-offsite/?url=${url}`" class="fa fa-linkedin" target="_blank"></a>
                        <span class="title">LinkedIn</span>
                    </div>
                </div>

                <div class="link-container">
                    <div class="share-item input">
                      <input type="text" id="url-value" v-bind:value="url">
                    </div>
                    <div class="share-item">
                    <a class="fa share-link" tabindex="0" v-on:click="copy" v-on:keypress.enter="copy"><span class="material-icons">
                        link
                        </span></a>
                        <span class="title">Linki Kopyala</span>
                    </div>
                </div>
                <div style="height: 2em;">
                <div class="copy-feed-back" role="dialog" v-if="message !== ''">{{message}}</div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Share",
        components: {},
        props: {
            isActive: Boolean,
            sound: Object,
            title: String,
        },

        updated(){
            if(!this.$data.isLoad){
                this.$data.text = `Galatasaray%20Üniversitesi%20'${this.$props.title}'%20sesini%20dinle%20Kayıt%20Tarihi:%20${this.$props.sound.date}-${this.$props.sound.time}`
                this.$data.url = `http://${window.location.host}/?now%3D${this.$props.sound.soundId}`
                this.$data.hashtag = `seslikampus`
                this.$data.isLoad = true;
            }
        },
        data: function () {
            return {
                isLoad :false,
                message:"",
                text:"",url:"",hashtag:"",

            }
        },
        methods: {
            closeHandler: function () {
                this.$parent.$data.sharePage = false;
            },
            copy:function () {
                let copyText = document.getElementById("url-value");
                copyText.select();
                copyText.setSelectionRange(0, 99999);
                document.execCommand("copy");
                this.$data.message = "Panoya Kopyalandı";
                setTimeout(()=>{
                    this.$data.message = ""
                },1000);
            }
        }
    }
</script>

<style scoped>
    .title-sound{
        width: 80%;
        margin-bottom: 20px;
        margin-left: 30px ;
        color: #cccccc;
        font-size: 1em;
    }
    header {
        display: grid;
        grid-template-columns: 5fr auto;
        padding: 10px;
        background: rgb(147, 39, 143);
        background: linear-gradient(90deg, rgba(147, 39, 143, 1) 0%, rgba(241, 87, 36, 1) 100%);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        color: white;
        max-height: 50px;
        align-content: center;
        align-items: center;
    }

    header h2 {
        margin: 0;
    }
    .copy-feed-back{
        width: fit-content;
        margin: auto;
        color: #444444;
        background-color: #ccc;
        padding: 5px;
        border-radius: 2px;
    }
    .share-box {
        width: 100vw;
        height: 100vh !important;
        top: 0;
        left: 0;
        position: absolute;
        background-color: rgba(68, 68, 68, 0.50);
        z-index: 99;
    }

    @media only screen and (min-width: 720px) {
        .share-container{
            width: 40vw !important;
            left: 30vw!important;
        }
    }

    .share-item-container {
        display: grid;
        grid-template-columns:auto auto auto auto;
        justify-content: center;
        justify-items: center;
        grid-gap: 10px;
    }
    .share-item.input{
        justify-self: right;
    }
    .share-item{
        display: grid;
    }
    .share-item a {
        margin: auto;
    }
    .share-item span.title{
        color: white;
        font-size: 0.8em;
        justify-self: center;
    }
    .link-container{
        display: flex;
        justify-content: center;
        justify-items: center;
        margin: 20px;
        grid-gap: 10px;
    }
    .link-container input{
        margin-right: 10px;
        /*width: 100%;*/
        background-color: #444;
        height: 5vh;
        border-radius: 4px;
        border: 2px solid #222;
        color: #fff;
        outline: none;
        transition: 0.4s;
        padding-left: 10px;
    }
    .link-container input:focus{
       outline: 1px solid #ccc;
    }
    .fa {
        width: 6vh;
        height: 6vh;
        border-radius: 4px;
        text-align: center;
        font-size: 2em;
        text-decoration: none;
        display: grid;
        align-content: center;
    }

    .fa-twitter {
        background: #55ACEE;
        color: white;
    }

    .fa-facebook {
        background: #3B5998;
        color: white;
    }
    .fa-linkedin{
        background:#3176b0;
        color: white;
    }

    .fa-whatsapp {
        background: #2fb944;
        color: white;
    }

    .share-link {
        background: #f15724;
        color: white;
    }

    .share-container {
        width: 80vw;
        height: 50vh;
        background-color: #444444;
        top: 20vw;
        left: 10vw;
        position: absolute;
        border-radius: 4px;
        display: grid;
        grid-template-columns: 1fr;
    }
</style>
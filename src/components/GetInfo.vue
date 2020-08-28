<template>
    <div class="get-info-box">
        <div class="get-info-container">
            <header>
                <h2>{{title}}</h2>
                <span class="material-icons"
                      id="info-close"
                      role="button"
                      tabindex="0"
                      v-on:click="closeHandler"
                      v-on:keypress.enter="closeHandler"
                >close</span>
            </header>
            <main>
<!--                <div class="info-menu" role="navigation" v-if="isMenuActive">-->
<!--                <div role="button" tabindex="0" class="accessibility-settings info-button" id="info-first"-->
<!--                     v-on:keypress.enter="clickHandler('accessibility' , 'Erişilebilirlik Seçenekleri')"-->
<!--                     v-on:click="clickHandler('accessibility' , 'Erişilebilirlik Seçenekleri')">-->
<!--                    <div>Erişilebilirlik Seçenekleri</div>-->
<!--                    <span class="material-icons">-->
<!--                accessibility-->
<!--                </span></div>-->
<!--                <div role="button" tabindex="0" class="accessibility-settings info-button"-->
<!--                     v-on:keypress.enter="clickHandler('info', 'SesliKampüs Hakkında')"-->
<!--                     v-on:click="clickHandler('info','SesliKampüs Hakkında')"-->
<!--                >-->
<!--                    <div>SesliKampüs Hakkında</div>-->
<!--                    <span class="material-icons">-->
<!--                info-->
<!--                </span></div>-->
<!--                <div role="button" tabindex="0" class="accessibility-settings info-button"-->
<!--                     v-on:keypress.enter="clickHandler('onboard','Nasıl Kullanmalı?')"-->
<!--                     v-on:click="clickHandler('onboard','Nasıl Kullanmalı?')"-->
<!--                     v-on:focusout="focusClose"-->
<!--                >-->
<!--                    <div>Nasıl Kullanmalı?</div>-->
<!--                    <span class="material-icons">-->
<!--                help-->
<!--                </span></div>-->
<!--                </div>-->
<!--                <div class="info-content" v-if="!isMenuActive">-->
<!--                    <div class="info-back-button" role="button" id="info-second"-->
<!--                         tabindex="0"-->
<!--                         aria-label="Üst sekmeye geri dön"-->
<!--                         v-on:click="backHandler"-->
<!--                         v-on:keypress.enter="backHandler"><span class="material-icons"-->
<!--                    >keyboard_backspace</span>-->
<!--                    <span class="title">Geri</span>-->
<!--                    </div>-->
<!--                    <div class="accessibility-settings-content" v-if="accessibility">-->
<!--                        <div class="accessibility-input-row">-->
<!--                            <label for="font-size">Metin Boyutu ({{fontsize}} pt)</label>-->
<!--                            <input id="font-size" type="range" min="10" max="14" step="0.2" value="12" v-on:change="fontSizeChangeHandler">-->
<!--                        </div>-->
<!--&lt;!&ndash;                        <div class="accessibility-input-row">&ndash;&gt;-->
<!--&lt;!&ndash;                            <label for="font-color">Metin Rengi ({{fontColor}})</label>&ndash;&gt;-->
<!--&lt;!&ndash;                            <input id="font-color" type="color" value="#cccccc" v-on:change="fontColorChangeHandler">&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
            </main>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GetInfo"
        , data: function () {
            return {
                title:"Bilgi Al",
                isMenuActive:true,
                accessibility:false,
                info:false,
                onboard:false,
                fontsize:"12",
                fontColor:"#cccccc"
            }
        },
        components: {},
        methods: {
            focusClose(){
                document.getElementById("info-close").focus();
            },
            closeHandler() {
                this.$parent.$data.isInfoOpen = false;
            },
            clickHandler(menu,title){
                this.$data.isMenuActive = false;
                this.$data[menu] = true;
                this.$data.title = title;
                setTimeout(()=>{
                    document.getElementById("info-second").focus();
                },100);
            },
            backHandler(){
                this.$data.isMenuActive = true;
                this.$data.title = "Bilgi AL";
                this.$data.info = false;
                this.$data.onboard = false;
                this.$data.accessibility = false;
                setTimeout(()=>{
                    document.getElementById("info-first").focus();
                },100);
            },
            fontSizeChangeHandler(ev){
                this.$data.fontsize = ev.target.value;
                document.getElementById("app").style.fontSize =`${ev.target.value}pt`
            },
            fontColorChangeHandler(ev){
                this.$data.fontColor = ev.target.value;
                document.getElementById("app").style.color =`${ev.target.value}!important`
            }
        }
    }
</script>

<style scoped>
    .accessibility-input-row{
        margin: 10px;
        display: grid;
        grid-template-columns: 1fr;
    }
    .accessibility-input-row label{
        font-family: "DIN Pro Bold";
        color: #cccccc;
    }
    .info-back-button{
        display: grid;
        justify-content: start;
        justify-items: center;
        margin: 10px;
        width: fit-content;
        color: #cccccc;
    }
    .info-back-button span.title{
        font-size: 0.8em;
    }
    .info-content{
        display: grid;
        grid-template-columns: 1fr;
    }
    main {
        display: grid;
        grid-template-columns: 1fr;
        align-content: start;

    }
    main input{
        width: 100%;
        border-radius: 4px;
    }
    .info-button {
        display: grid;
        justify-content: space-between;
        grid-template-columns: auto auto;
        align-content: center;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        margin: 10px 10px 0px 10px;
        border-radius: 4px;
        height: 3em;
        font-size: 1em;
        color: #444444;
        background-color: #fbae17;
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
        height: fit-content;
        max-height: 50px;
        min-height: 50px;
        align-content: center;
        align-items: center;
    }

    header h2 {
        margin: 0;
    }

    .get-info-box {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        position: absolute;
        background-color: rgba(68, 68, 68, 0.50);
        z-index: 99;
    }

    @media only screen and (min-width: 720px) {
        .get-info-container {
            width: 40vw !important;
            left: 30vw !important;
        }
    }

    .get-info-container {
        width: 80vw;
        height: 50vh;
        background-color: #444444;
        top: 10vh;
        left: 10vw;
        position: absolute;
        border-radius: 4px;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 5fr;
    }
</style>
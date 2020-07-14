<template>
    <main class="main-box" v-bind:class="{wait:!isDownloaded()}">
        <Loader v-if="!isDownloaded()"></Loader>
        <list-element v-for="(item,index) in list"
                      v-bind:key="item.soundId"
                      v-bind:index="index"
                      v-bind:sound="item"
                      v-bind:click-handler="clickHandler"
        ></list-element>
    </main>
</template>

<script>
    import ListElement from "@/components/ListElement";
    import Loader from "@/components/Loader";

    export default {
        name: "Main",
        components: {Loader, ListElement},
        props:{
            list:Array,
            clickHandler:Function,
        },methods:{
            isDownloaded:function () {
                return window.downloaded;
            }
        }
    }
</script>

<style scoped>
    .main-box {
        max-height: 60vh;
        overflow-y: scroll;
    }
    .main-box.wait{
        display: grid;
        justify-content: center;
        align-content: center;
        height: 70vh;
    }
    @media only screen and (min-width: 720px) {
        .main-box{
            padding-left: 30vw;
            padding-right: 30vw;
        }
    }
</style>
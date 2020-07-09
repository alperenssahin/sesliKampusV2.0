<template>
    <main class="main-box">
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

    export default {
        name: "Main",
        components: {ListElement},
        props:{
            list:Array,
            clickHandler:Function,
        }
    }
</script>

<style scoped>
    .main-box {
        max-height: 60vh;
        overflow-y: scroll;
    }
    @media only screen and (min-width: 720px) {
        .main-box{
            padding-left: 30vw;
            padding-right: 30vw;
        }
    }
</style>
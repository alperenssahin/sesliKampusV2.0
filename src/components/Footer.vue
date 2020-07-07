<template>
    <footer class="footer-box">
        <Player v-bind:active-sound="activeSound" v-bind:active-sound-handler="activeSoundHandler"></Player>
    </footer>
</template>

<script>
    import Player from "@/components/Player";
    export default {
        name: "Footer",
        components: { Player},
        props:{
            activeSound:Object,
            activeSoundHandler:Function,
        }
    }
</script>

<style scoped>

</style>
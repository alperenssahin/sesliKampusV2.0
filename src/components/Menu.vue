<template>
    <div class="menu-box">
        <span class="material-icons">
            explore
        </span>
        <span class="material-icons">
            filter_list
        </span>
    </div>
</template>

<script>
    export default {
        name: "Menu"
    }
</script>

<style scoped>
    .menu-box{
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        align-items: center;
        height: 40px;
        background-color: black;
    }
</style>
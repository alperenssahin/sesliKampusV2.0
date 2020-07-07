<template>
    <header class="header-box">
        <a href="/" aria-label="yenile" role="button" class="logo">S</a>
        <span>Sesli Kampus</span>
        <div class="info">
        <span class="material-icons" aria-labelledby="info-description">
            info
        </span>
            <span class="description" id="info-description">Bilgi Al</span>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    .header-box{
        display: grid;
        grid-template-columns: 2fr 5fr 2fr;
        align-items: center;
        justify-items: center;
    }
    .header-box .info{
        display: grid;
        justify-items: center;
    }
    .info .description{
        font-size: 0.7em;
    }
    header .logo{
        font-size: 2.4em;
        font-family: "DIN Pro Bold";
        text-decoration: none;
        background: -webkit-linear-gradient(#93278F, #f15724);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
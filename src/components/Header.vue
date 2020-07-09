<template>
    <header class="header-box">
        <a href="/" aria-label="yenile" role="button" class="logo">S</a>
        <h1>Sesli Kampus</h1>
        <div class="info" role="button">
        <span class="material-icons" aria-labelledby="info-description">
            info
        </span>
            <span class="description"  id="info-description">Bilgi Al</span>
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
    @media only screen and (min-width: 720px) {
        .header-box{
            font-size: 1.5em;
        }
    }
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
    header h1{
        font-size: 1em;
        margin: 0;
    }
    .desktop .info:hover{
        color: #f15724;
    }
    .mobile .info:active{
        color: #f15724;
    }
    .info .description{
        font-size: 0.7em;
    }
    header .logo{
        font-size: 2.4em;
        font-family: "DIN Pro Bold";
        text-decoration: none;
        background: -webkit-linear-gradient(0deg,#93278F, #f15724);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: 1s;
    }
    .desktop header .logo:hover{
        background: -webkit-linear-gradient( 180deg,#93278F,#f15724);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .mobile header .logo:active{
        background: -webkit-linear-gradient( 180deg,#93278F,#f15724);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
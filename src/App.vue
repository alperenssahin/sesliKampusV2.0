<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<style>
  @media only screen and (max-width: 321px) {
    body{
      font-size: 10pt!important;
    }
  }
body{
  margin: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(25, 25, 25, 1) 50%, rgba(0, 0, 0, 1) 100%);
  color: #fbae17;
  font-family: "DIN Pro";
  font-size: 12pt;
  overflow: hidden;
}
[role=button]{
  cursor: pointer;
}

.bold{
  font-family: "DIN Pro Bold";
  font-weight: bolder;
}
.container{
  margin: 10px;
}
.container-row{
  margin-left: 10px;
  margin-right: 10px;

}
</style>

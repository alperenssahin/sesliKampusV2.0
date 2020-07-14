<template>
    <div class="filter-container">
        <header><h2>Filtreleri Yönet</h2><span class="material-icons close" role="button"
                                               tabindex="0"
                                               v-on:keypress.enter="closeHandler"
                                               v-on:click="closeHandler">close</span></header>
        <main class="container">
            <h3>Aktif Filtreler</h3>

            <strong v-if="activeFilters.length === 0">Aktif filtre bulunmamakta</strong>
            <div class="active-filter-box" role="list">
                <div role="listitem"
                     class="active-filter"
                     v-for="filter in activeFilters.slice().reverse()"
                     v-bind:key="filter.index"
                     v-bind:class="filter.title"
                ><strong>{{filter.title}}:</strong><span class="material-icons" role="button" tabindex="0" v-on:keypress.enter="removeFilter(filter)"
                                                         aria-label="Filtreyi Kaldir" v-on:click="removeFilter(filter)">close</span>{{filter.showValues.join(" | ")}}
                </div>
            </div>
            <span style="text-align: center;margin: 0;margin-bottom: 10px;">{{activeSound}} ses listeleniyor</span>
            <h3>Filtre Uygula</h3>
            <div class="filter-activation" role="button" v-bind:class="{selected:locationFilterArea}"
                 tabindex="0"
                 v-on:keypress.enter="locationFilterHandler"
                 v-on:click="this.locationFilterHandler">Konuma Göre Filtre Ekle
            </div>


            <div class="filter-area location" v-bind:class="{active:locationFilterArea,container:locationFilterArea}">
                <strong v-if="message !== ''" role="dialog">{{message}}</strong>
                <div class="filter-area-stepper" role="list" v-if="step1ready">
                    <div class="location-step item step1" v-for="item in step1"
                         v-bind:key="item.index"
                         tabindex="0"
                         v-on:keypress.enter="step1ToggleHandler(item.index)"
                         v-on:click="step1ToggleHandler(item.index)"
                         role="listitem"
                         v-bind:id="item.index"><div role="button">{{item.title}}
                        <span class="bold"> ({{locationFilterCount("step1",item.index)}})</span>
                    </div></div>
                </div>
                <div class="filter-area-stepper" role="list" v-if="step2ready">
                    <div class="location-step back" role="listitem"
                         tabindex="0"
                         v-on:keypress.enter="step1ReturnBackHandler"
                         v-on:click="step1ReturnBackHandler"><div role="button">Geri</div></div>
                    <div class="location-step item" role="listitem" v-for="item in step2ListFilter()"
                         v-bind:key="item.index" v-bind:id="item.index"
                         tabindex="0"
                         v-on:keypress.enter="step2ToggleHandler(item.index)"
                         v-on:click="step2ToggleHandler(item.index)"><div role="button">{{item.title}}
                        <span class="bold"> ({{locationFilterCount("step2",item.index)}})</span></div></div>
                </div>
                <div class="filter-area-list filter-area-stepper" role="list" v-if="locationReady">
                    <div class="location-step back" role="listitem"
                         tabindex="0"
                         v-on:keypress.enter="step2ReturnBackHandler"
                         v-on:click="step2ReturnBackHandler"><div role="button">Geri</div></div>
                    <div class=" filter-area-listitem" role="listitem" v-for="item in locationListFilter()"
                         v-bind:key="item.index">
                        <input type="checkbox" v-bind:id="item.index" v-bind:value="item.title" name="location-checkbox"
                               checked>
                        <label v-bind:for="item.index">{{item.title}} <span class="bold"> ({{locationFilterCount("step3",item.index)}})</span></label>
                    </div>
                </div>
                <div role="button" class="execute-button"
                     tabindex="0"
                     v-on:keypress.enter="executeLocationFilter"
                     v-on:click="executeLocationFilter">Uygula</div>
            </div>


            <div class="filter-activation" v-bind:class="{selected:dateFilterArea}" role="button"
                 tabindex="0"
                 v-on:keypress.enter="dateFilterHandler"
                 v-on:click="this.dateFilterHandler">Tarihe Göre Filtre Ekle
            </div>
            <div class="filter-area location" v-bind:class="{active:dateFilterArea,container:dateFilterArea}">
                <div class="filter-area-form" role="form" v-if="dateFilterArea">
                    <strong v-if="message !== ''" role="dialog">{{message}}</strong>
                    <label for="start-date">Başlangıç Tarihi:</label>
                    <input id="start-date" type="date" v-on:change="dateSelectHandler" value="2018-01-01">
                    <label style="margin-top: 5px" for="end-date">Bitiş Tarihi:</label>
                    <input id="end-date" type="date">
                </div>
                <div role="button" class="execute-button"
                     tabindex="0"
                     v-on:keypress.enter="executeDateFilter"
                     v-on:click="executeDateFilter">Uygula</div>
            </div>
            <div class="filter-activation" v-bind:class="{selected:hourFilterArea}" role="button"
                 v-on:click="this.hourFilterHandler">Saate Göre Filtre Ekle
            </div>
            <div class="filter-area location" v-bind:class="{active:hourFilterArea,container:hourFilterArea}">
                <div class="filter-area-form" role="form" v-if="hourFilterArea">
                    <strong v-if="message !== ''" role="dialog">{{message}}</strong>
                    <label for="start-hour">Başlangıç Saati:</label>
                    <input id="start-hour" type="time">
                    <label style="margin-top: 5px" for="end-hour">Bitiş Saati:</label>
                    <input id="end-hour" type="time">
                </div>
                <div role="button" class="execute-button"
                     tabindex="0"
                     v-on:keypress.enter="executeHourFilter"
                     v-on:click="executeHourFilter">Uygula</div>
            </div>
        </main>
    </div>
</template>

<script>

    export default {
        name: "FilterBox",

        components: {},
        props: {
            closeHandler: Function,
            activeSound: Number,
            activeFilters: Array,
        },
        methods: {
            step1ToggleHandler: function (index) {
                this.$data.step2ready = true;
                this.$data.step1ready = false;
                this.$data.locationReady = false;
                this.$data.step1Selected = index;
            },
            step1ReturnBackHandler: function () {
                this.$data.step2ready = false;
                this.$data.step1ready = true;
                this.$data.locationReady = false;
                this.$data.step1Selected = null;
            },
            step2ReturnBackHandler: function () {
                this.$data.step2ready = true;
                this.$data.step1ready = false;
                this.$data.step2Selected = null;
                this.$data.locationReady = false;
            },
            step2ToggleHandler(index) {
                this.$data.locationReady = true;
                this.$data.step2ready = false;
                this.$data.step1ready = false;
                this.$data.step2Selected = index;
            },
            step2ListFilter: function () {
                if (this.$data.step1Selected) return this.$data.step2.filter(s => s.parent === this.$data.step1Selected)
                else return [];
            },
            locationListFilter: function () {

                if (this.$data.step2Selected) return this.$data.locationData.filter(s => s.parent === this.$data.step2Selected);
                else return [];

            },
            locationFilterCount: function (step,index) {
                return this.$parent.$data.list.filter(s=>s.location[step] === index).length;
            },
            dateSelectHandler: function (ev) {
                document.getElementById('end-date').value = ev.target.value;
            },
            removeFilter: function (filter) {
                this.$parent.$data.filterList.splice(this.$parent.$data.filterList.indexOf(filter), 1);
            },
            executeLocationFilter: function () {
                if (this.$data.step2SelectedOld !== this.$data.step2Selected) {
                    let filterObj = {
                        title: "Mekan",
                        relatedAttribute: "location.step3",
                        relatedValues: [],
                        showValues: [],
                        index: new Date().getTime()
                    };
                    [...document.getElementsByName("location-checkbox")].forEach(s => {
                        if (s.checked) {
                            filterObj.relatedValues.push(s.id);
                            filterObj.showValues.push(s.value);
                        }
                    });

                    this.$data.locationFilterArea = false;
                    this.$data.step2SelectedOld = this.$data.step2Selected;
                    this.$parent.$data.filterList.push(filterObj);
                    this.step2ReturnBackHandler();
                    this.step1ReturnBackHandler();
                    this.$data.message = "";
                } else {
                    this.$data.message = "Mevcut dalda daha önce uygulanan filtreyi kaldırınız"
                }
            }, executeDateFilter: function () {
                let filterObj = {
                    title: "Tarih",
                    relatedAttribute: "date",
                    relatedValues: [],
                    showValues: [],
                    index: new Date().getTime()
                };
                let startValue = document.querySelector("#start-date").value;
                let endValue = document.querySelector("#end-date").value;
                let state = true;
                if (startValue === "") {
                    this.$data.message = "Geçerli bir başlama tarihi seçiniz."
                    state = false;
                }
                if (endValue === "") {
                    this.$data.message = "Geçerli bir bitiş tarihi seçiniz."
                    state = false;
                }
                filterObj.relatedValues.push(startValue);
                filterObj.relatedValues.push(endValue);
                filterObj.showValues.push(startValue);
                filterObj.showValues.push(endValue);
                if (state) {
                    this.$data.message = "";
                    this.$parent.$data.filterList.push(filterObj);
                    this.$data.dateFilterArea = false;
                }
            },
            executeHourFilter: function () {
                let filterObj = {
                    title: "Saat",
                    relatedAttribute: "time",
                    relatedValues: [],
                    showValues: [],
                    index: new Date().getTime()
                };
                let startValue = document.querySelector("#start-hour").value;
                let endValue = document.querySelector("#end-hour").value;
                let state = true;
                if (startValue === "") {
                    this.$data.message = "Geçerli bir başlama saati seçiniz."
                    state = false;
                }
                if (endValue === "") {
                    this.$data.message = "Geçerli bir bitiş saati seçiniz."
                    state = false;
                }
                filterObj.relatedValues.push(startValue);
                filterObj.relatedValues.push(endValue);
                filterObj.showValues.push(startValue);
                filterObj.showValues.push(endValue);
                if (state) {
                    this.$data.message = "";
                    this.$parent.$data.filterList.push(filterObj);
                    this.$data.hourFilterArea = false;
                }
            },

            locationFilterHandler: function () {
                if (this.$data.locationFilterArea) {
                    this.$data.locationFilterArea = false;
                } else {
                    if (!this.$data.locationData) {
                        window.db.ref("/locations/step1").once("value").then(s => {
                            let step1 = [];
                            for (let k in s.val()) {
                                let obj = {title: s.val()[k].title, index: k}
                                step1.push(obj);
                            }
                            this.$data.step1 = step1;
                            window.db.ref("/locations/step2").once("value").then(s => {
                                let step2 = [];
                                for (let k in s.val()) {
                                    let obj = {title: s.val()[k].title, index: k, parent: s.val()[k].parent}
                                    step2.push(obj);
                                }
                                this.$data.step2 = step2;
                                window.db.ref("/locations/step3").once("value").then(s => {
                                    let arr = [];
                                    for (let k in s.val()) {
                                        let obj = {title: s.val()[k].title, index: k, parent: s.val()[k].parent}
                                        arr.push(obj);
                                    }
                                    this.$data.locationData = arr;
                                    this.$data.locationFilterArea = true;
                                });
                            });
                        });
                    } else {
                        this.$data.locationFilterArea = true;
                    }
                }

            }, dateFilterHandler: function () {
                if (this.$data.dateFilterArea) {
                    this.$data.dateFilterArea = false;
                } else {
                    this.$data.dateFilterArea = true;
                }
            }, hourFilterHandler: function () {
                if (this.$data.hourFilterArea) {
                    this.$data.hourFilterArea = false;
                } else {
                    this.$data.hourFilterArea = true;
                }
            },
        }, data: function () {
            return {
                step1ready: true,
                step2ready: false,
                locationReady: false,
                message: "",
                locationData: null,
                step1: null,
                step2: null,
                step1Selected: null,
                step2Selected: null,
                step2SelectedOld: null,
                locationFilterArea: false,
                dateFilterArea: false,
                hourFilterArea: false,
            }
        }
    }
</script>

<style scoped>
    @media only screen and (min-width: 720px) {
        .filter-container{
            transition: 0.3s;
            width: 40vw!important;
            left: 30vw!important;
        }
        .active-filter{
            min-width: 15vw!important;
            max-width: 25vw!important;
        }
    }
    .filter-container {
        position: absolute;
        left: 15vw;
        top: 15vh;
        width: 70vw;
        height: 70vh;
        border-radius: 4px;
        background-color: #444444;
        overflow-y: scroll;
    }
    .desktop .filter-area-stepper [role=listitem]:hover{
        background-color: #b6396c;
        color: #cccccc;
    }
    .mobile .filter-area-stepper [role=listitem]:active{
        background-color: #b6396c;
        color: #cccccc;
    }
    .filter-container header {
        display: grid;
        grid-template-columns: 5fr 1fr;
        align-items: center;
        font-size: 0.9em;
        color: #FFF;
        background: rgb(147, 39, 143);
        background: linear-gradient(90deg, rgba(147, 39, 143, 1) 0%, rgba(241, 87, 36, 1) 100%);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    span.close{
        text-align: center;
    }
    .filter-container h2 {
        margin: 10px;
    }

    .filter-container main {
        display: grid;
        grid-template-columns: 1fr;
        color: #cccccc;
    }

    main strong {
        font-size: 0.8em;
        margin-top: 10px;
        text-align: center;
        color: #fbae17;
    }

    .active-filter-box {
        display: flex;
        overflow-x: scroll;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .active-filter {
        display: grid;
        grid-template-columns: 3fr 1fr;
        align-items: center;
        font-size: 0.6em;
        background-color: #f15724;
        color: white;
        border-radius: 10px;
        padding: 5px;
        margin-right: 10px;
        min-width: 40vw;
        max-width: 50vw;
    }

    .active-filter strong {
        font-size: 1.2em;
        margin-top: 0;
        text-align: left;
        color: white;
    }

    .active-filter.Mekan {
        background-color: #f15724;
        color: white;
    }

    .active-filter.Tarih {
        background-color: #93278F;
        color: white;
    }

    .active-filter.Saat {
        background-color: #b6396c;
        color: white;
    }

    .active-filter span {
        font-size: 2em;
        align-self: start;
        margin-left: 5px;
        color: white;
        text-align: right;
    }

    .filter-container main h3 {
        margin: 0;
    }

    .filter-activation {
        font-size: 1em;
        background-color: #fbae17;
        color: #111;
        border-radius: 5px;
        margin-top: 10px;
        width: -webkit-fill-available;
        text-align: center;
        padding: 5px;
        align-self: center;
        justify-self: center;
    }

    .filter-activation.selected {
        background: rgb(147, 39, 143);
        background: linear-gradient(90deg, rgba(147, 39, 143, 1) 0%, rgba(241, 87, 36, 1) 100%);
        color: #ccc;
    }
    .desktop .filter-activation:hover {
        background: rgb(147, 39, 143);
        background: linear-gradient(90deg, rgba(147, 39, 143, 1) 0%, rgba(241, 87, 36, 1) 100%);
        color: #ccc;
    }
    .mobile .filter-activation:active {
        background: rgb(147, 39, 143);
        background: linear-gradient(90deg, rgba(147, 39, 143, 1) 0%, rgba(241, 87, 36, 1) 100%);
        color: #ccc;
    }

    .filter-area {
        height: 0;
        transition: 0.5s;
        overflow-y: scroll;
        font-size: 0.8em;
        display: grid;
    }

    .filter-area.active {
        height: 30vh;
    }

    .filter-area-form {
        display: grid;
        align-content: space-evenly;
    }

    .filter-area-form label {
        align-self: center;
        font-weight: bolder;
    }

    .filter-area-form input {
        background-color: #fbae17;
        color: #111111;
        border-radius: 4px;
        outline: none;
    }

    .filter-area-form input:focus {
        background-color: rgba(251, 174, 23, 0.7);
    }

    .filter-area-form strong {
        color: #f15724;
    }


    .filter-area-listitem {
        margin-top: 2px;
        display: grid;
        grid-template-columns: auto 5fr;
        grid-gap: 10px;
        width: 90%;
        align-content: center;
        justify-self: center;
    }

    .filter-area-listitem input:checked ~ label {
        background-color: rgba(251, 174, 23, 0.18);
    }

    .filter-area-listitem label {
        align-self: center;
    }
    .filter-area-stepper{
        display: grid;
        align-content: baseline;
    }
    .location-step {
        width: 90%;
        height: fit-content;
        justify-self: center;
        background-color: #fbae17;
        color: #444;
        border-radius: 4px;
        padding-top: 4px;
        padding-bottom: 4px;
        text-align: center;
        margin-bottom: 2px;
    }

    .location-step.back {
        background-color: #f15724;
        color: white;
    }

    .location-step.step1 {
        font-weight: bolder;
    }

    .execute-button {
        position: sticky;
        bottom: 0;
        height: 30px;
        display: grid;
        align-content: center;
        align-self: center;
        padding: 5px;
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 5px;
        background-color: #93278F;
        color: white;
        text-align: center;
        border-radius: 4px;
    }
</style>
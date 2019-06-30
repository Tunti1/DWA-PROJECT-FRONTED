<template>
    <div id="pracenjeProjekta">
        <div>
            <div id="redak" clsss="redak">
                <h1>Student</h1>
                <b-form-select class="row-item" v-model="trenutni">
                    <option :value="null" disabled="true">Odaberite studenta</option>
                    <option v-for="student in studenti" v-bind:value="student.id" :key="student.id"> {{ student.jmbag }}</option>
                </b-form-select>
            </div>
            <div class="redak redak-2">
                <h2>Ocjene</h2>
                <div>
                    <div class="inside-row">
                        <h3>Seminar</h3>
                        <b-form-input
                                id="input-1"
                                v-model="ocjene.seminar"
                                type="number"
                                :placeholder= "0"
                        ></b-form-input>
                    </div>
                    <div class="inside-row">
                        <h3>Prvi kolokvij</h3>
                        <b-form-input
                                id="input-1"
                                v-model="ocjene.kolokvij1"
                                type="number"
                                :placeholder="0"
                        ></b-form-input>
                    </div>
                    <div class="inside-row">
                        <h3>Drugi kolokvij</h3>
                        <b-form-input
                                id="input-1"
                                v-model="ocjene.kolokvij2"
                                type="number"
                                :placeholder="0"
                        ></b-form-input>
                    </div>
                    <div class="inside-row">
                        <h3>Projekt</h3>
                        <b-form-input
                                id="input-1"
                                v-model="ocjene.bodoviProjekt"
                                type="number"
                                :placeholder="0"
                        ></b-form-input>
                    </div>

                </div>
                <div class="redak redak-3">
                    <h3>Konačni broj bodova: </h3>
                    <b-form-input
                            id="input-1"
                            v-model="ocjene.brojBodova"
                            type="number"
                            :placeholder="0"
                            disabled
                    ></b-form-input>
                </div>
                <div class="redak redak-4">
                    <b-form-input
                            id="input-1"
                            v-model="ocjene.obrazlozenje"
                            type="text"
                            placeholder="Obrazloženje profesoraa"
                    ></b-form-input>
                </div>
            </div>
            <b-button variant="danger" v-on:click="azurirajOcjene" style="margin-bottom: 5%; margin-right: 2%;">Azuiraj trenutne</b-button>
            <b-button variant="danger" v-on:click="dodajOcjene" style="margin-bottom: 5%; margin-right: 2%;">Dodavanje ocjene prvi put</b-button>
            <b-button variant="danger" v-on:click="zbrojiKonacnuOcjenu" style="margin-bottom: 5%;">Zbroji konačnu ocjenu</b-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "StudentGrade",
        data () {
            return {
                trenutni: null,
                odabrani: false,
                studenti: [],
                ocjene: {
                    id:"",
                    seminar: 0,
                    kolokvij1: 0,
                    kolokvij2: 0,
                    bodoviProjekt: 0,
                    brojBodova: 0,
                    obrazlozenje: ''
                },
                sveOcjene: [],
            }
        },
        watch: {
            trenutni : function () {
                this.studentoveOcjene(this.sveOcjene);
            }
        },

        created () {
            this.getStudents();
            this.dohvatiOcjene();
        },
        methods: {
            async getStudents () {
                await axios.get("http://127.0.0.1:5000/studenti")
                    .then((response) => {
                        response.data.studenti.forEach(function(values, key) {
                            this.studenti = values;
                        }, this);
                    })
                    .catch((error) => {
                        alert(error);
                    })
            },

            async dohvatiOcjene () {
                await axios.get("http://127.0.0.1:5000/ocjene")
                    .then((response) => {
                        this.sveOcjene.push(response.data.Ocjene);
                    })
                    .catch((error) => {
                        alert(error);
                    })
            },
            studentoveOcjene : function (ocjene) {
                ocjene.forEach(function(value, key) {
                    value.forEach(function(value, key) {
                        if (this.trenutni === value.student) {
                            this.ocjene = value;
                        }
                    }, this);
                }, this);
            },
            dodajOcjene : function () {

                const konacneocjene = {
                    kolokvij1: this.ocjene.kolokvij1,
                    kolokvij2: this.ocjene.kolokvij2,
                    seminar: this.ocjene.seminar,
                    brojBodova: this.ocjene.brojBodova,
                    bodoviProjekt: this.ocjene.bodoviProjekt,
                    obrazlozenje: this.ocjene.obrazlozenje,
                    student: this.trenutni
                };
                axios.post("http://127.0.0.1:5000/ocjene", konacneocjene)
                    .then(() => {
                        alert('Ocjene su uspješno dodane!');
                    })
                    .catch((error) => {
                        alert(error);
                    })

            },
            azurirajOcjene : function () {
                const konacneocjene_ = {
                    id: this.ocjene.id,
                    kolokvij1: this.ocjene.kolokvij1,
                    kolokvij2: this.ocjene.kolokvij2,
                    seminar: this.ocjene.seminar,
                    brojBodova: this.ocjene.brojBodova,
                    bodoviProjekt: this.ocjene.bodoviprojekt,
                    obrazlozenje: this.ocjene.obrazlozenje,
                    student: this.trenutni
                };
                axios.put("http://127.0.0.1:5000/ocjene", konacneocjene_ )
                    .then(() => {
                        alert('Ocjene ažurirane.')
                    })
                    .catch((error) => {
                        alert(error);
                    })
            },
            zbrojiKonacnuOcjenu : function () {
                var k = parseInt(this.ocjene.kolokvij1, 10) + parseInt(this.ocjene.kolokvij2, 10);
                k = k/10;
                k = k * parseInt(this.ocjene.bodoviProjekt, 10) + parseInt(this.ocjene.seminar, 10);
                this.ocjene.brojBodova = k;
            }
        }
    }
</script>

<style>
    #redak{
        max-width: 800px;
        margin: 0 auto;
    }
    .redak{
        max-width: 800px;
        margin: 0 auto;
    }
    .inside-row h3{
        float: left;
    }
    .redak-2{
        margin-top: 2%;
        margin-bottom: 2%;
        padding: 3% 3% 3% 3%;
        box-shadow: 0 0 5px 4px rgba(209,184,209,1);
    }
    .redak-4{
        margin-top: 2%;
    }
</style>
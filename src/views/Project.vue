<template>
    <div id="project">
        <div class="img">
            <b-img left alt="Naslovan slika" :src="image"></b-img>
        </div>
        <div id ="redak"class="redak-2">
            <b-form>
                <b-form-group id="input-group-1">
                    <div class="input-1">

                        <b-form-select class="row-item" v-model="trenutni">
                            <option :value="null" disabled="true">Odaberite tim</option>
                            <option v-for="tim in timovi" v-bind:value="tim.id" :key="tim.id"> {{ tim.naziv }}</option>
                        </b-form-select>
                    </div>
                    <b-form-input
                            id="input-1"
                            v-model="projekt.link"
                            type="text"
                            required
                            placeholder="Link"
                    ></b-form-input>
                    <b-form-input
                            id="input-1"
                            v-model="projekt.opis"
                            type="text"
                            required
                            placeholder="..."
                    ></b-form-input>
                </b-form-group>
            </b-form>
        </div>
            <b-button variant="danger" v-on:click="predajProjekt">Submit</b-button>
        <div>
            <table class="table table-bordered table-striped mt-4">
                <tr>
                    <th>Opis</th>
                    <th>Link</th>
                    <th>Grupa</th>

                <tr v-for="p in projekti" :key="p.id">
                    <td>{{p.opis}}</td>
                     <td>{{p.link}}</td>

                    <td>
                        <ul>
                            <li v-for="g in p.grupe" :key="g.id">{{g.naziv}}</li>
                        </ul>
                    </td>

                </tr>
            </table>


        </div>

    </div>







</template>

<script>
    import axios from 'axios';


    export default {
        name: "Project",
        beforeMount(){  this.getData();
        },
        data () {
            return {
                projekti: null,
                projekt: {
                    tim: '',
                    link: '',
                    opis: ''
                },
                timovi: [
                    { id: '', naziv: '' }
                ],
                trenutni: null,
            }
        },
        created () {
            this.getTeam();
        },
        methods: {
            getData() {

                axios.get("http://127.0.0.1:5000/projekti").then(({data}) => {
                    this.projekti = data.Studentov_projekt;

                });
            },
            getTeam () {
                axios.get("http://127.0.0.1:5000/grupe")
                    .then((response) => {
                        this.timovi = response.data.Studentova_grupa;
                        console.log(response);
                        console.log(this.timovi);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            },
            predajProjekt : function () {
                console.log(this.trenutni);
                const projekt = {
                    link: this.projekt.link,
                    opis: this.projekt.opis,

                    grupe: this.trenutni
                };
                axios.post("http://127.0.0.1:5000/projekti", projekt)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        alert(error);
                    })
            }
        },
        computed: {
            image () {

                return require('../assets/download (1).png');
            }
        }
    }
</script>

<style scoped>
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
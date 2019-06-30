<template>
    <div id="team" class="top-row">
        <div class="img">
            <b-img up alt="Naslovan slika" :src="image"></b-img>
        </div>


        <div id="redak" class="inside-row">
            <b-form>
                    <b-form-group id="input-group-1">
                        <b-form-input
                                id="input-1"
                                v-model="nazivTima"
                                type="text"
                                required
                                placeholder="Upišite naziv tima"
                        ></b-form-input>
                        <div class="inside-row">

                            <b-form-select class="row-item" v-model="trenutni">
                                <option :value="null" disabled="true">Odaberite studenta</option>
                                <option v-for="student in studenti" v-bind:value="student.jmbag" :key="student.id"> {{ student.jmbag }}</option>
                            </b-form-select>
                            <b-button @click="addStudent" class="row-item" variant="success">Dodaj studenta</b-button>
                        </div>

                </b-form-group>
            </b-form>
        </div>
        <div class="izvjestaj">
            <div class="mt-2">
                Naziv grupe: {{ nazivTima }}
            </div>
            <div class="popis-studenata">

                    <li v-for="item in odabraniStudentiJmbag" :key="item">{{ item }}</li>

            </div>
        </div>
        <b-button variant="danger" v-on:click="dodajgrupu">Dodaj grupu</b-button>
        <div>
            <table class="table table-bordered table-striped mt-4">
                <tr>
                    <th>Naziv grupe</th>
                    <th>Studenti</th>
                    <tr v-for="g in groups" :key="g.id">
                        <td>{{g.naziv}}</td>
                        <td>
                            <ul>
                                <li v-for="s in g.studenti" :key="s.id">{{s.jmbag}}</li>
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
        name: "Grupa",

        beforeMount(){
            this.getData();
        },
        data () {
            return {
                groups: null,
                fields: ['Naziv', 'Studenti', 'Projekt'],
                grupe: ["naziv","studenti []"],
                timovi: [
                    { id: '', naziv: '' }],
                nazivTima: '',
                // TRENUTNI U SELECTU
                trenutni: null,
                // STUDENTI ODABRANI ZA PROJEKT
                odabraniStudentiId: [],
                odabraniStudentiJmbag: [],
                //SVI STUDENTI I SVI NJIHOVI ATRIBUTI
                studenti: [],
                projekti: [],
                tablica: [{}]
            }
        },
        async created () {
            await this.getTeam();
            await this.getStudents();
            await this.getProject();
        },
        watch: {
            projekti: function () {
                this.popuniTablicu();
            },
            timovi: function () {
                this.popuniTablicu();
            },
            studenti: function () {
                this.popuniTablicu();
            }
        },
        methods: {
            getData() {

                axios.get("http://127.0.0.1:5000/grupe").then(({data}) => {
                    this.groups = data.Studentova_grupa;

                });
            },
            getTeam () {
                axios.get("http://127.0.0.1:5000/grupe")
                    .then((response) => {
                        console.log('res timovi: ', response);
                        this.timovi = response.data.Studentova_grupa;
                        return true;
                    })
                    .catch((error) => {
                        alert(error);
                    });
            },
             getProject () {
                 axios.get("http://127.0.0.1:5000/projekti")
                    .then((response) => {
                        response.data.Studentov_projekt.forEach(function(value, key) {
                            this.projekti.push(value);
                        }, this);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            },
             getStudents () {
               axios.get("http://127.0.0.1:5000/studenti")
                  .then((response) => {
                      response.data.studenti.forEach(function(value, key) {
                          value.forEach(function(value, key) {
                              this.studenti.push(value);
                          }, this);
                      }, this);
                  })
                  .catch((error) => {
                    alert(error);
                  });
            },
            async dodajgrupu () {
                const grupa = {
                    naziv: this.nazivTima,
                    studenti: this.odabraniStudentiId
                };
                await axios.post("http://127.0.0.1:5000/grupe", grupa)
                    .then(() => {
                        this.nazivTima= "";

                        this.odabraniStudentiJmbag= "";
                        this.popuniTablicu()
                    })
                    .catch((error) => {
                        alert(error);
                    })
            },
            addStudent : function () {
                if (this.trenutni === null) {
                    return
                }else{
                    //PROLAZIMO KROZ STUDENTE (OBJEKTE)
                    this.studenti.forEach(function(value, key) {
                        // USPOREDUJE JMBAG
                       if (this.trenutni === this.studenti[key].jmbag) {
                           // DODAJE STUDENTOV ID U LISTU ODABRANIH STUDENATA ZA ID
                           this.odabraniStudentiId.push(this.studenti[key].id);
                           // DODAJE STUDENTOV JMBAG U LISTU ODABRANIH STUDENATA ZA JMBAG
                           this.odabraniStudentiJmbag.push(this.studenti[key].jmbag);
                       }
                    }, this);

                }
            },
        },

        computed: {
            image () {
                return require('../assets/189-1891948_team-icon-business.png');
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

</style>
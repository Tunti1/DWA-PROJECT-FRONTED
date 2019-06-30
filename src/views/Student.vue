<template>
    <div id="student">
        <div class="img">
            <b-img left alt="Naslovan slika" :src="image"></b-img>
        </div>
        <div class="forma">
            <b-form>
                <b-form-group id="input-group-1">
                    <b-form-input
                            id="input-1"
                            v-model="student.jmbag"
                            type="text"
                            required
                            placeholder="Upišite svoj JMBAG"
                    ></b-form-input>
                    <b-form-input
                            id="input-1"
                            v-model="student.ime"
                            type="text"
                            required
                            placeholder="Upišite svoje ime"
                    ></b-form-input>
                    <b-form-input
                            id="input-1"
                            v-model="student.prezime"
                            type="text"
                            required
                            placeholder="Upišite svoje prezime"
                    ></b-form-input>
                </b-form-group>
            </b-form>
        </div>
            <b-button variant="danger" v-on:click="onSubmit">Submit</b-button>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Student",
        data () {
            return {
                student: {
                    jmbag: '',
                    ime: '',
                    Prezime: '',
                }
            }
        },
        created () {
          this.getStudents();
        },
        methods: {
            getStudents () {
                axios.get("http://127.0.0.1:5000/studenti")
                    .then((response) => {
                        console.log('tu sam');
                        this.test = response;
                        console.log(response);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            },
            onSubmit : function () {
                const Student = {
                jmbag: this.student.jmbag,
                ime: this.student.ime,
                Prezime:this.student.prezime,
                                 };
                axios.post("http://127.0.0.1:5000/studenti", Student)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        alert(error);
                    })
            },

        },
        computed: {
            image () {
                return require('../assets/download.png');
            }
        }

    }
</script>

<style scoped>

</style>
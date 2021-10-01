<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-card-text>
      <p class="text-2xl font-weight-semibold text--primary mb-2">
        Yeni Müşteri Ekle
      </p>
    </v-card-text>
    <v-text-field
      v-model="memberData.nameSurname"
      outlined
      label="İsim-Soyisim"
      placeholder="Erkan Kabil"
      :rules="nameRules"
      hide-details
      class="mb-3"
      required
    ></v-text-field>

    <v-text-field
      v-model="memberData.email"
      outlined
      label="Email"
      :rules="emailRules"

      placeholder="erkan@example.com"
      hide-details
      class="mb-3"
      required
    ></v-text-field>

    <v-select
      v-model="memberData.city"
      :items="citys"
      item-text="label"
      item-value="value"
      outlined
      label="İl"
      :rules="[v => !!v || 'İl seçiniz']"
      hide-details
      class="mb-3"
      required
      @change="handleCitySelect"
    ></v-select>

    <v-select
      v-if="districts.length>0"
      v-model="memberData.district"
      :items="districts"
      item-text="ilce"
      item-value="ilce"
      outlined
      label="İlçe"
      :rules="[v => !!v || 'İlçe seçiniz']"
      hide-details
      class="mb-3"
      required
      @change="handleDistrictSelect"
    ></v-select>

    <v-select
      v-if="neighbourhoods.length>0"
      v-model="memberData.neighbourhood"
      :items="neighbourhoods"
      item-text="mahalle"
      item-value="id"
      outlined
      class="mb-3"
      :rules="[v => !!v || 'Mahalle seçiniz']"
      label="Mahalle"
      hide-details
      required
    ></v-select>

    <v-btn
      :disabled="!valid"
      color="primary"
      class="mt-6 py-6"
      @click="handleSubmit"
    >
      KAYDET
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      valid: false,
      nameRules: [
        v => !!v || 'İsim-Soyisim alanı gerekli',
        v => (v && v.length <= 32) || 'İsim-Soyisim alanı 32 karakterden az olmalı',
      ],
      emailRules: [
        v => !!v || 'E-mail alanı gerekli',
        v => /.+@.+\..+/.test(v) || 'Lütfen geçerli bir e-mail giriniz',
      ],
      memberData: {
        nameSurname: '',
        email: '',
        city: null,
        district: null,
        neighbourhood: null,
      },
      citys: [
        { label: 'İstanbul', value: 34 },
        { label: 'İzmir', value: 35 },
        { label: 'Ankara', value: 6 },
      ],
      districts: [],
      neighbourhoods: [],
    }
  },
  methods: {
    handleCitySelect() {
      this.$store.dispatch('getDistricts', { city: this.memberData.city }).then(response => {
        this.districts = response?.data
      }).catch(error => {
        console.error(error)
      })
    },
    handleDistrictSelect() {
      this.$store.dispatch('getNeighborhoods', { city: this.memberData.city, district: this.memberData.district }).then(response => {
        this.neighbourhoods = response?.data
      }).catch(error => {
        console.error(error)
      })
    },
    handleSubmit() {
      if (this.$refs.form.validate()) {
        /* TODO - Müşteri Kayıt İşlemi */
      }
    },
  },

}
</script>

<style scoped>

</style>

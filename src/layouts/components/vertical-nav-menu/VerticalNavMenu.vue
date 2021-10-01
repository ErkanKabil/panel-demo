<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <v-slide-x-transition>
          <h2 class="app-title text--primary">
            Erkan's Demo
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list
      expand
      shaped
      class="vertical-nav-menu-items pr-5"
    >
      <nav-menu-section-title title="USER"></nav-menu-section-title>
      <nav-menu-link
        title="Rehber"
        :to="{ name: 'guide' }"
        :icon="icons.mdiHomeOutline"
      ></nav-menu-link>
      <nav-menu-link
        title="Rapor"
        :to="{ name: 'report' }"
        :icon="icons.mdiHomeOutline"
      ></nav-menu-link>
      <template v-if="isLogin">
        <nav-menu-section-title title="ADMIN"></nav-menu-section-title>
        <nav-menu-link
          title="Müşteri Listesi"
          :to="{ name: 'member-list' }"
          :icon="icons.mdiHomeOutline"
        ></nav-menu-link>
        <nav-menu-link
          title="Müşteri Oluştur"
          :to="{ name: 'create-member' }"
          :icon="icons.mdiHomeOutline"
        ></nav-menu-link>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
} from '@mdi/js'
import NavMenuLink from './components/NavMenuLink.vue'
import NavMenuSectionTitle from './components/NavMenuSectionTitle.vue'

export default {
  components: {
    NavMenuLink,
    NavMenuSectionTitle,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  setup() {
    return {
      icons: {
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
      },
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.GET_LOGIN_INFO
    },
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

// You can remove below style
// Upgrade Banner
.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>

<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-sm">

      <div class="col">
        <q-input
          autogrow
          class="new-tuitte"
          bottom-slots
          v-model="newTuitteContent"
          placeholder="What's up?"
          counter
          maxlength="420">
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://avatars.githubusercontent.com/u/74455265?v=4" alt="Your profile picture">
            </q-avatar>
          </template>
        </q-input>
      </div>

      <div class="col col-shrink">
        <q-btn
              :disable="!newTuitteContent"
              class="q-mb-lg"
              unelevated
              rounded
              no-caps
              color="primary"
              label="Tuitte" />
      </div>
    </div>
    <q-separator />
  </q-page>
</template>

<script>
export default {
  name: 'PageHome',
  data() {
    return {
      newTuitteContent: ''
    }
  }
}
</script>

<style lang="sass">
.new-tuitte
  textarea
    font-size: 20px
    line-height: 1.4 !important
</style>
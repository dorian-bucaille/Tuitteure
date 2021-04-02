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

    <q-separator
      class="divider"
      size="10px"
      color="grey-1" />

    <q-list>
      <q-item class="q-py-md">
        <q-item-section avatar top>
          <q-avatar size="xl">
              <img src="https://avatars.githubusercontent.com/u/74455265?v=4" alt="Your profile picture">
            </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Dorian Bucaille</strong>
            <span class="text-grey-7">
              @dorian_bucaille
            </span>
          </q-item-label>

          <q-item-label class="tuitte-content text-body1">Hello there :) Hope you're doing good! I am currently working on this Twitter clone
            project by watching a great tutorial from freeCodeCamp.org.
            It is a really good channel, they have taught me a lot about coding!
          </q-item-label>

          <div class="tuitte-icons row justify-between q-mt-sm">
            <q-btn
              flat
              size=sm
              round
              color="grey"
              icon="far fa-comment" />

              <q-btn
              flat
              size=sm
              round
              color="grey"
              icon="fas fa-retweet" />

              <q-btn
              flat
              size=sm
              round
              color="grey"
              icon="far fa-heart" />

              <q-btn
              flat
              size=sm
              round
              color="grey"
              icon="fas fa-trash" />
          </div>

        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>

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

.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.tuitte-content
  white-space: pre-line

.tuitte-icons
  margin-left: -5px
</style>
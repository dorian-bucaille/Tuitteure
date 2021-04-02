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
              @click="addNewTuitte"
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

    <q-list separator>
      <q-item
        v-for="tuitte in tuittes"
        :key="tuitte.date"
        class="q-py-md">
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

          <q-item-label class="tuitte-content text-body1">{{tuitte.content}}
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
              @click="deleteTuitte(tuitte)"
              flat
              size=sm
              round
              color="grey"
              icon="fas fa-trash" />
          </div>

        </q-item-section>

        <q-item-section side top>
          {{ tuitte.date | relativeDate}} ago
        </q-item-section>
      </q-item>
    </q-list>

  </q-page>
</template>

<script>
import { formatDistance } from 'date-fns'

export default {
  name: 'PageHome',
  data() {
    return {
      newTuitteContent: '',
      tuittes: [
        {
          content: 'But I must explain to you how all this mistaken idea of denouncing pleasure \
                    and praising pain was born and I will give you a complete account of the system, and \
                    expound the actual teachings of the great explorer of the truth, the master-builder of \
                    human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is \
                    pleasure, but because those who do not know how to pursue pleasure rationally encounter \
                    consequences that are extremely painful.',
          date: 1617400832717
        },
        {
          content: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, \
                    because it is pain, but because occasionally circumstances occur in which toil and pain can procure \
                    him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical \
                    exercise, except to obtain some advantage from it? But who has any right to find fault with a man who \
                    chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces \
                    no resultant pleasure?',
          date: 1617400875655
        }
      ]
    }
  },
  methods: {
    addNewTuitte() {
      console.log('addNewTuitte')
      let newTuitte = {
        content: this.newTuitteContent,
        date: Date.now()
      }
      this.tuittes.unshift(newTuitte)
    },
    deleteTuitte(tuitte) {
      console.log('Delete tuitte: ', tuitte)
      let dateToDelete = tuitte.date
      let index = this.tuittes.findIndex(tuitte => tuitte.date === dateToDelete)
      console.log('Index to be deleted: ', index)
      this.tuittes.splice(index, 1)
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date())
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
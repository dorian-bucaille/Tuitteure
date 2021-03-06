<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
      <div class="q-py-lg q-px-md row items-end q-col-gutter-sm">
        
        <!-- Writing zone -->
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

        <!-- Tuitte button -->
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

      <!-- Separator between writing zone and timeline -->
      <q-separator
      divider_dark
        :class="isDarkMode() ? 'divider_dark' : 'divider_light'"
        size="10px"
        :color="isDarkMode() ? 'black' : 'grey-1'"/>

      <!-- Timeline -->
      <q-list separator>

        <!-- Animations -->
        <transition-group
          appear
          enter-active-class="animated jackInTheBox slow"
          leave-active-class="animated fadeOutRight slow"
        >
          <!-- Tuitte -->
          <q-item
            v-for="tuitte in tuittes"
            :key="tuitte.id"
            class="tuitte q-py-md">

            <!-- Profile picture -->
            <q-item-section avatar top>
              <q-avatar size="xl">
                  <img src="https://avatars.githubusercontent.com/u/74455265?v=4" alt="Your profile picture">
                </q-avatar>
            </q-item-section>

            <!-- Name, username and date -->
            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Dorian Bucaille</strong>
                <span class="text-grey-7">
                  @dorian_bucaille
                  <br class="lt-md">&bull; {{ tuitte.date | relativeDate}} ago
                </span>
              </q-item-label>

              <!-- Actual tuitte content -->
              <q-item-label class="tuitte-content text-body1">{{tuitte.content}}
              </q-item-label>

              <!-- Action buttons -->
              <div class="tuitte-icons row justify-between q-mt-sm">
                
                <!-- Comment -->
                <q-btn
                  flat
                  size=sm
                  round
                  color="grey"
                  icon="far fa-comment" />

                  <!-- Retuitte -->
                  <q-btn
                  flat
                  size=sm
                  round
                  color="grey"
                  icon="fas fa-retweet" />

                  <!-- Like -->
                  <q-btn
                  @click="toggleLiked(tuitte)"
                  flat
                  size=sm
                  round
                  :color="tuitte.liked ? 'red' : 'grey'"
                  :icon="tuitte.liked ? 'fas fa-heart' : 'far fa-heart'" />

                  <!-- Delete -->
                  <q-btn
                  @click="deleteTuitte(tuitte)"
                  flat
                  size=sm
                  round
                  color="grey"
                  icon="fas fa-trash" />
              </div>
            </q-item-section>

          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'

export default {
  name: 'PageHome',
  data() {
    return {
      newTuitteContent: '',
      tuittes: [
         /* {
          content: 'But I must explain to you how all this mistaken idea of denouncing pleasure \
                    and praising pain was born and I will give you a complete account of the system, and \
                    expound the actual teachings of the great explorer of the truth, the master-builder of \
                    human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is \
                    pleasure, but because those who do not know how to pursue pleasure rationally encounter \
                    consequences that are extremely painful.',
          date: 1617400832717,
          liked: false,
          id: 'ID1'
        },
        {
          content: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, \
                    because it is pain, but because occasionally circumstances occur in which toil and pain can procure \
                    him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical \
                    exercise, except to obtain some advantage from it? But who has any right to find fault with a man who \
                    chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces \
                    no resultant pleasure?',
          date: 1617400875655,
          liked: true,
          id: 'ID2'
        }  */
      ]
    }
  },
  methods: {
    addNewTuitte() {
      console.log('addNewTuitte')
      let newTuitte = {
        content: this.newTuitteContent,
        date: Date.now(),
        liked: false
      }
      // this.tuittes.unshift(newTuitte)
      db.collection("tuittes").add(newTuitte).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });

      this.newTuitteContent = ''
    },

    deleteTuitte(tuitte) {
        db.collection("tuittes").doc(tuitte.id).delete().then(() => {
        console.log("Document successfully deleted!")
      }).catch((error) => {
        console.error("Error removing document: ", error)
      })
    },

    toggleLiked(tuitte) {
      db.collection("tuittes").doc(tuitte.id).update({
          liked: !tuitte.liked
      })
      .then(() => {
          console.log("Document successfully updated!")
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error)
      })
    },

    toggleDark() {
      this.$q.dark.set(!this.$q.dark.isActive)
    },
    
    isDarkMode() {
      return this.$q.dark.isActive
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date())
    }
  },
  mounted() {
    db.collection('tuittes').orderBy('date').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let tuitteChange = change.doc.data()
          tuitteChange.id = change.doc.id  // Set ID to Firebase auo-generated ID
          if (change.type === "added") {
            console.log("New tuitte: ", tuitteChange)
            this.tuittes.unshift(tuitteChange)
          }
          if (change.type === "modified") {
            console.log("Modified tuitte: ", tuitteChange)
            let index = this.tuittes.findIndex(tuitte => tuitte.id === tuitteChange.id)
            Object.assign(this.tuittes[index], tuitteChange)
          }
          if (change.type === "removed") {
            console.log("Removed tuitte: ", tuitteChange)
            let index = this.tuittes.findIndex(tuitte => tuitte.id === tuitteChange.id)
            this.tuittes.splice(index, 1)
          }
        })
    })
  }
}
</script>

<style lang="sass">
.new-tuitte
  textarea
    font-size: 20px
    line-height: 1.4 !important

.divider_light
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4

.divider_dark
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-8

.tuitte:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0, 0.12)

.tuitte-content
  white-space: pre-line

.tuitte-icons
  margin-left: -5px
</style>
<template>
  <div class="home">
    <div class="grid-container">
      <!-- Questions and answers section-->
      <div id="q-and-a" class="grid-item">
        <!-- Topbar section that houses the exam title and navigation buttons -->
        <section id="qa-topbar">
          <h3 class="font-color-shade">{{ examTitle }}</h3>
          <div id="q-nav">
            <button class="q-nav-btn" @click="prevQuestion">
              <font-awesome-icon icon="chevron-left" style="color: #f09d34;"></font-awesome-icon>
            </button>
            <p>{{ currQuestionNum }}</p>
            <button class="q-nav-btn" @click="nextQuestion">
              <font-awesome-icon icon="chevron-right" style="color: #f09d34;"></font-awesome-icon>
            </button>
          </div>        
        </section>

        <!-- Question section -->
        <section id="question-section" class="grid-item">
          <p class="font-color-shade font-sm">{{ questions[currQuestionNum-1] }}</p>
        </section>

        <!-- Aswers choice section -->
        <section id="answer-section">
          <div v-for="choice in answers[currQuestionNum-1]" :key="choice.key" ref="choice" class="choice">
            <button class="choice-button" v-on:click="answerClick(choice.key)">{{ choice.key }}</button>
            <p class="font-sm font-color-shade">{{ choice.answer }}</p>
          </div>
        </section>

        <!-- Footer section that houses the question navigation buttons -->
        <section id="qa-footer">
          <div id="q-nav">
            <button class="q-nav-btn" @click="prevQuestion">
              <font-awesome-icon icon="chevron-left" style="color: #f09d34;"></font-awesome-icon>
            </button>
            <p>{{ currQuestionNum }}</p>
            <button class="q-nav-btn" @click="nextQuestion">
              <font-awesome-icon icon="chevron-right" style="color: #f09d34;"></font-awesome-icon>
            </button>
          </div>   
        </section>
      </div>

      <!-- Time section, show how much time left the user has -->
      <div id="time-left" class="grid-item"></div>

      <!-- Summary section, show how many answered and unaswered question -->
      <div id="summary" class="grid-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      examTitle: "TPS - Penalaran Umum",
      currQuestionNum: 1,
      questions: [
        "Siapa nama kamu?", 
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique enim sem, a gravida lacus faucibus faucibus. Maecenas dapibus tellus nunc, eu congue elit faucibus luctus. Ut purus augue, convallis eget odio ac, venenatis finibus sapien. Vestibulum cursus mauris pellentesque tempus convallis. Morbi iaculis odio sit amet risus porta, quis congue mauris scelerisque. Pellentesque at elit efficitur, iaculis velit eu, faucibus magna. Nunc pulvinar arcu at euismod tincidunt. Suspendisse interdum blandit massa, ut efficitur sapien tristique vel. Ut vitae ultrices massa."
      ],
      answers: [
        [
          {key: "A", answer: "Si A"},
          {key: "B", answer: "Si B"},
          {key: "C", answer: "Si C"},
          {key: "D", answer: "Si D"},
          {key: "E", answer: "Si E"},
        ],
        [
          {key: "A", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
          {key: "B", answer: "Ut tristique enim sem, a gravida lacus faucibus faucibus. "},
          {key: "C", answer: "Maecenas dapibus tellus nunc, eu congue elit faucibus luctus."},
        ]
      ],
      pickedAnswers: []
    }
  },
  methods: {
    answerClick: function (key) {
      // create a mapping to be used when selecting ref element
      var choiceKeyIdxMap = {}
      this.answers[this.currQuestionNum-1].forEach((choice, idx) => {
          choiceKeyIdxMap[choice.key] = idx
      })

      // change selected button apperance and pickedAnswer
      var button = this.$refs.choice[choiceKeyIdxMap[key]].children[0]
      
      if (button.classList.contains('choice-button-clicked')) {
        button.classList.remove('choice-button-clicked')
        this.pickedAnswers[this.currQuestionNum-1] = null
      } else {

        // remove any choice-button-clicked class from other button
        this.$refs.choice.forEach((el) => {
          el.children[0].classList.remove('choice-button-clicked')
        })

        // add the class to the button
        button.classList.add('choice-button-clicked')
        this.pickedAnswers[this.currQuestionNum-1] = key
      }      
    },
    prevQuestion: function() {
      if (this.currQuestionNum > 1){

        // remove any choice-button-clicked class from all button
        this.$refs.choice.forEach((el) => {
          el.children[0].classList.remove('choice-button-clicked')
        })

        this.currQuestionNum--
      }
    },
    nextQuestion: function() {
      if (this.currQuestionNum < this.questions.length) {

        // remove any choice-button-clicked class from all button
        this.$refs.choice.forEach((el) => {
          el.children[0].classList.remove('choice-button-clicked')
        })

        this.currQuestionNum++
      }
    }
  },
  updated: function() {
    this.$nextTick(function() {
      if (this.pickedAnswers[this.currQuestionNum-1] != null) {
        // storing key
        var key = this.pickedAnswers[this.currQuestionNum-1]
        
        // create a mapping to be used when selecting ref element
        var choiceKeyIdxMap = {}
        this.answers[this.currQuestionNum-1].forEach((choice, idx) => {
            choiceKeyIdxMap[choice.key] = idx
        })
        
        // change selected button apperance and pickedAnswer
        var button = this.$refs.choice[choiceKeyIdxMap[key]].children[0]
        button.classList.add('choice-button-clicked')
      }
    })
  }
};
</script>

<style scoped>
button {
  border: none;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
}

button:focus{
  outline: none;
  box-shadow: 0 0 0 3px rgba(21, 156, 228, 0.4);
}

.home {
  margin: 30px auto;
  width: 800px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(100px, auto);
}

.grid-item {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  padding: 20px;
}

.q-nav-btn {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  border-radius: 100%;
  padding: 10px 12px;
}

.font-color-shade{
  color: rgba(0, 0, 0, 0.7);
}

.font-sm {
  font-size: 0.9rem;
}

.choice {
  margin-bottom: 20px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.choice:last-child {
  margin-bottom: 0;
}

.choice-button {
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  padding: 3px 6px;
  margin-right: 10px;
}

.choice-button-clicked {
  background-color: #f09d34;
  color: white;
}

#q-and-a {
  grid-column: 1 / 4;
  grid-row: 1 / 4;
}

#time-left {
  grid-column: 4 / 6;
  grid-row: 1;
}

#summary {
  grid-column: 4 / 6;
  grid-row: auto;
}

#q-and-a section {
  margin-bottom: 20px;
}

#q-and-a section:last-child {
  margin-bottom: 0;
}

#qa-topbar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

#qa-topbar h3 {
  font-weight: 300;
}

#q-nav {
  display: flex;
  align-items: center;
}

#q-nav p{
  margin: 0 15px;
}

#qa-footer {
  float: right;
}

</style>

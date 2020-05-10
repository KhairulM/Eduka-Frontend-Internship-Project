<template>
  <div class="home">
    <div id="grid-container">
      <!-- Questions and answers section-->
      <div id="q-and-a" class="grid-item">
        <!-- Topbar section that houses the exam title and navigation buttons -->
        <section id="qa-topbar">
          <h3 class="font-color-shade font-light">{{ examTitle }}</h3>
          <div id="q-nav">
            <button class="q-nav-btn" @click="prevQuestion">
              <font-awesome-icon icon="chevron-left" style="color: #f09d34;" />
            </button>
            <p>{{ currQuestionNum }}</p>
            <button class="q-nav-btn" @click="nextQuestion">
              <font-awesome-icon icon="chevron-right" style="color: #f09d34;" />
            </button>
          </div>
        </section>

        <!-- Question section -->
        <section id="question-section" class="grid-item">
          <p class="font-color-shade font-sm">
            {{ questions[currQuestionNum - 1] }}
          </p>
        </section>

        <!-- Aswers choice section -->
        <section id="answer-section">
          <div
            v-for="choice in answers[currQuestionNum - 1]"
            :key="choice.key"
            ref="choice"
            class="choice"
          >
            <button class="choice-button" v-on:click="answerClick(choice.key)">
              {{ choice.key }}
            </button>
            <p class="font-sm font-color-shade">{{ choice.answer }}</p>
          </div>
        </section>

        <!-- Footer section that houses the question navigation buttons -->
        <section id="qa-footer">
          <div id="q-nav">
            <button class="q-nav-btn" @click="prevQuestion">
              <font-awesome-icon icon="chevron-left" style="color: #f09d34;" />
            </button>
            <p>{{ currQuestionNum }}</p>
            <button class="q-nav-btn" @click="nextQuestion">
              <font-awesome-icon icon="chevron-right" style="color: #f09d34;" />
            </button>
          </div>
        </section>
      </div>

      <!-- Time section, show how much time left the user has -->
      <div id="time-left" class="grid-item">
        <TimeIndicator :tleFunc="timeLimitExceeded" />
      </div>

      <!-- Summary section, finish button and show how many answered and unaswered question -->
      <div id="summary" class="grid-item">
        <QuestionIndicator
          :currQuestionNum="currQuestionNum"
          :nbQuestion="questions.length"
          :pickedAnswers="pickedAnswers"
          :changeQuestion="changeQuestion"
          :onClickFinish="onClickFinish"
          :key="changeCount"
        />
      </div>
    </div>

    <!-- Review modal, to pop-up when finished button is clicked -->
    <div id="review-modal" class="grid-item">
      <ReviewModal
        :pickedAnswers="pickedAnswers"
        :key="changeCount"
        :onClickClose="onClickCloseReview"
        :onClickSubmit="onClickSubmit"
      />
    </div>
  </div>
</template>

<script>
import TimeIndicator from "@/components/TimeIndicator.vue";
import QuestionIndicator from "@/components/QuestionIndicator.vue";
import ReviewModal from "@/components/ReviewModal.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    TimeIndicator,
    QuestionIndicator,
    ReviewModal,
  },
  data() {
    return {
      examTitle: "TPS - Penalaran Umum",
      currQuestionNum: 1,
      duration: 90 * 60,
      questions: [],
      answers: [],
      pickedAnswers: [],
      changeCount: 0,
    };
  },
  methods: {
    answerClick: function(key) {
      // create a mapping to be used when selecting ref element
      var choiceKeyIdxMap = {};
      this.answers[this.currQuestionNum - 1].forEach((choice, idx) => {
        choiceKeyIdxMap[choice.key] = idx;
      });

      // change selected button apperance and pickedAnswer
      var button = this.$refs.choice[choiceKeyIdxMap[key]].children[0];

      if (button.classList.contains("choice-button-clicked")) {
        button.classList.remove("choice-button-clicked");
        this.pickedAnswers[this.currQuestionNum - 1] = null;
      } else {
        // remove any choice-button-clicked class from other button
        this.$refs.choice.forEach((el) => {
          el.children[0].classList.remove("choice-button-clicked");
        });

        // add the class to the button
        button.classList.add("choice-button-clicked");
        this.pickedAnswers[this.currQuestionNum - 1] = key;
      }

      // force re-renders of QI component
      this.changeCount++;
    },
    prevQuestion: function() {
      if (this.currQuestionNum > 1) {
        this.currQuestionNum--;

        // force re-renders of QI component
        this.changeCount++;
      }
    },
    nextQuestion: function() {
      if (this.currQuestionNum < this.questions.length) {
        this.currQuestionNum++;

        // force re-renders of QI component
        this.changeCount++;
      }
    },
    timeLimitExceeded: function() {
      // function to be called when time limit is reached
      console.log("TLE");
    },
    changeQuestion: function(num) {
      // on click function for questions indicator
      this.currQuestionNum = num;

      // force re-renders of QI component
      this.changeCount++;
    },
    onClickFinish: function() {
      // show modal
      document.querySelector("#review-modal").style.visibility = "visible";
      document.querySelector("#grid-container").style.pointerEvents = "none";
    },
    onClickCloseReview: function() {
      // hides modal
      document.querySelector("#review-modal").style.visibility = "hidden";
      document.querySelector("#grid-container").style.pointerEvents = "auto";
    },
    onClickSubmit: function() {
      console.log("ExamSubmitted");
    },
  },
  updated: function() {
    this.$nextTick(function() {
      // remove any choice-button-clicked class from all button
      this.$refs.choice.forEach((el) => {
        el.children[0].classList.remove("choice-button-clicked");
      });

      if (this.pickedAnswers[this.currQuestionNum - 1] != null) {
        // storing key
        var key = this.pickedAnswers[this.currQuestionNum - 1];

        // create a mapping to be used when selecting ref element
        var choiceKeyIdxMap = {};
        this.answers[this.currQuestionNum - 1].forEach((choice, idx) => {
          choiceKeyIdxMap[choice.key] = idx;
        });

        // change selected button apperance and pickedAnswer
        var button = this.$refs.choice[choiceKeyIdxMap[key]].children[0];
        button.classList.add("choice-button-clicked");
      }
    });
  },
  mounted: function() {
    // get question and answers data from json server
    axios
      .get("http://localhost:3000/questions")
      .then((res) => (this.questions = res.data));

    axios
      .get("http://localhost:3000/choices")
      .then((res) => (this.answers = res.data));

    // initialize pickedAnswers to n sized null array
    for (var i = 0; i < this.questions.length; i++) {
      this.pickedAnswers[i] = null;
    }

    // propagate changes to components (used for ReviewModal)
    this.changeCount++;
  },
};
</script>

<style>
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

button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(21, 156, 228, 0.4);
}

.home {
  margin: 30px auto;
  width: 800px;
  position: relative;
}

#grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(10px, auto);
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
  padding: 10px 13px;
}

.font-color-shade {
  color: rgba(0, 0, 0, 0.7);
}

.font-sm {
  font-size: 0.9rem;
}

.font-light {
  font-weight: 300;
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
  border: 1px solid #f09d34;
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
  grid-row: 2;
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

#q-nav {
  display: flex;
  align-items: center;
}

#q-nav p {
  margin: 0 15px;
}

#qa-footer {
  float: right;
}

#review-modal {
  visibility: hidden;
  position: absolute;
  z-index: 1;
  top: 25%;
  left: 25%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>

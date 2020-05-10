<template>
  <div id="modal-container">
    <div id="modal-topbar">
      <h3 class="font-color-shade font-light">Review</h3>
      <font-awesome-icon
        @click="onClickClose"
        icon="times"
        style="color: rgba(0, 0, 0, 0.6); cursor: pointer"
      />
    </div>
    <div id="answer-container" class="grid-item">
      <div
        class="answer-unit"
        v-for="unit in compAnswers"
        :key="unit.key"
        ref="answerUnit"
      >
        <div class="answer">
          <h4 class="answer-text font-color-shade">
            {{ unit.answer }}
          </h4>
        </div>
        <h4 class="question-num font-sm font-color-shade font-light">
          {{ ++unit.key }}
        </h4>
      </div>
    </div>
    <button id="submit-button" @click="onClickSubmit">Submit</button>
  </div>
</template>

<script>
export default {
  name: "ReviewModal",
  props: ["pickedAnswers", "onClickSubmit", "onClickClose"],
  computed: {
    compAnswers: function() {
      var result = [];
      for (var i = 0; i < this.pickedAnswers.length; i++) {
        var unit = {};
        unit["key"] = i;
        if (this.pickedAnswers[i] == null) {
          unit["answer"] = "-";
        } else {
          unit["answer"] = this.pickedAnswers[i];
        }

        result.push(unit);
      }
      return result;
    }
  },
  mounted: function() {
    // change apperance for answered questions
    this.$refs.answerUnit.forEach((unit, idx) => {
      var answer = unit.children[0];
      if (this.pickedAnswers[idx] == null) {
        answer.classList.remove("answered");
      } else {
        answer.classList.add("answered");
      }
    });
  }
};
</script>

<style scoped>
.answer {
  border-radius: 100px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  line-height: 30px;
  width: 30px;
  height: 30px;
}

.answered {
  background-color: #f09d34;
  border: 1px solid #f09d34;
}

.answered > .answer-text {
  color: white;
}

.answer-unit {
  text-align: center;
}

.question-num {
  margin-top: 5px;
}

#modal-container {
  width: 400px;
}

#modal-topbar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

#answer-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  margin-top: 10px;
}

#submit-button {
  background-color: #7766ec;
  padding: 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  float: right;
  color: white;
  font-weight: 600;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 0.9em;
}
</style>

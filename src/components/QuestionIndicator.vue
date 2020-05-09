<template>
  <div id="qi-container">
    <div id="answered-desc">
        <h1 id="answered-text">{{ answered }}</h1> 
        <h3 id="answered-info">/ {{ nbQuestion }} answered</h3>
    </div>
    <div id="question-container">
        <button 
            class="qi-button" 
            v-for="num in nbQuestion" 
            :key="num"
            @click="changeQuestion(num)" 
            ref="qiBtn">
                <h4>{{ num }}</h4>
        </button>
    </div>
    <button id="finish-button" @click="onClickFinish">
        <h3>Finish</h3>
        <font-awesome-icon icon="arrow-circle-right" style="color: white;" size="lg" />
    </button>
  </div>
</template>

<script>
export default {
    name: "QuestionIndicator",
    props: [
        'currQuestionNum', 
        'nbQuestion',
        'pickedAnswers',
        'changeQuestion',
        'onClickFinish'],
    computed: {
        answered: function() {          
            return this.pickedAnswers.filter((el) => {
                return el != null
            }).length
        }
    },
    mounted: function() {
        // will be called when attached key prop in parent changes,
        // so we will change the appearace of each question indicator
        // buttons here
        
        this.$refs.qiBtn.forEach((el, idx) => {
            if (idx+1 === this.currQuestionNum) {
                el.classList.add('qi-button-clicked')
            } else {
                if (this.pickedAnswers[idx] != null) {
                    el.classList.add('qi-button-answered')
                } else {
                    el.classList.remove('qi-button-answered')
                }
                el.classList.remove('qi-button-clicked')
            }
        })
    }
}
</script>

<style scoped>
#finish-button {
  background-color: #7766ec;
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
}

#finish-button h3 {
  color: white;
  margin-right: 10px;
}

#question-container{
    margin-top: 6px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 14px;
    padding-right: 0;
    padding-bottom: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
}

#answered-desc{
    margin-left: 5px;
    width: 100%;
}

#answered-desc > *{
    display: inline-block;
}

#answered-text {
    margin-right: 6px;
    color: #64ccde;
}

#answered-info {
    color: rgba(0, 0, 0, 0.7);
}

.qi-button {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-right: 14.9px;
    margin-bottom: 14px;
}

.qi-button h4 {
    margin: auto;
    color: rgba(0, 0, 0, 0.7);
}

.qi-button-answered {
    border: 1px solid #f09d34;
    background-color: #f09d34;
}

.qi-button-clicked {
    border: 1px solid #7766ec;
    background-color: #7766ec;
}

.qi-button-clicked > h4, .qi-button-answered > h4{
    color: white;
}
</style>
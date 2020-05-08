<template>
  <div class="home">
    <div class="grid-container">
      <div id="q-and-a" class="grid-item"></div>
      <div id="time-left" class="grid-item"></div>
      <div id="summary" class="grid-item"></div>
    </div>


    <!-- <div id="top-bar">
      <button class="primary-button">
        <font-awesome-icon icon="chevron-left" style="margin-right: 10px;"></font-awesome-icon>
        <h4>Prev</h4>
      </button>
      <h2>Simulasi Ujian UTBK</h2>
      <button class="primary-button">
        <h4>Next</h4>
        <font-awesome-icon icon="chevron-right" style="margin-left: 10px;"></font-awesome-icon>
      </button>
    </div>
    <hr>

    <div id="main-content">
      <div id="question-box" class="box">
        <p>hello</p>
      </div>
      <div id="choice-box" class="box">

      </div>
      <div id="control">
        <div id="time-left">
          <h2>30:00</h2>
        </div>
        <button class="secondary-button">
          <h4>Submit</h4>
          <font-awesome-icon icon="arrow-circle-right" style="margin-left: 10px;"></font-awesome-icon>
        </button>
      </div>
      <div id="summary-box" class="box">
      </div> 
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  margin: 0;
  padding: 5% 10%;
  max-width: 700px;
  min-width: 600px;
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
}

#q-and-a {
  grid-column: 1 / 4;
  grid-row: auto;
}

#time-left {
  grid-column: 4 / 6;
  grid-row: 1;
}

#summary {
  grid-column: 4 / 6;
  grid-row: auto;
}

/* hr {
  border: 0.5px solid rgba(0, 0, 0, 0.1);
}

button {
  border: none;
  text-align: center;
  padding: 10px 15px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

#top-bar {
  display:flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

#main-content{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  grid-auto-rows: minmax(50px, auto);
  margin-top: 20px;
}

#question-box {
  grid-column: 1 / 4;
  grid-row: 1 / auto;
}

#choice-box {
  grid-column: 1 / 4;
  grid-row: auto;
}

#summary-box {
  grid-column: 4 / 6;
  grid-row: 2 / auto;
}

#control {
  grid-column: 4 / 6;
  grid-row: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}

.box{
  border: 1px solid #f09d34;
  border-radius: 6px;
  padding: 20px;
}

.primary-button {
  background-color: #f09d34;
  border-radius: 7px;
  color: white;
    
}

.secondary-button{
  background-color: #7766ec;
  border-radius: 100px;
  color: white;
} */
</style>

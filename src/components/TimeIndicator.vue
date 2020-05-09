<template>
<div id="container">
    <h2>Time Left</h2>
    <div id="timer-container">
        <div class="unit-indicator">
            <h1>{{ minute }}</h1>
            <h3>Minutes</h3>
        </div>
        <div class="unit-indicator">
            <h1>{{ second }}</h1>
            <h3>Seconds</h3>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "TimeIndicator",
    props: ['doneFunc'],
    data() {
        return {
            duration: 90*60
        }
    },
    computed: {
        changes: {
            get: function() {
                return this.duration
            },
            set: function(newDuration) {
                this.duration = newDuration
            }
        },
        minute: function() {
            return Math.floor(this.duration/60)
        },
        second: function() {
            return this.duration%60
        }
    },
    methods: {
        timer: function() {
            setInterval(function() {
                if (this.duration > 0) {
                    this.changes = this.duration-1
                } else {
                    this.doneFunc();
                }               
            }.bind(this), 1000)
        }
    },
    mounted: function() {
        //this.timer()
    }
}
</script>

<style>
#timer-container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-content: center;
}

#container {
    text-align: center;
}

.unit-indicator {
    background-color: #f09d34;
    width: 7rem;
    height: 7rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 10px;
}

.unit-indicator h1,h3 {
    color: white;
}
</style>
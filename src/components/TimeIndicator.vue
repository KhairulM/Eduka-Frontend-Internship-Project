<template>
<div id="ti-container">
    <h3>Sisa Waktu</h3>
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
    props: ['tleFunc'],
    data() {
        return {
            duration: 5,
            timerIntervalId: null
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
        startTimer: function() {
            this.timerIntervalId = setInterval(function() {
                if (this.duration > 0) {
                    this.changes = this.duration-1
                } else {
                    this.tleFunc();
                    this.stopTimer();
                }               
            }.bind(this), 1000)
        },
        stopTimer: function() {
            clearInterval(this.timerIntervalId)
        }
    },
    mounted: function() {
        this.startTimer()
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

#ti-container {
    text-align: center;
}

#ti-container>h3 {
    color: rgba(0, 0, 0, 0.7);
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
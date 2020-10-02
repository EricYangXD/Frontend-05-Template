<template>
    <div>
        <h1>{{ title }}</h1>
        <div class="wrapper">
            <div class="color" :style="{ 'background-color': red }"></div>
            <div class="color" :style="{ 'background-color': yellow }"></div>
            <div class="color" :style="{ 'background-color': green }"></div>
        </div>
    </div>
</template>

<script>
import { reactive } from "@vue/composition-api";

export default {
    name: "TrafficLight",
    setup(props, ctx) {
        console.log("setup props", props.title);
        // const state = reactive({
        //     red: "red",
        //     green: "green",
        //     yellow: "yellow",
        //     grey: "grey",
        // });
        // return state;
    },

    data() {
        return {
            red: "red",
            green: "green",
            yellow: "yellow",
            grey: "grey",
        };
    },
    beforeCreate() {
        console.log("beforeCreate");
    },
    created() {
        console.log("created");
    },
    props: {
        title: String,
    },
    methods: {
        sleep(delay) {
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(), delay);
            });
        },
        async loop() {
            while (true) {
                this.green = "grey";
                this.yellow = "grey";
                this.red = "red";
                await this.sleep(5000);
                this.green = "grey";
                this.yellow = "yellow";
                this.red = "grey";
                await this.sleep(2000);
                this.green = "green";
                this.yellow = "grey";
                this.red = "grey";
                await this.sleep(5000);
            }
        },
    },
    mounted() {
        this.loop();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.wrapper {
    /* width: 500px; */
    display: flex;
    text-align: center;
    flex-wrap: wrap;
}
.color {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50px;
}
.red {
    background-color: red;
}
.yellow {
    background-color: yellow;
}
.green {
    background-color: green;
}
.grey {
    background-color: gray;
}
</style>

<template>
    <div id="app">
        <Docs v-bind:docs="docs" v-bind:openDoc="openDoc"/>
        <Markdown v-if="curDoc" v-bind:curDoc="curDoc"/>
    </div>
</template>

<script>
    import Docs from './components/Docs'
    import Markdown from './components/Markdown.vue';
    import {API} from './services/api'

    export default {
        name: 'app',
        components: {
            Docs,
            Markdown
        },
        data: function () {
            return {
                docs: [],
                curDoc: null
            }
        },
        created:
            async function () {
                const response = await API.get('/docs');
                this.docs = response.data.docs;
                this.curDoc = this.docs[0];
                // console.log(this.curDoc);
            },
        methods: {
            openDoc(doc) {
                // console.log(doc.title);
                this.curDoc = doc;
                console.log(this.curDoc);
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

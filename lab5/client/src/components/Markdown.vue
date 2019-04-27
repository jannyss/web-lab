<template>
    <div class="container">
        <div class="row">
            <div class="col text-center">
                <h2>Current Doc</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 p-3" id="title">
                <label for="title-input"> Title: </label>
                <input :value="curDoc.title" @input="updateTitle" id="title-input">
            </div>

            <div class="col-md-12 mt-8 mb-2 p-2" id="editor">
                <textarea :value="curDoc.markdown" @input="update" class="writer"></textarea>
                <div v-html="compilledMarkdown" class="ml-3 mapper align-content-center"></div>

            </div>
            <div class="col-md-12 mt-8 mb-2 p-2">
                <button v-on:click="saveDoc(curDoc)"> Save</button>
                <button v-on:click="deleteDoc(curDoc)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import marked from "marked";
    import _ from "lodash";

    export default {
        name: "Markdown",
        props: ["curDoc", "saveDoc", "deleteDoc"],
        data() {
            if (this.curDoc) {
                return {
                    _id: this.curDoc._id,
                    curMarkdown: this.curDoc.markdown,
                    curTitle: this.curDoc.title
                }
            } else {
                return {
                    _id: 0,
                    curMarkdown: "# hello",
                    curTitle: "Hello"
                }
            }
        }
        ,
        computed: {
            compilledMarkdown: function () {
                return marked(this.curDoc.markdown, {sanitize: true})
            }
        }
        ,
        methods: {
            update: _.debounce(function (e) {
                this.curDoc.markdown = e.target.value;
            }, 500),
            updateTitle: _.debounce(function (e) {
                this.curDoc.title = e.target.value;
            }, 500),
        }
        // watch: {
        //     this._id = this.curDoc._id;
        // }
    }
</script>

<style scoped>
    .mapper {
        border: #333333 medium solid;
    }

    .writer {
        height: 400px;
    }

    textarea, #editor div {
        display: inline-block;
        width: 49%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        padding: 0 20px;
    }

    textarea {
        border: none;
        height: 400px;
        border-right: 1px solid #ccc;
        resize: none;
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
    }

    html, body, #editor {
        margin: 0;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }

    code {
        color: #f66;
    }

</style>
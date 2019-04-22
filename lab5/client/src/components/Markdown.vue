<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12" id="title">
                <input :value="curDoc.title" @input="updateTitle">
            </div>

            <div class="col-md-6 mt-4 mb-3" id="editor">
                <textarea :value="curDoc.markdown" @input="update"></textarea>
                <div v-html="compilledMarkdown"></div>

            </div>
<!--            <div class="col-md-6 mt-4 mb-3">-->
<!--                <button v-on:click="saveDoc(curDoc)"> Save </button>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    import marked from "marked";
    import _ from "lodash";

    export default {
        name: "Markdown",
        props: ["curDoc"],
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
    }
</script>

<style scoped>
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
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }

    code {
        color: #f66;
    }

</style>
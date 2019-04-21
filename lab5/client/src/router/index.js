import Vue from 'vue'
import Router from 'vue-router'
import Docs from '../components/Docs'
import routes from '../routers'


Vue.use(Router);

export default new Router({
        mode: 'history',
        routes
    }
);
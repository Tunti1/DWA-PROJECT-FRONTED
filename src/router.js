import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Project from './views/Project'
import Grupa from './views/Grupa'
import Student from './views/Student'
import StudentGrade from './views/StudentGrade'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/student',
      name: 'Student',
      component: Student
    },
    {
      path: '/grupa',
      name: 'Grupa',
      component: Grupa
    },
    {
      path: '/StudentGrade',
      name: 'StudentGrade',
      component: StudentGrade
    }

  ]
})

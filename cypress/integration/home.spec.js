import Heading from '/pages/Home/Heading.js'
import Peerlist from './pages/Home/Peerlist'
import Timeline from './pages/Home/Timeline'
import Todolist from './pages/Home/Todolist'

describe('Home page specs', () => {
  const header = new Heading()
  const peerList = new Peerlist()
  const timeLine = new Timeline()
  const toDoList= new Todolist()

  describe('Home page header specs', () => {
    it('C5: If a cohort is completed, the user should be able to view "Congratulations, you’ve completed the cohort!" heading', () => {
    });
  })

  describe('Home page timeline specs', () => {
    it('C7: The left arrow icon in the progress bar should be disabled if welcome text is visible in progress bar', () => {
    });

    it('C8: The right arrow icon in the progress bar should be disabled if Cohort Completion text is visible in progress bar', () => {
    });

    it('C9: The left arrow icon in the progress bar should be enabled if welcome text is not visible in progress bar', () => {
    });

    it('C10: The right arrow icon in the progress bar should be enabled if Cohort Completion is not visible in progress bar', () => {
    });

  })

  describe('Home page todo list specs', () => {

  })

  describe('Home page peer list specs', () => {
    
  })

})

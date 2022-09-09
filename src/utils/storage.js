const STORAGE_KEY = 'tasks'

class StorageManager {
  getTasks() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  }

  saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }

  addTask(task) {
    const tasks = this.getTasks()

    const selectedDayTasks = tasks[task.taskDateKey]
    const newDayTasks = selectedDayTasks ? [...selectedDayTasks, task] : [task]

    const newTasks = { ...tasks, [task.taskDateKey]: newDayTasks }

    this.saveTasks(newTasks)

    return newTasks
  }

  deleteTask(task) {
    const tasks = this.getTasks()
    const newSelectDayToDo = tasks[task.taskDateKey].filter(({ id }) => {
      return id !== task.id
    })

    const newTasks = { ...tasks, [task.taskDateKey]: newSelectDayToDo }

    this.saveTasks(newTasks)

    return newTasks
  }

  updateTask(task, changes) {
    const tasks = this.getTasks()

    if (task.taskDate === changes.taskDate) {
      const newSelectedDayToDo = tasks[task.taskDateKey].map((dayTask) => {
        return dayTask.id === task.id ? { ...dayTask, ...changes } : task
      })

      const newTasks = { ...tasks, [task.taskDateKey]: newSelectedDayToDo }

      this.saveTasks(newTasks)

      return newTasks
    }

    const newTask = { ...task, ...changes }

    newTask.taskDateKey = `${newTask.taskDate.slice(8, 10)}${newTask.taskDate.slice(5, 7)}${newTask.taskDate.slice(0, 4)}`

    const selectedDayTasks = tasks[newTask.taskDateKey]
    const newDayTask = selectedDayTasks ? [...selectedDayTasks, newTask] : [newTask] // add to new day tasksList

    const newSelectDayToDo = tasks[task.taskDateKey].filter(({ id }) => {      // delete from old day tasksList

      return id !== task.id
    })
    const newTasks = { ...tasks, [task.taskDateKey]: newSelectDayToDo, [newTask.taskDateKey]: newDayTask }

    this.saveTasks(newTasks)

    return newTasks
  }


}

export const storage = new StorageManager()

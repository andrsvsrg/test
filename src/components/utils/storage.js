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
}

export const storage = new StorageManager()

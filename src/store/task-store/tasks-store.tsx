import {makeAutoObservable} from "mobx";

interface TaskAction {
  title: string;
  description: string;
  date: string;
}

interface Task {
  id: number,
  title: string,
  description: string,
  date: string,
  completed: boolean,
}

class TaskStore {
  tasks: Task[] = [];
  idSearch: number = 0;
  validation: boolean = true;
  updateTitleInput: string = '';
  updateDescriptionInput: string = '';
  updateDateInput: string = '';
  sort: string = '';
  message: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  // инициализация таски, нельзя создать при пустом title
  createTask = (task: TaskAction) => {
    if (task.title.length === 0) {
      this.validation = false
    } else {
      this.tasks.push({...task, id: +new Date(), completed: false});
      this.validation = true
      localStorage.setItem('tasksTODO', JSON.stringify(this.tasks));
    }
  };
  getTasks = () => {
    const tasksJSON = localStorage.getItem('tasksTODO');
    if (tasksJSON) {
      this.tasks = JSON.parse(tasksJSON);
    } else {
    }
  }
  delTask = (id: number) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    localStorage.setItem('tasksTODO', JSON.stringify(this.tasks));
  };

  updateCompleted = (id: number) => {
    let taskUpdate = this.tasks.find((item) => item.id === id);
    if (taskUpdate) {
      taskUpdate.completed = !taskUpdate.completed;
    }
    return this.tasks;
  };
  // Запоминаем id таски при попытки изменить задачу
  updateTaskOpenForm = (id: number) => {
    this.idSearch = id
    this.updateTask()
  }
  // Обновление инпутов
  updateTask = () => {
    // поиск задачи из id.Search
    let taskUpdate = this.tasks.find((item) => item.id === this.idSearch)
    if (taskUpdate) {
        this.updateTitleInput = taskUpdate.title || ''
        this.updateDescriptionInput = taskUpdate.description || ''
        this.updateDateInput = taskUpdate.date || ''
    }
    return this.tasks;
  };
  saveTask = () => {
    let taskUpdate = this.tasks.find((item) => item.id === this.idSearch)
    if (taskUpdate) {
      if (taskUpdate.title.length === 0 || taskUpdate.description.length === 0) {
        return this.tasks;
      } else {
        taskUpdate.title = this.updateTitleInput
        taskUpdate.description = this.updateDescriptionInput
        taskUpdate.date = this.updateDateInput
      }
    }
    this.idSearch = 0
    this.updateTitleInput = ''
    this.updateDescriptionInput = ''
    this.updateDateInput = ''
    localStorage.setItem('tasksTODO', JSON.stringify(this.tasks));
    return this.tasks;
  }
  // Управление инпутами
  setUpdateTitleInput = (title: string) => {
    this.updateTitleInput = title
  }
  setUpdateDescriptionInput = (description: string) => {
    this.updateDescriptionInput = description
  }
  setUpdateDateInput = (date: string) => {
    this.updateDateInput = date
  }
  // Сортировка задач по значению
  sortTasksList = (sort: string) => {
    if (sort === this.sort) {
      return this.tasks
    } else {
      this.sort = sort
      // По выполненным
      if (this.sort === 'Completed') {
        this.tasks = this.tasks.sort((a, b) => {
          if (a.completed) {
            return 1
          }
          if (b.completed) {
            return -1
          }
          return 0
        })
        return this.tasks
      }
      // По Дате
      if (this.sort === 'Date') {
        this.tasks = this.tasks.sort((a, b) => {
          if (a.date >= b.date) {
            return 1
          }
          if (a.date < b.date) {
            return -1
          }
          return 0
        })
        return this.tasks
      }
    }
  }
}

export default new TaskStore();
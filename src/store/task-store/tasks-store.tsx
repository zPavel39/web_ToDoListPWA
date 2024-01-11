import { makeAutoObservable } from "mobx";

interface TaskAction {
  title: string;
  description: string;
  date: string;
}

class TaskStore {
  tasks = [
    {
      id: 1,
      title: "Пойти в поход",
      description: "Купить мангал и продукты",
      date: "2023-05-10",
      completed: false,
    },
  ];
  idSearch: number = 0;
  validation = true;
  sort = ''
  constructor() {
    makeAutoObservable(this);
  }
  // инициализация таски, нельзя создать при пустом title
  createTask = (task: TaskAction) => {
    if (task.title.length === 0) {
      this.validation = false 
    } else {
      this.tasks.push({ ...task, id: +new Date(), completed: false });
    }
  };

  delTask = (id: number) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  };

  updateCompleted = (id: number) => {
    let taskUpdate = this.tasks.find((item) => item.id === id);
    if (taskUpdate) {
      taskUpdate.completed = !taskUpdate.completed;
    }
    return this.tasks;
  };
 // Запоминаем id таски при попытки и вызове модального окна изменить задачу 
  updateTaskOpenModel = (id: number) => {
    return this.idSearch = id
  }
  // Обновление задачи, при пустом 
  updateTask = (task: TaskAction) => {
    // поиск задачи из id.Search
    let taskUpdate = this.tasks.find((item) => item.id === this.idSearch)
    if (taskUpdate) {
      if (task.title.length === 0 || task.description.length === 0) {
        return this.tasks;
      } else {
        taskUpdate.title = task.title
        taskUpdate.description = task.description
        taskUpdate.date = task.date
      }
    }
    return this.tasks;
  };

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
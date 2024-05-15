import { useState } from 'react'
import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected/NoProjectSelected'
import ProjectsSidebar from './components/ProjectsSidebar'
import SelectedProject from './components/SelectedProject'

function App() {
  const [projectsState, setProjectsState] = useState({
    // null 값은 새로운 프로젝트를 추가하고 싶을 때,
    // undefined 값은 추가한 새 프로젝트가 없거나 아무 프로젝트도 선택하지 않았을 때 사용
    selectedProject: undefined,
    projects: [],
    tasks: [],
  })

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random()
      const newTask = {
        text,
        projectId: prevState.selectedProject,
        id: taskId,
      }

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      }
    })
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: id,
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter(
          // prevState에 selected project id가 있으므로 입력값을 받지 않아도 된다.
          (project) => project.id !== prevState.selectedProject,
        ),
      }
    })
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: null,
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId,
      }

      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject],
      }
    })
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
      }
    })
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProject,
  )

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  )

  if (projectsState.selectedProject === null) {
    content = (
      <NewProject
        onAddProject={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    )
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddPoejct={handleStartAddProject} />
  }

  return (
    <main className='flex gap-8 h-screen my-8'>
      <ProjectsSidebar
        onStartAddPoejct={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProject={projectsState.selectedProject}
      />
      {content}
    </main>
  )
}

export default App

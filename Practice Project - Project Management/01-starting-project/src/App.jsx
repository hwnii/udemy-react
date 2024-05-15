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
  })

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

  let content = <SelectedProject project={selectedProject} />

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

import ProjectsSidebar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleStartAddProject() {
    setProjectsState(prevState => {
        return {
          ...prevState,
          selectedProjectId: null
        };
      }
    );
  }

  function handleAddProject(projectdData) {
    const projectId = Math.random();
    const newProject = {
      ...projectdData,
      id: projectId
    };
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    }
  );
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {...prevState,
        selectedProjectId: undefined
      };
    });
  }

  let content;

  if(projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}></NewProject>;
  }
  else if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}></NoProjectSelected>;
  }

  console.log(projectsState);

  return (
    <>
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects}></ProjectsSidebar>
      {content}      
    </main>
    </>
  );
}

export default App;
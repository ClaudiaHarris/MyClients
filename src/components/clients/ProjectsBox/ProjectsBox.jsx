// src/components/clients/ProjectsBox/ProjectsBox.jsx
import React, { useState } from 'react';
import ProjectTabs from './ProjectTabs';
import ProjectList from './ProjectList';
import { mockProjects } from '../../../data/mockData';
import './ProjectsBox.css'; // Import your CSS styles
const ProjectsBox = ({ clientId }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter projects for this client
  const clientProjects = mockProjects.filter(project => project.client_id === clientId);
  
  // Filter projects based on the active tab
  const filteredProjects = activeTab === 'all' 
    ? clientProjects 
    : clientProjects.filter(project => project.project_status === activeTab);

  return (
    <div className="projects-box">

      <div className="projects-card-content">

        <div className="projects-card-header">
          <h2>Projects</h2>
          
        </div>

        <ProjectTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          projectCounts={{
            all: clientProjects.length,
            pending: clientProjects.filter(p => p.project_status === 'pending').length,
            active: clientProjects.filter(p => p.project_status === 'active').length,
            closed: clientProjects.filter(p => p.project_status === 'closed').length
          }}
        />
        
        <ProjectList projects={filteredProjects} />

      </div>

    </div>
  );
};

export default ProjectsBox;
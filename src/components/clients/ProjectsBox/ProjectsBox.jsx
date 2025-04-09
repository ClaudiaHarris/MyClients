// src/components/clients/ProjectsBox/ProjectsBox.jsx
import React, { useState } from 'react';
import ProjectTabs from './ProjectTabs';
import ProjectList from './ProjectList';
import { mockProjects } from '../../../data/mockData';

const ProjectsBox = ({ clientId }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter projects for this client
  const clientProjects = mockProjects.filter(project => project.clientId === clientId);
  
  // Filter projects based on the active tab
  const filteredProjects = activeTab === 'all' 
    ? clientProjects 
    : clientProjects.filter(project => project.status === activeTab);

  return (
    <div className="projects-box">
      <div className="projects-box-header">
        <h2>Projects</h2>
        <div className="projects-box-actions">
          <button className="add-project-btn">Add Project</button>
        </div>
      </div>

      <ProjectTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        projectCounts={{
          all: clientProjects.length,
          pending: clientProjects.filter(p => p.status === 'pending').length,
          active: clientProjects.filter(p => p.status === 'active').length,
          closed: clientProjects.filter(p => p.status === 'closed').length
        }}
      />
      
      <ProjectList projects={filteredProjects} />
    </div>
  );
};

export default ProjectsBox;
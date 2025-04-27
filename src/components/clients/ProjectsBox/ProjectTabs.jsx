// src/components/clients/ProjectsBox/ProjectTabs.jsx
import React from 'react';

const ProjectTabs = ({ activeTab, onTabChange, projectCounts = {all:0,  active:0, closed:0} }) => {
  return (
    <div className="project-tabs">
      <button 
        className={`tab ${activeTab === 'all' ? 'active' : ''}`}
        onClick={() => onTabChange('all')}
      >
        All ({projectCounts.all})
      </button>
      
      <button 
        className={`tab ${activeTab === 'active' ? 'active' : ''}`}
        onClick={() => onTabChange('active')}
      >
        Active ({projectCounts.active})
      </button>

      <button 
        className={`tab ${activeTab === 'closed' ? 'active' : ''}`}
        onClick={() => onTabChange('closed')}
      >
        Completed ({projectCounts.closed})
      </button>
    </div>
  );
};
//TODO remove pending tab
export default ProjectTabs;
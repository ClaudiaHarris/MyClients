// src/components/clients/ProjectsBox/ProjectTabs.jsx
import React from 'react';

const ProjectTabs = ({ activeTab, onTabChange, projectCounts }) => {
  return (
    <div className="project-tabs">
      <button 
        className={`tab ${activeTab === 'all' ? 'active' : ''}`}
        onClick={() => onTabChange('all')}
      >
        All ({projectCounts.all})
      </button>
      <button 
        className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
        onClick={() => onTabChange('pending')}
      >
        Pending ({projectCounts.pending})
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
        Closed ({projectCounts.closed})
      </button>
    </div>
  );
};

export default ProjectTabs;
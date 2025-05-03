// src/components/clients/ProjectsBox/ProjectList.jsx
import React from 'react';
import ProjectStatus from '../../../utils/ProjectStatus';

const ProjectList = ({ projects }) => {
  const ProjectRowItem = ({ projectItem }) => {
    // Get status safely
    let statusClass;
    try {
      statusClass = ProjectStatus.getStatusClass(projectItem);
    } catch (error) {
      statusClass = 'unknown';
    }

    // Get display name safely
    let displayName;
    try {
      displayName = ProjectStatus.getDisplayName(statusClass);
    } catch (error) {
      displayName = 'Unknown';
    }
    
    return (
      <tr>
        <td>{projectItem.project_name || 'Unnamed Project'}</td>
        <td>
          <span className={`status-badge ${String(statusClass)}`}>
            {displayName}
          </span>
        </td>
        <td>{projectItem.est_completion_date || 'No date'}</td>
        <td>
          {projectItem.project_managers ? (
            <a href={`mailto:${projectItem.project_managers.email}`}>
              {`${projectItem.project_managers.first_name} ${projectItem.project_managers.last_name}`}
            </a>
          ) : 'No manager'}
        </td>
      </tr>
    );
  };

  return (
    <div className="project-list">
      {projects.length > 0 ? (
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Project Manager</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              project && typeof project === 'object' ? (
                <ProjectRowItem 
                  key={project.project_id || `${project.project_name}-${Math.random()}`} 
                  projectItem={project} 
                />
              ) : null
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-projects-message">No projects available</p>
      )}
    </div>
  );
};

export default ProjectList;
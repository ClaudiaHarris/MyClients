// src/components/clients/ProjectsBox/ProjectList.jsx
import React, { useState, useEffect } from 'react';
import ProjectStatus from '../../../utils/ProjectStatus';
import supabase from '../../../config/supabaseClient';

const ProjectList = ({ projects }) => {
  const [projectManagers, setProjectManagers] = useState({});

  // Fetch all project managers once when component mounts
  useEffect(() => {
    const fetchProjectManagers = async () => {
      try {
        const { data, error } = await supabase
          .from('project_managers')
          .select('project_manager_id, first_name, last_name');
        
        if (error) throw error;

        // Create a map of project manager IDs to their details
        const managersMap = {};
        data?.forEach(manager => {
          managersMap[manager.project_manager_id] = {
            first_name: manager.first_name,
            last_name: manager.last_name
          };
        });
        
        setProjectManagers(managersMap);
      } catch (err) {
        console.error('Error fetching project managers:', err);
      }
    };

    fetchProjectManagers();
  }, []);

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

    // Get project manager name from cache
    const manager = projectItem.project_manager ? 
      projectManagers[projectItem.project_manager] : null;
    
    const managerName = manager ? 
      `${manager.first_name} ${manager.last_name}`.trim() : 
      'No manager assigned';
    
    return (
      <tr>
        <td>{projectItem.project_name || 'Unnamed Project'}</td>
        <td>
          <span className={`status-badge ${String(statusClass)}`}>
            {displayName}
          </span>
        </td>
        <td>{projectItem.est_completion_date || 'No date'}</td>
        <td>{managerName}</td>
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
                  key={project.project_id || 'unknown'} 
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
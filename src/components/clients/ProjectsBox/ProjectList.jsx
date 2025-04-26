// src/components/clients/ProjectsBox/ProjectList.jsx
import React from 'react';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length > 0 ? (
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.project_id}>
                <td>{project.project_type}</td>
                <td>
                  <span className={`status-badge ${project.project_status}`}>
                    {project.project_status}
                  </span>
                </td>
                <td>{project.start_date}</td>
                <td>{project.end_date}</td>
              </tr>
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
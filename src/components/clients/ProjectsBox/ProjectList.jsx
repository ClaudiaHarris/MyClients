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
              <th>Support Tickets</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>
                  <span className={`status-badge ${project.status}`}>
                    {project.status}
                  </span>
                </td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>
                  <button 
                    className="support-tickets-link"
                    onClick={() => alert(`View ${project.supportTickets} support tickets`)}
                  >
                    {project.supportTickets} tickets
                  </button>
                </td>
                <td className="actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
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
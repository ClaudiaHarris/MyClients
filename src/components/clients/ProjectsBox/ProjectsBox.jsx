// src/components/clients/ProjectsBox/ProjectsBox.jsx
import React, { useState, useEffect } from 'react';
import supabase from '../../../config/supabaseClient';
import ProjectTabs from './ProjectTabs';
import ProjectList from './ProjectList';
import './ProjectsBox.css';

const ProjectsBox = ({ clientId, contractId, onClearContractFilter }) => {
  
  const [activeTab, setActiveTab] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectCounts, setProjectCounts] = useState({
    all:0,
    pending:0,
    active:0,
    closed:0
  });


  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
        
        let query = supabase
          .from('projects')
          .select('*')
          .eq('client_id', clientId);

        if (contractId) {
          query = query.eq('contract_id', contractId);
        }

        if (activeTab !== 'all') {
          query = query.eq('project_status', activeTab);
        }

        const {data, error } = await query;

        if (error) {
          console.error('Error fetching projects: ', error);
        } else {
          setProjects(data || []);

          const counts = {
            all: data.length,
            pending: data.filter(p => p.project_status === 'pending').length,
            active: data.filter(p => p.project_status === 'active').length,
            closed: data.filter(p => p.project_status === 'closed').length
          };
          setProjectCounts(counts);
        };

        setLoading(false);
        };

        if (clientId) {
          fetchProjects();
        } else {
          setProjects([]);
          setProjectCounts({ all: 0, pending: 0, active: 0, closed: 0 });
          setLoading(false);
        }
      }, [clientId, contractId, activeTab]);

     const handleTabChange = (tab) => {
      setActiveTab(tab);
     };

     const filteredProjects = activeTab === 'all' 
     ? projects 
     : projects.filter(project => project.project_status === activeTab);


  return (
    <div className="projects-card-content">
      <div className="projects-header">
        <h2>Projects</h2>
        {contractId && (
          <div className="filter-indicator">
            <span className="by-contract">for this contract</span>
            <button
              className="clear-filter-btn"
              onClick={() => onClearContractFilter && onClearContractFilter()}
            > x </button>
          </div>
              )}
      </div>

      <ProjectTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {loading ? (
        <div className="loading-indicator">Loading projects...</div>
      ): (
        <ProjectList projects={filteredProjects} />
      )}
    </div> 
  );
};    


export default ProjectsBox;
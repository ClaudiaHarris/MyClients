// src/components/clients/ProjectsBox/ProjectsBox.jsx
import React, { useState, useEffect } from 'react';
import supabase from '../../../config/supabaseClient';
import ProjectTabs from './ProjectTabs';
import ProjectList from './ProjectList';
import './ProjectsBox.css';

const ProjectsBox = ({ contractId}) => {
  
  const [activeTab, setActiveTab] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contractName, setContractName] = useState('');
  const [projectCounts, setProjectCounts] = useState({
    all:0,
    active:0,
    closed:0
  });


  useEffect(() => {

    const fetchContractName = async () => {
      if (!contractId) {
        setContractName('');
        return; 
      }

      const { data, error } = await supabase
        .from('contracts')
        .select('contract_type')
        .eq('contract_id', contractId)
        .single();

      if (error) {
        console.error('Error fetching contract name: ', error);
      } else {
        setContractName(data.contract_type);
      }
    };
    

    fetchContractName();
  }, [contractId]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
        
        let query = supabase
          .from('projects')
          .select('*')
          .eq('contract_id', contractId);

        if (contractId) {
          query = query.eq('contract_id', contractId);
        }

        if (activeTab !== 'all') {
          query = query.eq('project_status', activeTab);
        }

        const {data, error } = await query;

        if (error) {
          console.error('Error fetching projects: ', error);
          setError(error.message);
        } else {
          setProjects(data || []);

          const counts = {
            all: data.length,
            active: data.filter(p => p.project_status === 'active').length,//TODO change ongoing to active in supabase
            closed: data.filter(p => p.project_status === 'completed').length
          };
          setProjectCounts(counts);
        };

        setLoading(false);
        };

        if (contractId) {
          fetchProjects();
        } else {
          setProjects([]);
          setProjectCounts({ all: 0,  active: 0, closed: 0 });
          setLoading(false);
        }
      }, [contractId, activeTab]);

     const handleTabChange = (tab) => {
      setActiveTab(tab);
     };

     const filteredProjects = activeTab === 'all' 
     ? projects 
     : projects.filter(project => project.project_status === activeTab);
//fetch contract name from contracts table for section header

  return (

    <div className="projects-card-content">
      <div className="projects-header">
        <h2>Projects</h2>
        {contractId && (
          <div className="filter-indicator">
            <span className="by-contract">for {contractName || 'this contract'}</span>
          </div>
        )}
      </div>

      <ProjectTabs activeTab={activeTab} onTabChange={handleTabChange} projectCounts={projectCounts}/>

      {loading ? (
        <div className="loading-indicator">Loading projects...</div>
      ): error? (
        <div className="error-message">{error}</div>
      ): (
        <ProjectList projects={filteredProjects} />
      )}
    </div> 

  );
};    


export default ProjectsBox;
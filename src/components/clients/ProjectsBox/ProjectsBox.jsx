// src/components/clients/ProjectsBox/ProjectsBox.jsx
import React, { useState, useEffect } from 'react';
import supabase from '../../../config/supabaseClient';
import ProjectList from './ProjectList';
import './ProjectsBox.css';

const ProjectsBox = ({ contractId, clientName}) => {
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contractName, setContractName] = useState('');
  
  
 

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

        

        const {data, error } = await query;

        if (error) {
          console.error('Error fetching projects: ', error);
          setError(error.message);
        } else {
          setProjects(data || []);

        };

        setLoading(false);
        };

        if (contractId) {
          fetchProjects();
        } else {
          setProjects([]);
          setLoading(false);
        }
    }, [contractId]
  );

  return (

    <div className="projects-card-content">
      <div className="projects-header">
        <h3>{contractName} Projects</h3>
        <h5>{clientName}</h5>
        
      </div>

     
      {loading ? (
        <div className="loading-indicator">Loading projects...</div>
      ): error? (
        <div className="error-message">{error}</div>
      ): (
        <ProjectList projects={Array.isArray(projects) ? projects : []} />
      )}
    </div> 

  );
};    


export default ProjectsBox;
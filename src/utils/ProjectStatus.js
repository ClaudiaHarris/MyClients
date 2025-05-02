class ProjectStatus {
  static UPCOMING = 'upcoming';
  static IN_PROGRESS = 'in-progress';
  static COMPLETED = 'completed';
  static DELAYED = 'delayed';


  /**
   * Determines the correct status based on project data
   * @param {Object} project - The project object
   * @param {string} project.project_status - Current status from database
   * @param {string} project.est_completion_date - Estimated completion date
   * @returns {string} The calculated status
   */

  static getStatusClass(project) {
    // Add defensive programming
    if (!project || typeof project !== 'object') {
      console.warn('Invalid project passed to getStatusClass:', project);
      return this.UPCOMING;
    }

    // Check if project_status exists and is a string
    if (typeof project.project_status === 'string' && project.project_status === this.COMPLETED) {
      return this.COMPLETED;
    }

    try {
      const today = new Date();
      const estCompletionDate = project.est_completion_date ? new Date(project.est_completion_date) : null;

      if (typeof project.project_status === 'string') {
        if (project.project_status === this.IN_PROGRESS && 
            estCompletionDate && estCompletionDate < today) {
          return this.DELAYED;
        }

        if (project.project_status === this.IN_PROGRESS && 
            estCompletionDate && estCompletionDate > today) {
          return this.IN_PROGRESS;
        }

        const normalizedStatus = project.project_status.toLowerCase().replace(/\s+/g, '-');

        if ([this.UPCOMING, this.IN_PROGRESS, this.COMPLETED, this.DELAYED].includes(normalizedStatus)) {
          return normalizedStatus;
        }

        // Return the existing status if it's a valid string
        return this.UPCOMING;
      }
      
      // Default case
      return this.UPCOMING;
    } catch (error) {
      console.error('Error in getStatusClass:', error);
      return this.UPCOMING;
    }

  }


/**
   * Gets the display name for a status
   * @param {string} status - The status code
   * @returns {string} Human-readable status
   */

static getDisplayName(status) {
  // Add defensive programming
  if (typeof status !== 'string') {
    console.warn('Non-string status passed to getDisplayName:', status);
    return 'Unknown';
  }

  const displayNames = {
    [this.UPCOMING]: 'Upcoming',
    [this.IN_PROGRESS]: 'In Progress',
    [this.COMPLETED]: 'Completed',
    [this.DELAYED]: 'Delayed'
  };
  
  return displayNames[status] || status;
}

}

export default ProjectStatus;


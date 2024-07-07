import { useState } from 'react';

const Form = () => {
    const [jobData, setJobData] = useState({
        work_year: '',
        experience_level: '',
        employment_type: '',
        job_title: '',
        bonus: '',
        salary_currency: '',
        salary_in_usd: '',
        employee_residence: '',
        remote_ratio: '',
        company_location: '',
        company_size: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:5000/api/salaries/jobs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jobData)
          });
    
          if (!response.ok) {
            throw new Error('Failed to add job');
          }
    
          const data = await response.json();
          console.log('Job added:', data);
    
          // Optionally, clear the form after successful submission
          setJobData({
            work_year: '',
            experience_level: '',
            employment_type: '',
            job_title: '',
            bonus: '',
            salary_currency: '',
            salary_in_usd: '',
            employee_residence: '',
            remote_ratio: '',
            company_location: '',
            company_size: ''
          });
    
        } catch (error) {
          console.error('Error adding job:', error);
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <input type="number" name="work_year" placeholder="Work Year" value={jobData.work_year} onChange={handleChange} required />
          <input type="text" name="experience_level" placeholder="Experience Level" value={jobData.experience_level} onChange={handleChange} required />
          <input type="text" name="employment_type" placeholder="Employment Type" value={jobData.employment_type} onChange={handleChange} required />
          <input type="text" name="job_title" placeholder="Job Title" value={jobData.job_title} onChange={handleChange} required />
          <input type="number" name="bonus" placeholder="Bonus" value={jobData.bonus} onChange={handleChange} required />
          <input type="text" name="salary_currency" placeholder="Salary Currency" value={jobData.salary_currency} onChange={handleChange} required />
          <input type="number" name="salary_in_usd" placeholder="Salary in USD" value={jobData.salary_in_usd} onChange={handleChange} required />
          <input type="text" name="employee_residence" placeholder="Employee Residence" value={jobData.employee_residence} onChange={handleChange} required />
          <input type="number" name="remote_ratio" placeholder="Remote Ratio" value={jobData.remote_ratio} onChange={handleChange} required />
          <input type="text" name="company_location" placeholder="Company Location" value={jobData.company_location} onChange={handleChange} required />
          <input type="text" name="company_size" placeholder="Company Size" value={jobData.company_size} onChange={handleChange} required />
    
          <button type="submit">Add Job</button>
        </form>
      );
};

export default Form;

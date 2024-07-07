const Job = require('../models/data');

const getSalaries = async (req, res) => {
    try {
        const jobs = await Job.find();
        const summary = {};
        
        jobs.forEach(job => {
            const year = job.work_year;
            const salary = job.salary_in_usd;
            if (!summary[year]) {
                summary[year] = { totalJobs: 0, totalSalary: 0 };
            }
            summary[year].totalJobs += 1;
            summary[year].totalSalary += salary;
        });

        const summaryArray = Object.keys(summary).map(year => ({
            year: year,
            totalJobs: summary[year].totalJobs,
            averageSalary: summary[year].totalSalary / summary[year].totalJobs
        }));

        res.json(summaryArray);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get salaries data' });
    }
};

const lineDataGraph = async (req, res) => {
    try {
        const jobs = await Job.find();
        const summary = {};
        
        jobs.forEach(job => {
            const year = job.work_year;
            if (!summary[year]) {
                summary[year] = 0;
            }
            summary[year]++;
        });

        const lineChartData = Object.keys(summary).map(year => ({
            year: parseInt(year),
            totalJobs: summary[year]
        }));

        res.json(lineChartData);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get line data graph' });
    }
};

const jobTitlesByYear = async (req, res) => {
    const year = req.query.year;
    
    try {
        const jobs = await Job.find({ work_year: year });
        const jobTitleCounts = {};
        
        jobs.forEach(job => {
            const jobTitle = job.job_title;
            if (!jobTitleCounts[jobTitle]) {
                jobTitleCounts[jobTitle] = 0;
            }
            jobTitleCounts[jobTitle]++;
        });

        const aggregatedJobTitles = Object.keys(jobTitleCounts).map(jobTitle => ({
            jobTitle,
            count: jobTitleCounts[jobTitle]
        }));

        res.json(aggregatedJobTitles);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get job titles by year' });
    }
};

const addJobs = async (req, res) => {
    try {
        const { work_year, experience_level, employment_type, job_title, bonus, salary_currency, salary_in_usd, employee_residence, remote_ratio, company_location, company_size } = req.body;

        const newJob = new Job({
            work_year,
            experience_level,
            employment_type,
            job_title,
            bonus,
            salary_currency,
            salary_in_usd,
            employee_residence,
            remote_ratio,
            company_location,
            company_size
        });

        await newJob.save();
        res.status(201).json("added the data");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getSalaries, lineDataGraph, jobTitlesByYear, addJobs };

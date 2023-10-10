export default interface JobModel {
  id: string;
  title: string;
  description: string;
  requirement: string;
  salary: string;
  companyName: string;
  logo: string;
  tags: string[];
};

export const toJobMap = (item: any) => ({
  id: item['id'],
  title: item['title'],
  description: item['description'],
  requirement: item['requirement'],
  companyName: item['employer_name'],
  logo: item['employer_logo'],
  salary: item['salary'],
  tags: [item['term']],
}) as JobModel;

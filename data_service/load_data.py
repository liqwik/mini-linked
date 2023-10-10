import requests
import json
from dataclasses import dataclass
import data
import datetime
import os
import time

BASE_URL = "https://api.camhr.com/v1.0.0/jobs?page={}&size=500"


@dataclass
class Job:
    id: str
    title: str
    status: str
    address: str
    requirement: str
    description: str
    employer_logo: str
    employer_name: str
    employer_website: str
    employer_email: str
    expire_date: int
    major: str
    url: str
    salary: str
    location: str
    source: str
    term: str


# Usage
# person3 = Person("Charlie", 35)
# print(person3.name, person3.age)

def load_from_file(folder):
    items: list[Job] = []
    files = [f for f in os.listdir(
        folder) if os.path.isfile(os.path.join(folder, f))]
    for file_path in files:
        try:
            full_path = f"{folder}/{file_path}"
            with open(full_path, 'r') as file:
                file_content = file.read()
                json_content = json.loads(file_content)
                data = json_content['data']
                append_data(items, data['result'])

        except FileNotFoundError:
            print(f"File '{file_path}' not found.")
        except Exception as e:
            print(f"An error occurred: {str(e)}")
    return items


def crawl() -> list[Job]:
    today_date = datetime.date.today()
    file = f"./data/{today_date}"
    items: list[Job] = []
    if os.path.exists(file):
        print("already crawl for today")
        return load_from_file(file)
    else:
        os.makedirs(file)
    page = 1

    while True:
        try:
            resp = requests.get(BASE_URL.format(page))
            content = json.loads(resp.text)
            data = content['data']
            if len(data['result']) == 0:
                break
            append_data(items, data['result'])
            print("done for page : ", page,
                  " total data :", len(data["result"]))
            json_file = f"{file}/cam_hr_{page}.json"
            page = page + 1
            with open(json_file, 'w') as f:
                f.write(resp.text)
            time.sleep(30)
        except Exception as e:
            print(e)
            break

    # if len(items) > 0:
    #     str_data = json.dumps(items)
    #     with open(file, 'w') as f:
    #         f.write(str_data)
    return items


def load_cam_hr(from_file=False) -> str:
    # Get the current date

    if not from_file:
        resp = requests.get(BASE_URL)
        return resp.text

    file_path = "./data/cam_hr.json"
    try:
        with open(file_path, 'r') as file:
            # Read the file content here
            return file.read()
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    return None


VIEW_URL = "https://www.camhr.com/pages/jobs/job.jsp?jobId={}"


def append_data(items: list[Job], data):
    for row in data:
        (id, title, requirement, description, address, status, employer_logo, employer_name, employer_website,
         major, salary, term, email) = \
            (row['id'], row['title'], row['requirement'], row['description'], row['address'],
             row['status']['code'],
             row['employer']['logo'], row['employer']['company'], row['weburl'], row[
                 'major'], row['salaryId']['label'], row['termId']['label'], row['contact']['email']
             )
        location = ''
        if len(row['locations']) > 0:
            location = row['locations'][0]['locationId']['label']
        url = VIEW_URL.format(id)
        row['url'] = url
        item = Job(id=id, title=title, requirement=requirement, description=description, address=address,
                   status=status, employer_logo=employer_logo, employer_name=employer_name,
                   employer_website=employer_website, expire_date=None, major=major, url=url, location=location, salary=salary, source="camhr", term=term, employer_email=email)
        # collection.insert_one(row)
        items.append(item)


def parse_data() -> list[Job]:
    content = load_cam_hr(True)
    if content:
        json_data = json.loads(content)
        result = json_data['data']["result"]
        db = data.get_db()
        collection = db["cam_hr"]
        collection.delete_many({})
        if len(result) > 0:
            items = []
            for row in result:
                (id, title, requirement, description, address, status, employer_logo, employer_name, employer_website,
                 major, salary, location) = \
                    (row['id'], row['title'], row['requirement'], row['description'], row['address'],
                     row['status']['code'],
                     row['employer']['logo'], row['employer']['company'], row['weburl'], row[
                         'major'], row['salaryId']['label'], row['locationId']['label']
                     )
                url = VIEW_URL.format(id)
                row['url'] = url
                item = Job(id=id, title=title, requirement=requirement, description=description, address=address,
                           status=status, employer_logo=employer_logo, employer_name=employer_name,
                           employer_website=employer_website, expire_date=None, major=major, url=url, location=location, salary=salary)
                collection.insert_one(row)
                items.append(item)
            return items
    return []


if __name__ == "__main__":
    # jobs = parse_data()
    # print(jobs)
    items = crawl()
    print("done loading data", len(items))

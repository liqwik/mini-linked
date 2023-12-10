# main.py
from mail import send_email
from search import get_by_id
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Query, File, UploadFile, Form
import search
import log
import logging
import os
import datetime
from pydantic import BaseModel
app = FastAPI()
logger = logging.getLogger(__name__)
logger = log.format_log(logger)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# MySQL database configuration
# db = mysql.connector.connect(
#     host="localhost",
#     port=8889,
#     user="root",
#     password="root",
#     database="job_bot",
# )
# cursor = db.cursor()


@app.get("/search", response_model=dict)
async def read_item(query: str = Query(default='', description='Keyword for search job')):
    try:
        # Some code that may raise an error
        logger.info(f"perform search for user with query : {query}")
        results = search.search(query)
        final_response = {'data': results,
                          'success': True, 'message': 'success'}
    except Exception as e:
        # Log the error
        logger.error(f"An error occurred: {e}")
        final_response = {'success': False, 'message': f"Error happening {e}"}
    return final_response


@app.post("/apply", response_model=dict)
async def apply_job(file: UploadFile,
                    job_id: str = Form(..., description="Job ID"),
                    subject: str = Form(default=None, description="Subject"),
                    description: str = Form(
                        default=None, description="Description")
                    ):
    try:
        job = get_by_id(job_id)
        if subject is None:
            subject = f"Apply for {job['title']}"
        if description is None:
            description = f" Dear Sir/ Madam , I would like to apply {job['title']}. Please refer to attached file for my cv."
        if job is None:
            return {'success': False, "message": f"Not found job : {job_id}"}
        employer_mail = job["employer_email"]
        if "Test" in subject or "test" in subject:
            employer_mail = "mini.linked@gmail.com"
        # print("employer mail", employer_mail, " vs ", job["employer_email"])
        today_date = datetime.date.today()
        upload_dir = f"/App/uploads/{today_date}"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as f:
            f.write(file.file.read())
        send_email(employer_mail, subject, description, file_path)
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        logging.error("Exception occurred", exc_info=True)

        return {'success': False, "message": f" Error happening {e}"}

    # print("item:", item)
    return {'success': True, "message": "Success"}


@app.get("/index", response_model=dict)
def index():
    search.load_data_and_index()
    return {'success': True, "message": "Success"}

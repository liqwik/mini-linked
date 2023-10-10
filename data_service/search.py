import os
from whoosh.index import create_in, open_dir
from whoosh.fields import Schema, TEXT, ID, NUMERIC
from whoosh.qparser import QueryParser
from load_data import crawl, Job


def load_data_and_index():
    items = crawl()
    print("done crawling", len(items))
    build_index(items)
    print("done build index")


def build_index(items: list[Job]):
    # Create a directory for your index if it doesn't exist
    if not os.path.exists("my_index"):
        os.mkdir("my_index")
    # Define the schema for your index, including an "ID" field
    schema = Schema(id=ID(stored=True, unique=True), title=TEXT(
        stored=True), description=TEXT(stored=True), requirement=TEXT(stored=True), url=TEXT(stored=True), term=TEXT(stored=True), source=TEXT(stored=True), employer_name=TEXT(stored=True),
        employer_logo=TEXT(stored=True), salary=TEXT(stored=True), employer_website=TEXT(stored=True), expire_date=NUMERIC(stored=True),
        employer_email=TEXT(stored=True))

    # Create an index in the specified directory
    ix = create_in("my_index", schema=schema)

    # Create a writer for adding documents

    if len(items) > 0:
        writer = ix.writer()
        for item in items:
            writer.add_document(id=item.id, title=item.title,
                                requirement=item.requirement,
                                description=item.description, url=item.url, term=item.term, source=item.source, employer_name=item.employer_name, employer_logo=item.employer_logo, salary=item.salary,
                                employer_email=item.employer_email,
                                employer_website=item.employer_website, expire_date=item.expire_date)
        writer.commit()
        print("done commit for ", len(items))
    else:
        print("no data to index")


def get_by_id(search_id):
    ix = open_dir("my_index")
    searcher = ix.searcher()
    query_parser = QueryParser("id", schema=ix.schema)
    query = query_parser.parse(f'id:{search_id}')
    # Perform the search
    with ix.searcher() as searcher:
        results = searcher.search(query)
        ix.close()
        for result in results:
            return dict(result)

    return None


def search(keyword: str):
    # Open the existing index and create a searcher
    ix = open_dir("my_index")
    searcher = ix.searcher()

    # Perform a search using the document ID
    query_parser = QueryParser("description", schema=ix.schema)
    query = query_parser.parse(keyword)  # Searching for document with ID "1"
    results = searcher.search(query, limit=100)
    items = [dict(hit) for hit in results]
    return items


# CAMHR
# https://api.camhr.com/v1.0.0/jobs?page=1&size=50


if __name__ == "__main__":
    print("build search index")
    build_index()
    print("done building index")
    get_by_id("10569430")

    # VIEW_URL = "https://www.camhr.com/pages/jobs/job.jsp?jobId={}"
    # while True:
    #     # Get string input from the user
    #     user_input = input("Enter a keyword: ")
    #     if "done" == user_input:
    #         print("bye bye")
    #         break
    #     results = search(user_input)
    #     # Display the result
    #     for result in results:
    #         print("ID:", result["id"])
    #         print("Title:", result["title"])
    #         url = VIEW_URL.format(result["id"])
    #         print("click on this : ", url)
    #         # print("Content:", result["content"])

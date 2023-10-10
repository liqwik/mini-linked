
import pymongo
from pymongo import UpdateOne, results
from telegram import User
client = pymongo.MongoClient("mongodb://localhost:27017")
db = client["job_bot"]
collection = db['cam_hr']


def get_db():
    return db


def store_data(item_dict={"id": '001', 'name': 'Demo'}):
    inserted_item = collection.insert_one(item_dict)
    return inserted_item


def store_subscription(keyword: str, user_id: int):
    item = {"keyword": keyword, "user_id": user_id}
    db["subscriptions"].insert_one(item)


def get_susbcription_for_user(user_id: int):
    items = db["subscriptions"].find({"user_id": user_id})
    return items


def store_user(user: User) -> results.BulkWriteResult:
    item = {"_id": user.id, "first_name": user.first_name, "last_name": user.last_name, "is_bot": user.is_bot,
            "username": user.username,
            "language_code": user.language_code,
            "can_join_groups": user.can_join_groups,
            "can_read_all_group_messages": user.can_read_all_group_messages,
            "supports_inline_queries": user.supports_inline_queries,
            "is_premium": user.is_premium}

    update_operation = UpdateOne({"_id": item["_id"]}, {
                                 "$set": item}, upsert=True)
    result = db["users"].bulk_write([update_operation])
    return result


if __name__ == "__main__":
    # store_data()
    # store_subscription('Software', 5795957100)
    get_susbcription_for_user(5795957100)

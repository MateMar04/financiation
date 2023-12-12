from django.db import connection
from django.http import JsonResponse


def in_memory_uploaded_file_to_binary(in_memory_uploaded_file):
    try:
        in_memory_uploaded_file.seek(0)  # Ensure the file cursor is at the beginning.
        binary_data = in_memory_uploaded_file.read()
        return binary_data
    except Exception as e:
        # Handle any potential exceptions that may occur during the process.
        print(f"Error converting InMemoryUploadedFile to binary: {e}")
        return None


def execute_query(query, request):
    faqs_ids = parse_and_convert(request.GET.getlist('faqs'))
    visits_ids = parse_and_convert(request.GET.getlist('visits'))
    with connection.cursor() as cursor:
        cursor.execute(query, [visits_ids, faqs_ids])
        row = cursor.fetchall()
        return JsonResponse(convert_to_json(row), safe=False)


def to_json(keys, values):
    return [dict(zip(keys, item)) for item in values]


def convert_to_json(input_data):
    result = []
    for name, requests in input_data:
        entry = {
            "name": name,
            "requests": requests
        }
        result.append(entry)
    return result


def parse_and_convert(input_list):
    if len(input_list) == 1 and isinstance(input_list[0], str):
        numbers_str = input_list[0]
        numbers_list = numbers_str.split(',')
        numbers_tuple = tuple(map(int, numbers_list))
        return numbers_tuple

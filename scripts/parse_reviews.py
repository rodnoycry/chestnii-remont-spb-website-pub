
import re
import requests
import json
import os
import shutil
import posixpath
from bs4 import BeautifulSoup
from urllib.parse import urlparse


def main():
    # Define the path to the reviews.html file
    input_file_path = os.path.join(os.path.dirname(__file__), 'input', 'reviews.html')
    output_folder = os.path.join(os.path.dirname(__file__), 'output')
    images_folder_name = '1'
    os.makedirs(output_folder, exist_ok=True)
    result = parse_reviews(
        input_file_path=input_file_path,
        output_folder=output_folder,
        images_folder_name=images_folder_name,
    )
    create_ts_file(result=result, output_folder=output_folder)


def parse_reviews(input_file_path: str, output_folder: str, images_folder_name: str):
    output_file_path = os.path.join(output_folder, 'reviews.json')
    # Ensure the images output directory exists
    images_output_dir = os.path.join(os.path.dirname(__file__), 'output', images_folder_name)
    os.makedirs(images_output_dir, exist_ok=True)
    
    if os.path.exists(images_output_dir):
        shutil.rmtree(images_output_dir)
    os.makedirs(images_output_dir, exist_ok=True)


    # Read the HTML file
    with open(input_file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find all divs with class 'style-snippet-sAvR4'
    review_divs = soup.find_all('div', class_='style-snippet-sAvR4')
    
    # Initialize result list
    result = []

    # Iterate through each div
    for div in review_divs:
        review_obj = {}
        # Get first direct child that has a 'data-marker' attribute
        first_child = div.find(True, attrs={"data-marker": True})

        if not first_child:
            continue
        
        data_marker = first_child['data-marker']

        # If data-marker exists and has the correct format
        if not data_marker or not data_marker.startswith('review('):
            continue
        
        review_id = data_marker.split('(')[1].split(')')[0]
        review_obj['id'] = review_id

        # Find avatar and download image if exists
        avatar_span = div.find('span', {'data-marker': f'review({review_id})/header/avatar'})
        avatar_info = {
            "url": "",
            "path": "",
            "has-image": False
        }
        if avatar_span and avatar_span.img:
            avatar_url = avatar_span.img.get('src')
            if avatar_url:
                avatar_info["url"] = avatar_url
                avatar_domain = urlparse(avatar_url).netloc
                if avatar_domain != "static.avito.ru":
                    avatar_info["has-image"] = True
                # Extract image name from URL and create a relative path
                original_image_name = os.path.basename(avatar_url)
                extension = original_image_name.split(".")[-1]
                if ['jpg', 'jpeg', 'png', 'webp'].count(extension) == 0:
                    original_image_name = f"{original_image_name}.jpg"
                image_name = f"{review_id}.{original_image_name}"
                relative_image_path = posixpath.join(images_folder_name, image_name)
                avatar_info["path"] = relative_image_path
                # Download and save the image
                image_response = requests.get(avatar_url)
                if image_response.status_code == 200:
                    with open(os.path.join(images_output_dir, image_name), 'wb') as file:
                        file.write(image_response.content)

        review_obj['avatar'] = avatar_info


        # Find name
        name_span = div.find('span', {'data-marker': f'review({review_id})/header/title'})
        review_obj['name'] = name_span.get_text() if name_span else ''

        # Find date
        date_span = div.find('span', {'data-marker': f'review({review_id})/header/subtitle'})
        review_obj['date'] = date_span.get_text() if date_span else ''

        # Initialize rating
        rating = 0
        rating_div = div.find('div', {'data-marker': f'review({review_id})/score'})
        if rating_div:
            for star in rating_div.find_all(True, recursive=True):
                for class_list in star.get('class', ''):
                    if 'Attributes-yellow-star' in class_list:
                        rating += 1
                        continue
        review_obj['rating'] = rating

        # Find review text
        text_span = div.find('span', {'data-marker': f'review({review_id})/text-section/text'})
        if text_span:
            raw_text = text_span.get_text()
            # Replace newline characters with spaces
            formatted_text = re.sub(r'\s+', ' ', raw_text.replace('\n', ' '))
            review_obj['text'] = formatted_text
        else:
            review_obj['text'] = ''

        # Append to result list
        result.append(review_obj)

    # Dump the result to a json file
    with open(output_file_path, 'w', encoding='utf-8') as file:
        json.dump(result, file, ensure_ascii=False, indent=4)
        
    return result

def create_ts_file(result, output_folder):
    # Create a new ts file
    output_file_path = os.path.join(output_folder, 'reviews.ts')
    with open(output_file_path, 'w', encoding='utf-8') as file:
        file.write('export const reviews = ')
        file.write(json.dumps(result, ensure_ascii=False, indent=4))


if __name__ == '__main__':
    main()
    pass
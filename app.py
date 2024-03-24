from flask import Flask, request, send_file, jsonify
import os
import shutil
import uuid

# Create the Flask app
app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.mkdir(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_image():
    if request.method == 'POST':

        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file:
            file_ext = os.path.splitext(file.filename)[1]
            if file_ext not in ['.jpg', '.jpeg', '.png']:
                return jsonify({'error': 'Invalid file type'}), 400

            file_name = str(uuid.uuid4()) + file_ext
            file.save(os.path.join(UPLOAD_FOLDER, file_name))

            # Move the uploaded file to the "uploads" folder
            shutil.move(os.path.join(UPLOAD_FOLDER, file_name),
                         os.path.join(UPLOAD_FOLDER, 'uploaded_' + file_name))

            image_path = os.path.join(UPLOAD_FOLDER, 'uploaded_' + file_name)

            # Process the uploaded image here
            processed_image_name = 'processed_image.jpg'
            processed_image_path = os.path.join(UPLOAD_FOLDER, processed_image_name)

            # The existing code for image processing and saving
            # ...

            return send_file(processed_image_path, as_attachment=True)

# The following is for the API endpoint for the front-end

@app.route('/image', methods=['GET'])
def get_image():
    processed_image_name = 'processed_image.jpg'
    processed_image_path = os.path.join(UPLOAD_FOLDER, processed_image_name)

    if os.path.exists(processed_image_path):
        return jsonify({'processedImage': f'/{processed_image_name}'})

    return jsonify({'error': 'Processed image not found'}), 404

# ...
import io
import os
import sys
import unittest

BACKEND_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from app import create_app


class UploadPredictTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_predict_accepts_photo_upload(self):
        response = self.client.post(
            '/api/predict',
            data={
                'Gender': 'Male',
                'Applicant Income': '5000',
                'Loan Amount': '150',
                'photo': (io.BytesIO(b'fake-image-data'), 'sample.jpg'),
            },
            content_type='multipart/form-data'
        )

        self.assertNotEqual(response.status_code, 400)
        self.assertTrue(response.is_json)


if __name__ == '__main__':
    unittest.main()

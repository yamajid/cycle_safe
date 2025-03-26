import requests


def get_localisation(local):
    url = 'https://nominatim.openstreetmap.org/search'

    headers = {
                'User-Agent': 'sheetlog_back/1.0 (younessamajid57@gmail.com)'  # Use a real email
    }

    params = {
        'q': local,
        'format': 'json',
        'limit': 1
    }

    response = requests.get(url=url, headers=headers, params=params)
    print(response.status_code)
    if response.status_code == 200:
        return True
    else:
        return False

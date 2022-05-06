# This is a sample Python script.

# Press Maj+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import csv
import os
import threading
from multiprocessing import Pool

import requests
from bs4 import BeautifulSoup

standard_path = r"C:\Users\Reda\Documents\IPSSI\02Mai_Data_Lack\scrape_datas\DATA"
standard_link = "https://www.ncei.noaa.gov/data/global-hourly/access/"


def scrapeFileNames(link):
    for year in range(2020, 2022):
        link_off = link+str(year)
        req = requests.get(link_off)
        soup = BeautifulSoup(req.content, 'html.parser')
        fileNames = []
        for href in soup.find_all('a'):
            file = href.get('href')
            fileNames.append(file)
    return fileNames


def download(fileNames, link):
    for filename in fileNames:
        if not filename.endswith("csv"):
            continue
        try:
            req_off = requests.get(link+'/' + filename)
            if req_off.status_code != 200:
                continue
            url_content = req_off.content
            year = link.split("access/")[1].split("/")[0]
            csv_file = open(os.path.join(standard_path, '{}_'.format(year)+filename), 'wb')
            csv_file.write(url_content)
            csv_file.close()
            print(filename)
        except:
            return 'Error No file found'


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    fileNames = scrapeFileNames(standard_link)
    for year in range(2020, 2022):
        link_off = standard_link + str(year)
        # download(fileNames, link_off)
        th1 = threading.Thread(target=download, args=(fileNames, link_off))
        th1.start()
        # with Pool(5) as p:
        #     print(p.map(download, fileNames, link_off))

    





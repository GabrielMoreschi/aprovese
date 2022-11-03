import requests
from bs4 import BeautifulSoup as BS
import logging
import re
import json
import time
import atexit
logging.basicConfig(level=logging.INFO)


QUANTITY = 1000
#PATH = 'questoes-de-concursos'
PATH = 'questoes-do-enem/questoes?discipline_ids%5B%5D=13'
URL = 'https://www.qconcursos.com'
STATISTICS_PATH = 'components/questions/question_statistics'
COOKIE = '__ca__chat=lzpsnkeiq5iw; cf_clearance=1328791c6c4e8b61e7409078b5e8a35b697e6d8b-1667418452-0-250; remember_user_token=W1syNTI3NjU3N10sIlJQYmlteW1ZRTdGaVdFdHhvdVo0IiwiMTY2NzQyNTI2OC4zNDgwNjciXQ%3D%3D--c4489a2ac800e2c5eb8a6d9844dc3049b5ad5530; __cfruid=a8091c77aca15d07c4300e99bc75269ee9c74dba-1667425349; amp_b2d6e3=_0C3Q0HrrOBxiK-EnVcCFJ.MjUyNzY1Nzc=..1ggthhqp5.1ggthhqpi.4.8.c; __cf_bm=5diHr4iBVlUCVj0QGzyafY5DvRiVHKM_i3udnBXg7Qo-1667438800-0-AR4WthB5Glm2nt7DuinyherqtkEdOolltmJZQykNqDkRv7GgxLZ0utE/wfSm3GbOr8ThtdUTe4iyovDIF0SM4jjEafznWG0EVnNQAFbGtoX8lynKq+UpXMRezHJxCW17Ew==; _my_app_session=UzNTWHlqQ3lzcHB0WURuVUl2djMzS3Y3R3o2cFpJWFV1UFJRM205MUEyQW4rZmJkQmdvL2dqK3dPZnR2Z0wwbHI2bkZkU1B5SEdERGdQYURKa1lQbENDZDdPbzlFT01lQ0xESlJvVkczL25uTzlSMDNIcVF4UTNYRXRoTmJzOGNqcDJ1U0l4NUx4YnFsUHpuaUNrWTduRVFHVHdYQUNBelIvOUZ2ZFpvQWVJWmo1Z3AyTnlROUdiNS92WWZJS1pVNnp0V3ZWNWhkM3JLa1BiWkdCUGtrbTNjcTJnSUhZZjEwS3lQbWkwSTJHWVorVnlqSnkrRlBaSlRNVzc3ZVRCd3NuY2NkWFhsYlBlNXFISnIvZGhEcVowOFF2bWE5SWJrOEFDcEFHS3N3Y0Q2MzRZUlVxL3dGeVc0eVVlZXZpaWdMSGRIUExLc3FHSnJWYXZJTGJNY2N3PT0tLVJRTmg2YldvMWRLQ2ZvalUvQ0tOZlE9PQ%3D%3D--2378d0f9caa9af8d3c192331a8be706387345e32'
SAFE_SLEEP = 5
SLEEP_TIME = 60


class QuestionsScraper:

    def __init__(self,
                 path=PATH,
                 url=URL,
                 quantity=QUANTITY,
                 statisticsPath=STATISTICS_PATH,
                 safeSleep=SAFE_SLEEP,
                 sleepTime=SLEEP_TIME,
                 **kwargs):
        self.path = path if '?' in path else path+'?'
        self.url = url
        self.quantity = quantity
        self.statisticsPath = statisticsPath
        self.safeSleep = safeSleep
        self.sleepTime = sleepTime
        self.header = kwargs.get(
            'header', {'User-Agent': 'Mozilla/5.0', 'cookie': COOKIE})
        self.log = logging.getLogger(__name__)
        self.currentPage = 1
        self.collectedData = []

    def scraper(self):
        try:
            for page in range(self.currentPage, int(self.quantity/5+1)):
                URI = '{}/{}&page={}'.format(self.url, self.path, page)
                request = requests.get(URI, headers=self.header)
                self.log.info('Collecting data from page {}/{}. Status: {}'.format(
                    page, int(self.quantity/5+1)-1, request.status_code))
                if request.status_code == 429:
                    raise StopIteration
                self.currentPage += 1
                questions = BS(request.text, 'html.parser').findAll(
                    'div', {'class': 'q-question-item'})
                for question in questions:
                    qDict = {}
                    qDict['qID'] = question.find(
                        'div', {'class': 'q-question'})['data-question-id']
                    qDict['categories'] = [re.sub(r'[^\w\s]', '', categ.text).strip() for categ in question.find(
                        'div', {'class': 'q-question-breadcrumb'}).findAll('a', {'class': 'q-link'})]
                    info = [re.sub(r'^.*:|\n|[^\|\w\s\-]', '',
                                   i.getText(), flags=re.MULTILINE).strip() for i in question.find('div', {'class': 'q-question-info'}).findAll('span')]
                    if len(info) > 3:
                        info[3] = [p.strip() for p in info[3].split('|') if p]
                    infoAttr = ('year', 'judge', 'organization', 'tests')
                    qDict.update({infoAttr[i]: info[i]
                                  for i in range(len(info[:4]))})
                    qDict['question'] = self.formatText(question.find(
                        'div', {'class': 'q-question-enunciation'})['aria-label'])
                    extraText = question.find(
                        'div', {'id': 'question-'+qDict['qID']+'-text'})
                    if extraText:
                        extraText = self.formatText(extraText.getText())
                    qDict['text'] = extraText
                    images = question.find(
                        'div', {'class': 'q-question-enunciation'}).findAll('img')
                    qDict['images'] = [img.get('src') for img in images]
                    alternativas = {}
                    for alternativa in question.find('div', {'class': 'q-question-options'}).findAll('div'):
                        try:
                            answer = alternativa.find(
                                'div', {'class': 'q-item-enum'})
                            alternativas[alternativa.find('input').get('value')] = {
                                'text': answer.getText(strip=True),
                                'images': [img.get('src') for img in answer.findAll('img')]
                            }
                        except Exception:
                            pass
                    qDict['options'] = alternativas
                    self.collectedData.append(qDict)
                    time.sleep(self.safeSleep)
        except StopIteration:
            self.log.info('{} questions collected'.format(
                len(self.collectedData)))
            self.log.info(
                'Too many requests. Sleeping for {} seconds'.format(self.sleepTime))
            time.sleep(self.sleepTime)
            self.scraper()
        else:
            self.log.info('{} questions collected'.format(
                len(self.collectedData)))

    def formatText(self, text):
        return re.sub(r'(\w) , ', '\g<1>, ', re.sub(r'\s\.(\w)', ' . \g<1>', re.sub(r'[\r\n\s]+', ' ', text)))

    def getAnswer(self, id):
        correctPercentage, allPercentages = '', dict()
        data = 'data%5Bquestion_id%5D={}&data%5Balready_solved%5D=false&data%5Bshow_path%5D=false&asset_key=&authenticity_token=EQ21DEXV%2F8m8KR4%2F1En2xtEuQ%2BkwuyLQ5bfcyfUC2GNuB6ltvccu8ZSel5LO%2FkG48uOilxYp1HAaIA2iZxKUhA%3D%3D&data_type=hash&type=page_component'.format(
            id)
        request = requests.post(
            '{}/{}'.format(self.url, self.statisticsPath), headers=self.header, data=data)
        self.log.info('Collecting answer from question {}. Status: {}'.format(
            id, request.status_code))
        if request.status_code == 429:
            self.log.info(
                'Too many requests. Sleeping for {} seconds'.format(self.sleepTime))
            time.sleep(self.sleepTime)
            return self.getAnswer(id)
        correctMatch = re.search(r'data-hits=.([^"\']+).', request.text)
        optionsMatch = re.search(r'data-options=.([^"\']+).', request.text)
        percentagesMatch = re.search(
            r'data-pecentages=.([^"\']+).', request.text)
        if correctMatch:
            correctPercentage = correctMatch.group(1)
        if optionsMatch and percentagesMatch:
            allPercentages = dict(zip(optionsMatch.group(1).split(
                ','), percentagesMatch.group(1).split(',')))
        answers = [k for k, v in allPercentages.items() if v ==
                   correctPercentage]
        if len(answers) == 1:
            return answers[0]

    def getAllAnswers(self):
        for i, d in enumerate(self.collectedData):
            if d.get('answer'):
                continue
            answer = self.getAnswer(d.get('qID'))
            time.sleep(self.safeSleep)
            d['answer'] = answer
            self.collectedData[i] = d
            if i % 5 == 0:
                self.log.info('Collected answers {}/{}'.format(i,
                              len(self.collectedData)))


if __name__ == '__main__':
    try:
        QS = QuestionsScraper()
        # QS.scraper()
        QS.collectedData = json.load(open('someQuestions.json', 'r'))
        QS.getAllAnswers()
    except KeyboardInterrupt:
        pass
    atexit.register(print, json.dumps(QS.collectedData, indent=4))

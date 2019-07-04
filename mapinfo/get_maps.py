import bs4 as bs
import urllib.request

source = urllib.request.urlopen('https://qshar.com/?player=Shishigami#mapss').read()
soup = bs.BeautifulSoup(source, 'html.parser')

with open('maps.txt', 'w') as f:
    for mapname in soup.select('table.reference.notranslate tr td.text'):
        f.write(mapname.string + '\n')
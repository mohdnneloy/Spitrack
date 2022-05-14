#=============== Django Imports ===============

# from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect

#======== Rest Framework Imports ==========

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

#=============== Models ================

from django.contrib.auth.models import User
from .models import Cluster, CrawledData, Scrappers

#================== Serializers ===============

from .serializers import CreateClusterSerializer, ClusterSerializer, CreateCrawledDataSerializer, \
    GetSearchResultSerializer, EnableScrapperSerializer


#================= Customs ====================

from .scrappers import getURLlist, parseAll, parsePDF, parseWord, parsePowerpoint, parseText, parseHtmlText
from .emailnotification import emaiNotify

#=============== API - Create New Cluster  ==================


@api_view(['POST'])
def createCluster(request):

    # Finding User Data From Database
    userid = request.user.id
    user = User.objects.filter(id=userid)
    print(userid);

    # Preparing data to store in Cluster Model
    username = user[0].username
    email = user[0].email
    name = user[0].first_name + " " + user[0].last_name
    cluster_name = request.data.get("cluster_name", None)
    url1 = request.data.get("url1", None)
    url2 = request.data.get("url2", None)
    url3 = request.data.get("url3", None)
    depth = request.data.get("depth", None)
    pdf = request.data.get("pdf", None)
    word = request.data.get("word", None)
    powerpoint = request.data.get("powerpoint", None)
    text = request.data.get("text", None)
    non_html_text = request.data.get("non_html_text", None)
    data = {'user': userid, 'username': username, 'cluster_name': cluster_name, 'url1': url1, 'url2': url2,
            'url3': url3, 'depth': depth, 'pdf': pdf, 'word': word, 'powerpoint': powerpoint, 'text': text,
            'non_html_text': non_html_text}
    serializer = CreateClusterSerializer(data=data)

    # List to hold incoming urls from getURLlist
    pdf_urls = []
    word_urls = []
    powerpoint_urls = []
    text_urls = []
    non_html_text_urls = []

    strategies = {'pdf': pdf,
                  'word': word,
                  'powerpoint': powerpoint,
                  'text': text,
                  'non_html_text': non_html_text}

    urls = {'url1': data.get('url1'),
            'url2': data.get('url2'),
            'url3': data.get('url3')}

    if serializer.is_valid():
        serializer.save()

        # Get Cluster ID for the new cluster
        clusters = Cluster.objects.filter(user_id=userid, cluster_name=cluster_name, url3=url3)
        if clusters.exists():
            serializerc = ClusterSerializer(clusters, many=True)
            cluster_id = serializerc.data[0].get('id')

        for i in range(len(urls)):
            string = 'url' + str(i+1)
            print()
            print('Getting URLs from URL', i+1, ': ', urls[string], '=====================================')

            # Crawling all available specified urls on the root_url
            pdf_urls, word_urls, powerpoint_urls, text_urls, non_html_text_urls = getURLlist(urls[string], strategies, int(depth))

            # Obtaining Parsed Content per URL in cluster
            pdf_content, word_content, powerpoint_content, text_content, non_html_text_content = \
                parseAll(pdf_urls, word_urls, powerpoint_urls, text_urls, non_html_text_urls)

            # Storing PDF Crawled-Data in Database
            if pdf_urls and pdf_content:
                j=0
                for url in pdf_urls:
                    savedurls = CrawledData.objects.filter(current_url=url['url'])

                    if not savedurls.exists():
                        datacr = {'user': userid, 'username': username, 'cluster': cluster_id,
                                  'root_url': urls[string],
                                  'current_url': url['url'], 'depth': url['depth'], 'crawled_data_type': 'PDF', 'content': pdf_content[j]}
                        serializercr = CreateCrawledDataSerializer(data=datacr)

                        try:
                            if serializercr.is_valid(raise_exception=True):
                                serializercr.save()
                        except Exception as e:
                            print('PDF Storing Error!', e)
                            pass
                        finally:
                            j = j+1
                            if j == len(pdf_content):
                                break

            # Storing Word Crawled-Data in Database
            if word_urls and word_content:
                j = 0
                for url in word_urls:
                    savedurls = CrawledData.objects.filter(current_url=url['url'])

                    if not savedurls.exists():
                        datacr = {'user': userid, 'username': username, 'cluster': cluster_id,
                                  'root_url': urls[string],
                                  'current_url': url['url'], 'depth': url['depth'], 'crawled_data_type': 'Word',
                                  'content': word_content[j]}
                        serializercr = CreateCrawledDataSerializer(data=datacr)

                        try:
                            if serializercr.is_valid(raise_exception=True):
                                serializercr.save()
                        except Exception as e:
                            print('Word Storing Error!', e)
                            pass
                        finally:
                            j = j + 1
                            if j == len(word_content):
                                break

            # Storing Powerpoint Crawled-Data in Database
            if powerpoint_urls and powerpoint_content:
                j = 0
                for url in powerpoint_urls:
                    savedurls = CrawledData.objects.filter(current_url=url['url'])

                    if not savedurls.exists():
                        datacr = {'user': userid, 'username': username, 'cluster': cluster_id,
                                  'root_url': urls[string],
                                  'current_url': url['url'], 'depth': url['depth'], 'crawled_data_type': 'Powerpoint',
                                  'content': powerpoint_content[j]}
                        serializercr = CreateCrawledDataSerializer(data=datacr)

                        try:
                            if serializercr.is_valid(raise_exception=True):
                                serializercr.save()
                        except Exception as e:
                            print('Powerpoint Storing Error!', e)
                            pass
                        finally:
                            j = j + 1
                            if j == len(powerpoint_content):
                                break

            # Storing Text Crawled-Data in Database
            if text_urls and text_content:
                j = 0
                for url in text_urls:
                    savedurls = CrawledData.objects.filter(current_url=url['url'])

                    if not savedurls.exists():
                        datacr = {'user': userid, 'username': username, 'cluster': cluster_id,
                                  'root_url': urls[string],
                                  'current_url': url['url'], 'depth': url['depth'], 'crawled_data_type': 'Text',
                                  'content': text_content[j]}
                        serializercr = CreateCrawledDataSerializer(data=datacr)

                        try:
                            if serializercr.is_valid(raise_exception=True):
                                serializercr.save()
                        except Exception as e:
                            print('Text Storing Error!', e)
                            pass
                        finally:
                            j = j + 1
                            if j == len(text_content):
                                break

            # Storing Non-Html-Text Crawled-Data in Database
            if non_html_text_urls and non_html_text_content:
                j = 0
                for url in non_html_text_urls:
                    savedurls = CrawledData.objects.filter(current_url=url['url'])

                    if not savedurls.exists():
                        datacr = {'user': userid, 'username': username, 'cluster': cluster_id,
                                  'root_url': urls[string],
                                  'current_url': url['url'], 'depth': url['depth'], 'crawled_data_type': 'Non HTML',
                                  'content': non_html_text_content[j]}
                        serializercr = CreateCrawledDataSerializer(data=datacr)

                        try:
                            if serializercr.is_valid(raise_exception=True):
                                serializercr.save()
                        except Exception as e:
                            print('HTML Text Storing Error!', e)
                            pass
                        finally:
                            j = j + 1
                            if j == len(non_html_text_content):
                                break

        # Email Notification when cluster is ready
        try:
            emaiNotify(email, cluster_name, name)
        except Exception as e:
            print('Email could not be sent!', e)
        finally:
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#=============== API - Cluster Details ==================

@api_view(['GET'])
def clusterDetails(request):
    userid = request.user.id
    clusters = Cluster.objects.filter(user_id=userid)
    print(userid)

    # // Test set of URLs to check parsing
    # parsePDF([{'url': 'https://ec.europa.eu/info/sites/info/files/overview_of_covid19_and_roma_-_impact_-_measures_-_priorities_for_funding_-_23_04_2020.docx.pdf'}])
    # print("Done PDF Parsing")
    # parseWord([{'url': 'https://www.internationaldisabilityalliance.org/sites/default/files/master_sgpwd_covid-19_report_-_repaired_via_365_june_22_2020.docx'}])
    # print("Done Word Parsing")
    # parsePowerpoint([{'url': 'https://www.stfm.org/media/2772/covid-19-residents.pptx'}])
    # print("Done Powerpoint Parsing")
    # parseText([{'url': 'http://textfiles.com/adventure/aencounter.txt'}])
    # print("Done Text Parsing")

    if clusters.exists():

        serializer = ClusterSerializer(clusters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


#=============== API - Search ==================

@api_view(['POST'])
def clusterDataSearch(request):
    userid = request.user.id
    search_string = request.data.get("search_string", None)
    cluster_names = request.data.get("cluster_names", None)

    # SQL Query Work
    list_cluster_name = ''
    list_count = 0
    for name in cluster_names:
        if list_count == 0:
            list_cluster_name = list_cluster_name + '\'' + name + "'"
            list_count = list_count+1
        else:
            list_cluster_name = list_cluster_name + ',\'' + name + "'"

    sqlquery1 = "SELECT * FROM `clusters_cluster` WHERE `user_id`= " + str(userid) + " AND `cluster_name` in (" + list_cluster_name + ")"

    list_root_urls = []
    clusters = Cluster.objects.raw(sqlquery1)
    for c in clusters:
        list_root_urls.append(c.url1)
        list_root_urls.append(c.url2)
        list_root_urls.append(c.url3)


    # Query For Data
    list_count = 0
    list_urlm = ''

    for url in list_root_urls:
        if list_count == 0:
            list_urlm = list_urlm + '\'' + url + "'"
            list_count = list_count+1
        else:
            list_urlm = list_urlm + ',\'' + url + "'"


    sqlquery2 = "SELECT * FROM `clusters_crawleddata` WHERE `root_url` in (" + list_urlm + ") AND `content` LIKE \"%%" + search_string + "%%\""
    result = []
    crawled_search_data = CrawledData.objects.raw(sqlquery2)

    for d in crawled_search_data:
        object = {'id': d.id, 'root_url': d.root_url, 'current_url': d.current_url, 'crawled_data_type': d.crawled_data_type, 'content': d.content, 'depth': d.depth}
        # print(object)
        result.append(object)

    result_final = {'data_crawled': result}
    serializer = GetSearchResultSerializer(data=result_final)

    if serializer.is_valid():
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


#=============== API - Add new Scrapping Strategies "Just For Testing"  ==================

@api_view(['PUT'])
def enabelScrapper(request):

    # Finding User Data From Database
    userid = request.user.id
    user = User.objects.filter(id=userid)
    print(userid)

    # Preparing data to store in Cluster Model
    username = user[0].username
    filetype = request.data.get("file_type", None)
    enable = request.data.get("enable", None)

    scrapperdetail = Scrappers.objects.filter(file_type=filetype)

    data = {'user': userid, 'username': username, 'file_type': filetype, 'enable': enable}
    serializer = CreateClusterSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


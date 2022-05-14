from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


# Cluster Details based on User
class Cluster(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    username = models.CharField(max_length=50, default=None)
    cluster_name = models.CharField(max_length=50)
    url1 = models.CharField(max_length=255)
    url2 = models.CharField(max_length=255)
    url3 = models.CharField(max_length=255)
    depth = models.IntegerField(default=None)
    pdf = models.BooleanField(default=None)
    word = models.BooleanField(default=None)
    powerpoint = models.BooleanField(default=None)
    text = models.BooleanField(default=None)
    non_html_text = models.BooleanField(default=None)
    date_of_creation = models.DateField(default=datetime.now().date())

    def __str__(self):
        return self.user + ' ' + self.username + self.cluster_name + ' ' + self.url1 + ' ' + self.url2 + \
               ' ' + self.url3 + ' ' + self.depth + ' ' + self.pdf + ' ' + self.word + ' ' + self.powerpoint +\
               ' ' + self.text + ' ' + self.non_html_text + ' ' + self.date_of_creation


# Crawled Data details based on users
class CrawledData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    username = models.CharField(max_length=255, default=None)
    cluster = models.ForeignKey(Cluster, on_delete=models.CASCADE)
    date_of_creation = models.DateField(default=datetime.now().date())
    root_url = models.CharField(max_length=255, default=None)
    current_url = models.CharField(max_length=255, default=None)
    crawled_data_type = models.CharField(max_length=25, default=None)
    content = models.CharField(max_length=100000, default=None)
    depth = models.IntegerField(default=None)

    def __str__(self):
        return self.user + ' ' + self.username + ' ' + self.cluster + ' ' + self.date_of_creation + \
               ' ' + self.root_url + ' ' + self.current_url + ' ' + self.content + ' ' + self.depth


# Control the Scrapping Strategies using this model on the database
class Scrappers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    username = models.CharField(max_length=255, default=None)
    file_type = models.CharField(max_length=255, default=None)
    enable = models.BooleanField(default=0)

    def __str__(self):
        return self.file_type + ' ' + self.enable

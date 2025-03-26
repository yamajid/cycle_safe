from django.db import models 

class Trip(models.Model):
    current_location = models.CharField(max_length=255)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    current_cycle_using = models.IntegerField()
    trip_number = models.AutoField(primary_key=True)
    date_created = models.DateTimeField(auto_now_add=True)

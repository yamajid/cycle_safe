from rest_framework import serializers
from .models import Trip
from .utils import get_localisation

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

    def validate_pickup_location (self, value):
        if not get_localisation(value):
            raise serializers.ValidationError('Invalid pickup location')
        return value
    def validate_dropoff_location (self, value):
        if not get_localisation(value):
            raise serializers.ValidationError('Invalid dropoff location')
        return value
    def validate_current_location (self, value):
        if not get_localisation(value):
            raise serializers.ValidationError('Invalid current location')
        return value
    def validate_current_cycle_using (self, value):
        if value < 1 or value > 70:
            raise serializers.ValidationError('Invalid current cycle')
        return value
    def create(self, validated_data):
        return Trip.objects.create(**validated_data)

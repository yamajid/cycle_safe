from rest_framework.views import APIView
from .serializers import TripSerializer
from rest_framework import status
from rest_framework.response import Response



class tripInfo(APIView):
    def post(self, request):

        print(request.data)
        
        serializer = TripSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (
                {
                    "tripInfo": serializer.validated_data,
                    "message": "Trip created successfully"
                }, status=status.HTTP_201_CREATED
            )
        return Response (serializer.errors ,status.HTTP_400_BAD_REQUEST, status)
        
from app.constants import project_id, uuid,credentials
from google.cloud import dialogflow_v2 as dialogflow
from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime, timedelta
import uuid

def extract_appointment_details(response):
    """Extracts appointment details from the Dialogflow response."""
    parameters = response.query_result.parameters.fields

    date = parameters.get('date').string_value
    time = parameters.get('time').string_value

    appointment_datetime = datetime.fromisoformat(f"{date}T{time}")
    
    appointment_end_datetime = appointment_datetime + timedelta(hours=1)

    summary = "Appointment with CareConnect"
    description = response.query_result.fulfillment_text
    location = parameters.get('location').string_value
    start_time = appointment_datetime.isoformat()
    end_time = appointment_end_datetime.isoformat()

    return {
        "start_time": start_time,
        "end_time": end_time,
        "summary": summary,
        "description": description,
        "location": location
    }

def schedule_appointment(data):
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(project_id,uuid)
    text_input = dialogflow.TextInput(text=data['message'], language_code='en')
    query_input = dialogflow.QueryInput(text=text_input)
    response = session_client.detect_intent(session=session, query_input=query_input)
    appointment_details = extract_appointment_details(response)
    credentials = service_account.Credentials.from_service_account_file()
    service = build('calendar', 'v3', credentials=credentials)
    event = {
        'summary': appointment_details['summary'],
        'location': appointment_details['location'],
        'description': appointment_details['description'],
        'start': {
            'dateTime': appointment_details['start_time'],
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': appointment_details['end_time'],
            'timeZone': 'America/Los_Angeles',
        },
        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    }
    
    event = service.events().insert(calendarId='primary', body=event).execute()

    return {"status": "success", "message": "Appointment scheduled", "eventId": event['id']}
